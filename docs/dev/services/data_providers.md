---
layout: dev
---

# The Event System

**Data Providers are a different way to create a controller...** 

eXpansion<sup>2</sup> event system differs from previous controller design where dedicated 
server event gets routed directly to plugin method.

The idea is to separate dedicated and game mode script events from directly passing to plugin.
This way it's possible to route and re-organize events and even adapt the controller: 
 1. different scripted game modes  
 2. possible future game api changes
   
![Diagramme explaining Data Providers]({{ "/assets/img/doc/DataProviders.jpg" | absolute_url }})

The diagram shows how event data flows from dedicated to plugin.

1. Script Mode or Dedicated server sends event.
2. Dedicated server api receives the event.
3. Multiple DataProviders are set to work in certain conditions.
    - at begin of a map eXpansion<sup>2</sup> checks which data provider is most best suited for the current 
    situation and starts those. 
4. The Selected DataProvider sends it's abstracted events to Records plugin
5. Records plugin doesn't need to take into consideration changes coming from various scripts
6. Records plugin can work as a new data provider which seeds data to other plugins who requested the data.
7. Next plugins process the records plugin data, and show different things...
    1. a chat message plugin, which shows the new record at game chat.
    2. records widget, which draws hud element to the screen
    3. best scores widget
    4. etc...
    
## Data Providers
  
Data providers, when initialized, will check for 3 conditions from the game: 
* **Title**
    - Generic: 
        - ALL
        - TM
        - SM
    - Specific
        - "TmStadium@nadeo"
        - "Obstacle@steeffeen"
        - ...        
* **Dedicated Game Mode**
    - ALL
    - Script
    - Rounds
    - Team
    - ...
* **Script name**
    - ALL
    - "TimeAttack.Script.txt"
    - "Rounds.Script.txt"
    - ...

When registering a script mode we can use the keyword `ALL` to make it compatible with all Titles and such. 
In our example the PlayerDataProvider provides information onPlayerConnect and onPlayerDisconnect. 

When choosing data provider, expansion will use the most suitable data provider - not the first one that is compatible.

Let's say we have a `Records plugin` which depends on `TimeDataProvider` compatible with `TM` script modes.
It works nicely for build-in modes, but in some custom script mode like `acme.script.txt` 
we notice that the provider does not work well. 

To make our plugin work well again, it's now possible to create another `TimeDataProvider` which is set 
to be compatible with `acme.script.txt` only. 
The new data provider has more specific information on what callbacks the script has and it will be 
chosen instead of the more generic one. This will allow the Records plugin to work without any effect.

What happens if controller is started on Storm ?

Well the LocalRecords plugin gets disabled, since there's no `TimeDataProvider` available for Storm titles.
Any developer can though easily make local records and widget and other dependent plugins to work, 
by implementing `TimeDataProvider` for Storm or other custom game mode. 
Once this is created the `LocalRecordsPlugin` will be enabled as a compatible `TimeDataProvider` is found. 
So the `LocalRecordsDataProvider` will enable as well, which in it's turn will enable `LocalRecrodsWidget`. 

So the development of a simple DataProvider will reconnect and render compatible whole features that was never meant to
work on Storm.

Data providers can also be used to send game mode dependent "configuration" data to plugins. For example widget positions. 

## Registering a Data Provider

A data provider is basically a service, like nearly everything else in eXpansion<sup>2</sup>. 
 
Very basic data provider compatible with everything: 

> file: **bundle**/resources/config/services.yaml
```yaml
services:
    expansion.acme.acme_data_provider:
        class: yourName\AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.dataprovider, provider: "your_name.acme", interface: "yourName\AcmeBundle\DataProvider\Listener\ListenerInterfaceYournameAcme"}
            - {name: expansion.dataprovider.compatibility, title: ALL}
```

The data provider uses the symfony tags. 

The first tag declares the provider with 2 information:
* **provider** 
    - You can have multiple services for the same provider so that eXp can chose from.
* **interface** 
    - The interface that defines the methods the provider provides. 

The second tag allows to add compatibility information.

In this case we have basically said our provider is compatible with all titles, and as we have not given any specification for mode & scrip it's compatible with all of them as well. 

To make it compatible in Trackmania for both Rounds & Laps script mode we could write something like this:

