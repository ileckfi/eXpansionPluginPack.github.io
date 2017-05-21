---
layout: docs
---

# Documentation

Welcome to the eXpansion2 user & developper documentation. 

## Requirements

List of Requirements to use eXpansion2 on your servers.


| **Requirements** | **Version**      | 
|------------------|------------------|
| PHP              | 5.6 minimum      |
| Database         | Mysql/Sqlite/... |
| Composer         | 1.4 minimum      |
| Git              | 2.11 minimum     |

eXpansion should run on any sql database; but is tested on mysql primarily.

### PHP Extension

Expansion Requires the fallowing php extensions : 

* **libxml**
* **xmlrpc**
* **json**
* **intl**
* **pdo**

And the pdo extension for the database you are using.

### PHP Configuration

You need to set php memory limit to 1gb at least to run eXpansion on an average server. 
If you wish to run eXpansion on 200+ servers you should increase limit to 2gb to avoird eXpansion crashing during memory peaks.

````ini
memory_limit = 1gb
````
