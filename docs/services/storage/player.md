---
layout: docs
---

## Storage : Map

Majority of eXpansion2 Data providers (Beside the player data provider) will provide the login of the users.
The Player Data Storage **service** allow us to fetch more information about a player, such as his nickname. 

* **Service Name** : `expansion.framework.core.storage.player`

| Method                     | Description |
| -------------------------- | ----------- |
| **getMaps**                | Return the list of all maps on the server.  |
||
| **getMap**                 | Get a map from it's unique ids, if the map is not currently on the server returns `null`|
|                            | **Strin $uid** The unique Id of the map. |
||
| **getMapByIndex**          | Get a map from it's index, if the map is not currently on the server returns `null` |
|                            | **Strin $index** The index number of the map to fetch. |
||
| **getCurrentMap**          | Get information about current map. |
||
| **getNextMap**             | Get information about the next map. |

The map object contains various methods to get smaps name, type...