```yaml
services:
    expansion.acme.acme_dataprovider:
        class: yourName\AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.dataprovider, provider: "your_name.acme", interface: "YourName\AcmeBundle\DataProvider\Listener\ListenerInterfaceYournameAcme"}
            - {name: expansion.dataprovider.compatibility, title: TM, mode: 0, script: Rounds.Script.txt }
            - {name: expansion.dataprovider.compatibility, title: TM, mode: 0, script: Laps.Script.txt }
```

Providers are useless, if they don't listen to events, so here we use another tag for that:

```yaml
services:
    expansion.acme.acme_dataprovider:
        class: yourName\AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.dataprovider, provider: "your_name.acme", interface: "ourName/AcmeBundle\DataProvider\Listener\ListenerInterfaceYournameAcme"}
            - {name: expansion.dataprovider.compatibility, title: TM, mode: 0, script: Rounds.Script.txt }
            - {name: expansion.dataprovider.compatibility, title: TM, mode: 0, script: Laps.Script.txt }
            - {name: expansion.dataprovider.listener, event_name: PlayerConnect, method: onPlayerConnect }
```

When the dedicated server `PlayerConnect` event happens the `onPlayerConnect` method of this data provider should be called. 

You can add as much of these listeners as you wish. 

```yaml
services:
    expansion.acme.acme_dataprovider:
        class: yourName\AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.dataprovider, provider: "your_name.acme", interface: "ourName\AcmeBundle\DataProvider\Listener\Acme"}
            - {name: expansion.dataprovider.compatibility, title: TM, mode: 0, script: Rounds.Script.txt}
            - {name: expansion.dataprovider.compatibility, title: TM, mode: 0, script: Laps.Script.txt}
            - {name: expansion.dataprovider.listener, event_name: PlayerConnect, method: onPlayerConnect}
            - {name: expansion.dataprovider.listener, event_name: PlayerDisconnect, method: onPlayerDisconnect}
```

We can make a listener depend upon a parent plugin:

```yaml
services:
    expansion.acme.acme_dataprovider:
        class: yourName/AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.dataprovider, provider: "your_name.acme", interface: "ourName\AcmeBundle\DataProvider\Listener\Acme"}
            - {name: expansion.dataprovider.compatibility, title: TM, mode: 0, script: Rounds.script.txt}
            - {name: expansion.dataprovider.compatibility, title: TM, mode: 0, script: Laps.script.txt}
            - {name: expansion.dataprovider.parent, parent: "Service id of the plugin it requires to run"}
            - {name: expansion.dataprovider.listener, event_name: PlayerConnect, method: onPlayerConnect}
            - {name: expansion.dataprovider.listener, event_name: PlayerDisconnect, method: onPlayerDisconnect}
```

## Dispatching a custom event

As said, data provider might depend upon a another plugin. When this happens it means that the plugin is dispatching 
events that needs to be normalized.

To dispatch events you need the eXpansion dispatcher service 
`eXpansion\Framework\Core\Services\Application\DispatcherInterface`

And using the dispatcher: 

```php
<?php

use eXpansion\Framework\Core\Services\Application\DispatcherInterface;

class MyClass {

    /** @var DispatcherInterface */
    private $dispatcher;
    
    public function __construct(DispatcherInterface $dispatcher) {
        $this->dispatcher = $dispatcher;
    }

    public function onSomeMethod() {
        // do your code here, and when needed, just call dispatcher as...
        $var1 = "foo";
        $var2 = "bar";
        
        $this->dispatcher->dispatch('my_name.acme.super_event', [$var1, $var2]);
        
    }
}
?>
```

## Available Data Providers

Here is a list & short description of available data providers that you are probably need. There are other data providers 
that you will probably won't need. You can always contact us if you wish to know more.

### Generic Providers

| Dataprovider              | Interface Class  | Dedicated Callback | Callbacks Methods |
| ------------------------- | -----------      | ---------------    | ------  | 
| exp.application           | ListenerInterfaceExpApplication |  |onApplicationInit<br> onApplicationReady<br> onApplicationStop|
| exp.timer                 | ListenerInterfaceExpTimer | | onEverySecond<br> onPreloop<br> onPostloop |
| expansion.user_group      | ListenerInterfaceExpUserGroup | |  onExpansionGroupAddUser<br> onExpansionGroupRemoveUser<br> onExpansionGroupDestroy| 


