---
layout: docs
---

# User Groups

User groups is a very powerful functionality of eXpansion<sup>2</sup>. 
Instead of handling players UI 1-by-1, we handle them as groups. This allows a better grouping of example manialinks & therefore increases performance. 

## Default groups

**all_players** <br>`expansion.framework.core.user_groups.all_players`: As it's name indicates contains all players connected to the server. 
**players** <br>`expansion.framework.core.user_groups.players`: All the "players" basically users that are not spectating.
**spectators** <br>`expansion.framework.core.user_groups.spectators`: All players spectating.

If you wish to display a widget to spectators you can send it to the spectators group instead of each player individually. When a player enters a group the widget will be send to him and if he leaves it will be automatically hidden. 

> Admin Group is just an addition to User Groups

So if you wish to send a menu whose content changes according to permissions you can simply send it for each admin group, and when a user enters/leaves a admin group his menu will properly update. 

Each group is a service that can be easily accessed. 

When creating a custom group you never have to handle the player disconnection case, that is automatically handled. 

## Creating a new group

To create a new group you simply need to add a new service. 
> file: bundle/Resources/config/service.yml
```yaml
MyName.acme.user_groups.acme:
        class: '%expansion.framework.core.model.user_groups.group.class%'
        arguments:
            - '@expansion.services.dispatcher'
            - 'acme'
```
 
We will need to create a plugin that uses this service in order to add & remove players. 

> file: bundle/Services/myGroupService.php
 ```php
 public function onPlayerConnect(Player $player)
    {
        if (/* My condition */) {
            $this->userGroup->addLogin($player->getLogin());
        }
    }
    public function onPlayerInfoChanged(Player $oldPlayer, Player $player)
    {
        if (/* My condition */) {
            $this->userGroup->addLogin($player->getLogin());
        } else {
            $this->userGroup->removeLogin($player->getLogin());
        }
    }
 ```

As you can see you can call addLogin without checking if the player is already in the group.
The events will be dispatched only if the group really changed. 

You also can see that we didn't have to handle the onPlayerDisconnect event, thats because expansion will handle that part for you.

## Temporary groups

At a certain point of the application you might wish to create a group that will be destroyed once empty. 
Those are non persistent groups. 

You will wish to create such a group for example to send a manialink to all the players that finished the race. These groups are autodestroyed when  emptied. 

The group either auto empties as players disconnect or by custom plugin that will remove players.

To create such a group you will need to use the user group factory service `expansion.framework.core.user_groups.factory`. 

You can now create a group for a single player : 

```php
$groupFactory->createForPlayer('acme');
```

Or for a list of players,

```php
$groupFactory->createForPlayers(['acme', 'oliverde8', ...]);
```

Those methods will return the created group object. You can use this to add (`addLogin($login)`) or remove (`removeLogin($login)`). The name of the group(`getName()`) is unique and automatically generated and can't be changed. 

### Group Data Provider (`expansion.helper.usergroups`)

The group data provider will notify plugins about changes in groups. 
These plugins need to implement `eXpansion\Framework\Core\DataProviders\Listener\ListenerInterfaceExpUserGroup` in order to work. 

| Method                     | Description |
| -------------------------- | ----------- |
| **onExpansionGroupAddUser**  | Called when a user is added to any group. |
|                            | **Group $group** The group on which the user was added |
|                            | **$login** The login of the user that was added to the group |
||
| **onExpansionGroupRemoveUser** | Called when a user is removed from any group. |
|                            | **Group $group** The group on which the user was removed |
|                            | **$login** The login of the user that was removed from the group |
||
| **onExpansionGroupDestroy** | Called when a user group is disbanded. |
|                            | **Group $group** The group object |
|                            | **$lastLogin** Last login of the group. |

