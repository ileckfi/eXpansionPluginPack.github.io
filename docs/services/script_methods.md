---
layout: docs
---

## Script Methods

MP Documentation : https://github.com/maniaplanet/script-xmlrpc/blob/master/XmlRpcListing.md#methods

Script methods works using the script events, when a script method is called it will not return it's result immediately.
It will send an even containing the result in the next application loop. This makes the usage of the methods 
relatively complex, but it allows the application to be more responsive.  

eXpansion2 has a complete integration to allow abstraction of these methods using php anonymous functions. This 
abstraction layer bases itself upon the DataProvider system to add simplification for game changes. 

For example the `Trackmania.GetScores` & `Shootmania.GetScores` are both accessible the same way. 

### Trackmania.GetScores & Shootmania.GetScores

* **Autowire : TRUE** This service can be autowired into your services. 
* **Class :** eXpansion\Framework\GameManiaplanet\ScriptMethods\GetScores

**Usage :**
```php
<?php 

$this->getScores->get(function(array $scores) {
    // Do your thing.
});
```

This will return either the Trackmania scores or the shootmania scores depending on the game mode.