### Maniaplanet Legacy Callbacks

| Dataprovider              | Interface Class  | Dedicated Callback | Callbacks Methods |
| --- | --- |--- |--- |
| mp.legacy.chat            | ListenerInterfaceMpLegacyChat | *.PlayerChat | onPlayerChat |
| mp.legacy.player          | ListenerInterfaceMpLegacyPlayer | *.PlayerConnect<br> *.PlayerDisconnect<br> *.PlayerInfoChanged<br> *.PlayerAlliesChanged | onPlayerConnect<br> onPlayerDisconnect<br> onPlayerInfoChanged<br> onPlayerAlliesChanged |
| mp.legacy.maplist         | ListenerInterfaceMpLegacyMaplist | *.MapListModified | onMapListModified |
| mp.legacy.map             | ListenerInterfaceMpLegacyMap| *.BeginMap<br> *.EndMap | onBeginMap<br> onEndMap |
| mp.legacy.manialink       | ListenerInterfaceMpLegacyManialink | *.PlayerManialinkPageAnswer | onPlayerManialinkPageAnswer |
| mp.legacy.script          | ListenerInterfaceMpLegacyScript | *.ModeScriptCallbackArray | onModeScriptCallbackArray |

 ### Maniaplanet Script Callbacks
 
 | Dataprovider              | Interface Class  | Dedicated Callback | Callbacks Methods |
 | --- | --- |--- |--- |
 |mp.script.map             |ListenerInterfaceMpScriptMap | Maniaplanet.StartMap_Start<br>Maniaplanet.StartMap_End<br> Maniaplanet.EndMap_Start<br> Maniaplanet.EndMap_End |onStartMapStart<br> onStartMapEnd<br> onEndMapStart<br> onEndMapEnd |
 |mp.script.match           |ListenerInterfaceMpScriptMatch |  Maniaplanet.StartMatch_Start<br> Maniaplanet.StartMatch_End<br> EndMatch_Start<br> EndMatch_End<br> StartTurn_Start<br> StartTurn_End<br>EndTurn_Start<br>EndTurn_End<br>StartRound_Start<br>StartRound_End<br> EndRound_Start<br>EndRound_End| onStartMatchStart<br> onStartMatchEnd.... etc...|
 |mp.script.podium          |ListenerInterfaceMPScriptPodium| Maniaplanet.Podium_Start<br>Maniaplanet.Podium_End | onPodiumStart<br>onPodiumEnd |
 
 
### TM Data Providers

 | Dataprovider              | Interface Class  | Dedicated Callback | Callbacks Methods |
 | --- | --- |--- |--- |
 |tm.script.waypoint       |ListenerInterfaceWaypointData | Trackmania.OnWayPoint | onPlayerWayPoint
 |tm.script.race           |ListenerInterfaceRaceData | Trackmania.OnWayPoint | onPlayerEndRace
 |tm.script.lap            |ListenerInterfaceLapData | Trackmania.OnWayPoint | onPlayerEndLap
 |tm.script.match          |ListenerInterfaceMpScriptMatch |  Maniaplanet.StartMatch_Start<br> Maniaplanet.StartMatch_End<br> EndMatch_Start<br> EndMatch_End<br> StartTurn_Start<br> StartTurn_End<br>EndTurn_Start<br>EndTurn_End<br>StartRound_Start<br>StartRound_End<br> EndRound_Start<br>EndRound_End| onStartMatchStart<br> onStartMatchEnd.... etc...|
 |mp.script.podium         |ListenerInterfaceMpScriptPodium| Maniaplanet.Podium_Start<br>Maniaplanet.Podium_End | onPlayerWayPoint<br>onPlayerEndRace<br>onPlayerEndLap |
 |tm.script.player         |ListenerInterfacePlayerEvents| Trackmania.Event.StartLine<br>Trackmania.Event.GiveUp<br>Trackmania.Event.Respawn |OnStartLine<br> onGiveUp<br>onRespawn|

### SM Data Providers

@todo 
Generate list here

### Compatibility Providers

These data providers contains no logic in them, they exist just to limit a plugin to a certain gamemode & title.

