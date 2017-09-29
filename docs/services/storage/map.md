---
layout: docs
---

## Map Storage

* **Autowire : TRUE** This service can be autowired into your services. 
* **Class :** eXpansion\Framework\Core\Storage\MapStorage

Instead of each Bundle fetching in it's own map information, this data is centralized in the map storage **service**.

This service keeps track of all maps currently on the server.

| Method                     | Description |
| -------------------------- | ----------- |
| **getMaps**                | Get List of current maps  |
||
| **getMap**                 | Return a single map object |
|                            | **String $uid** The UID of the map to get. |
||
| **getMapByIndex**          | Return a single map object |
|                            | **integer $index** the index number of the map to fetch |
||
| **getCurrentMap**          | Get the current map object. |
||
| **getNextMap**             | Get the next map object. |


The player object contains various methods to get spectator status, nickname or other information on a player.
