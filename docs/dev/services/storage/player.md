---
layout: dev
---

## Player Storage

* **Autowire : TRUE** This service can be autowired into your services. 
* **Class :** eXpansion\Framework\Core\Storage\PlayerStorage

Majority of eXpansion<sup>2</sup> Data providers (Beside the player data provider) will provide the login of the users.
The Player Storage allow us to fetch more information about a player, such as his nickname. 

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
