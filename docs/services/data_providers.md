---
layout: docs
---

## DataProviders

Data Providers are a different way of thinking to create a controller. 

The idea is to separate gamemode (script) logic from the actual plugin. 
We do this in order to make the controller easier to adapt to different game modes. 

So here is a small diagram of how events travels throught eXpansion. 

![Diagramme explaining Data Providers]({{ "/assets/img/doc/DataProviders.jpg" | absolute_url }})

Basically we have multiple TimeDataProviders, each one of them is set up to work in certain conditions
(we will so about it later), at the begining of a map eXpansion checks which data provider is best suited for 
the current situation and will then start it. 

Data providers will check for 3 elements : 
* **Title** : ALL, TM, SM. 
* **mode** : ALL, script, timeattack, rounds...
* **script** : ALL, TimeAttack.script.txt

We globally fournish data providers only for script modes but nothing prevents creating some for other script modes.

When registering a script mode we can use the keyword `ALL` to make it compatible with all Titles and such. 
This is the case for exemple for the PlayerDataProvider which provides information onPlayerConnect & Disconnect. 

When a data provider is chosen it will chose the most suitable data provider and not the first one that is compatible.
WHat that this means; Let's say we created a `TimeDataProvider` compatible with `ALL` script modes, but on some custom script mode
we shall code `acme.script.txt` the provider doesn't work well. At this point we can create another `TimeDataProvider` 
compatible with `acme.script.txt` only. As this new data provider has more specific information on what script it can run on, 
it will be chosen intstead of the more generic one. 

If we take in concreate exemple of what data providers allow, the controller by default have a LocalRecords plugin as well
as a LocalRecrodsWidget plugin. But when installed on Shootmania Obstacle mode as there is no `TimeDataProviders` compatible
those plugins will be disabled. 

Any developer can at this point create a new `TimeDataProvider` for SM Obstacle in his `SMObstacleAdapterBundle` for exemple. 
Once this is created the `LocalRecordsPlugin`  will be enabled, and so the `LocalRecordsDataProvider` will enable as well, 
which in it's turn will enable `LocalRecrodsWidget`. 

Data providers can also be used to send gamemode dependent "configuration" data to plugins. For exemple widget positions. 

## Available Data Providers

Here is a list & short description of available data providers that you are probably need. There are other data providers 
that you will probably won't need. You can always contact us if you wish to know more.

### Generic Providers

This providers works on all game modes & all situations

#### Chat Data

Allows to keep track of what is going on in chat.

* **Name :** expansion.chat_data
* **Interface :** eXpansion\Framework\Core\DataProviders\Listener\ChatDataListenerInterface
 
#### Player_data
 
Keep track of players connecting and disconnecting.
 
* **Name :** expansion.player_data
* **Interface :** eXpansion\Framework\Core\DataProviders\Listener\PlayerDataListenerInterface
 
#### Map Data

Keep track to changes to the map list.
 
* **Name :** expansion.map_data
* **Interface :** eXpansion\Framework\Core\DataProviders\Listener\MapDataListenerInterface 

#### Timer
 
Base Controller events & timer events such as every second.
 
* **Name :** expansion.timer_data
* **Interface :** eXpansion\Framework\Core\DataProviders\Listener\TimerDataListenerInterface
 
### TM Data Providers

### SM Data Providers

### Compatibility Providers

These data providers contains no logic in them, they exist just to limit a plugin to a certain gamemode & title.

## Registering a Data Provider

A data provider is a multitude of services like everything else in eXpansion. 
 
Here is a very basic data provider compatible with everything and which does nothing : 

```yaml
services:
    expansion.acme.acme_data_provider:
        class: yourName/AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.data_provider, provider: "your_name.acme", interface: "ourName/AcmeBundle\DataProvider\Listener\Acme"}
            - {name: expansion.data_provider.compatibility, title: ALL}
```

As you can see the data provider uses the symfony tags; the first tag declares the provider with 2 information
* **The name of the provider :** You cna have multiple services for the same provider so that eXp can chose from.
* **The interace :** The interface the plugin that uses this provider needs to implement. 

The second tag allows to add compatibility information. So in this case we have basically said our provider is compatible with all titles, 
and as we have not given any specification for mode & scrip it's compatible with all of them as well. 

If we wanted to make it compatible for TM Rounds script & Laps script mode we would have written something like this.

```yaml
services:
    expansion.acme.acme_data_provider:
        class: yourName/AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.data_provider, provider: "your_name.acme", interface: "ourName/AcmeBundle\DataProvider\Listener\Acme"}
            - {name: expansion.data_provider.compatibility, title: TM, mode:0, script:Rounds.script.txt}
            - {name: expansion.data_provider.compatibility, title: TM, mode:0, script:Laps.script.txt}
```

Of course our data providers as they are are useless they need to listen to dedicated server events. we will ad another tag for that.

```yaml
services:
    expansion.acme.acme_data_provider:
        class: yourName/AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.data_provider, provider: "your_name.acme", interface: "ourName/AcmeBundle\DataProvider\Listener\Acme"}
            - {name: expansion.data_provider.compatibility, title: TM, mode:0, script:Rounds.script.txt}
            - {name: expansion.data_provider.compatibility, title: TM, mode:0, script:Laps.script.txt}
            - {name: expansion.data_provider.listener, event_name: PlayerConnect, method: onPlayerConnect}
```

This tells that when the dedicated server `PlayerConnect` event happens the `onPlayerConnect` method of this data provider should be calles. 

We can add as much of thse listeners as we wish. 

```yaml
services:
    expansion.acme.acme_data_provider:
        class: yourName/AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.data_provider, provider: "your_name.acme", interface: "ourName/AcmeBundle\DataProvider\Listener\Acme"}
            - {name: expansion.data_provider.compatibility, title: TM, mode:0, script:Rounds.script.txt}
            - {name: expansion.data_provider.compatibility, title: TM, mode:0, script:Laps.script.txt}
            - {name: expansion.data_provider.listener, event_name: PlayerConnect, method: onPlayerConnect}
            - {name: expansion.data_provider.listener, event_name: PlayerDisconnect, method: onPlayerDisconnect}
```

Finally we can also make a listener depend upon a plugin, 

```yaml
services:
    expansion.acme.acme_data_provider:
        class: yourName/AcmeBundle\DataProvider\Acme
        tags:
            - {name: expansion.data_provider, provider: "your_name.acme", interface: "ourName/AcmeBundle\DataProvider\Listener\Acme"}
            - {name: expansion.data_provider.compatibility, title: TM, mode:0, script:Rounds.script.txt}
            - {name: expansion.data_provider.compatibility, title: TM, mode:0, script:Laps.script.txt}
            - {name: expansion.data_provider.parent, parent: "Service id of the plugin it requires to run"}
            - {name: expansion.data_provider.listener, event_name: PlayerConnect, method: onPlayerConnect}
            - {name: expansion.data_provider.listener, event_name: PlayerDisconnect, method: onPlayerDisconnect}
```

## Dispatching a custom event. 

As we said a data provider might depend upond another plugin. When this happens it means that the plugin is dispatching events that needs to be normalized.

To dispatch events you need the eXpansion dispatcher service `expansion.framework.core.services.application.dispatcher`

Then you can use the dispatch function : 

```php
<?php 
$dispatcher->dispatch('my_name.acme.super_event', [$var1, $var2]);
```

Now you can check the next chapter, the Plugin Components to see how to use thse providers.
