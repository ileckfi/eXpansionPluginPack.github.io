---
layout: docs
---

## Map Storage

Instead of each Bundle fetching in it's own map information, this data is centralized in the map storage **service**.

This service keeps track of all maps currently on the server.

**Service Name** : `expansion.storage.map`

| Method                     | Description |
| -------------------------- | ----------- |
| **getPlayerInfo**          | Get information of a player from his  |
|                            | **String $login** The login of the player |
||
| **getOnline**              | Returns list of all connected player objects.  |
|                            | Works the same way as the all player group but instead of logins returns objects. |
||
| **getPlayers**             | Get list of players,  |
|                            | Works the same way as the player group but instead of logins returns objects. |
||
| **getSpectators**          | Get list of spectators, |
|                            | Works the same way as the spectator player group but instead of logins returns objects. |

The player object contains various methods to get spectator status, nickname or other information on a player.
