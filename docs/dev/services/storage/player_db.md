---
layout: dev
---

## PlayerDB Storage

* **Autowire : TRUE** This service can be autowired into your services. 
* **Class :** eXpansion\Framework\PlayersBundle\Storage\PlayerDb

This service allows you to get DB information of currently connected players. 

> If you need to fetch data for players not currently connected check the Player Repository.


| Method                     | Description |
| -------------------------- | ----------- |
| **get**                    | Get information of a player from his login |
|                            | **String $login** The login of the player |


## Player Repository.

* **Autowire : TRUE** This service can be autowired into your services. 
* **Class :** eXpansion\Framework\PlayersBundle\Repository\PlayerRepository. 

Allows you to query the player Database.
