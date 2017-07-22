---
layout: docs
---

## Player Storage

Majority of eXpansion<sup>2</sup> Data providers (Beside the player data provider) will provide the login of the users.
The Player Storage allow us to fetch more information about a player, such as his nickname. 

**Service Name** : `expansion.storage.player`

| Method                     | Description |
| -------------------------- | ----------- |
| **getPlayerInfo**          | Returns `Player` object |
| **getOnline**              | Returns `Players[]` online |
| **getPlayers**             | Returns `Players[]` which are players |
| **getSpectators**          | Returns `Players[]` which are spectating |

