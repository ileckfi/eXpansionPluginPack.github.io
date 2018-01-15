eXpansion2 is a symfony application before anything else, there are therefore a lot of symfony related configurations. 
We will ignore all this configuration and only bother about what is necessary by eXpansion.

Configuration can be found in `app/config` directory. Configuration that interests us is in the `parameters.yml` and  `expansion.yml` file.

If you have not done so already rename the `parameters.yml.dist` to `parameters.yml`. And `expansion.yml.dist` to `expansion.yml`.

The following part of the file interests us : 

> /app/config/parameters.yml

```yaml
parameters:
    database_driver: mysql
    database_host: mysql
    database_port: ~
    database_name: expansion
    database_user: root
    database_password: ~

    dedicated_host: dedicated
    dedicated_port: 5000
    dedicated_timeout: 5
    dedicated_user: SuperAdmin
    dedicated_password: SuperAdmin
    dedicated_connection_type: local
```

### Database configurations


* **database_driver** : Database driver to use. 
eXpansion was tested on mysql but should work with other databases as well (mysql/sqlite/pgsql/oracle)

* **database_host** : Host or Ip to connect to the database.
If you are using wamp/xamp it's probably `localhost` or `127.0.0.1`

* **database_port** : if at null(`~`) default will be used

* **database_name** : Name of the database to use. eXpansion should have it's own database and not share it!

* **database_user** : User to connect to the database, this user should be able to create tables as eXpansion intalls
it's own schema |

* **database_password** : Password to connect to thed database.

### Dedicated server configurations


* **dedicated_host** : Host or ip to connect to the dedicated.
If you are using wamp/xampp it's probably `localhost or `127.0.0.1`

* **dedicated_port** : The xmlrpc port configured in the dedicated config file

* **dedicated_timeout** : Max timeout time, should not be changed

* **dedicated_password** : Unless specific use case it's needs to be SuperAdmin

* **dedicated_connection_type** : local if the dedicated is on the same machine as eXpansion. remote if not
See section below if you configured it as **remote**.


### Configure a MasterAdmin 

**!! eXpansion will allow in the future admins to be added ingame. But for now you will need to handle it in the `expansion.yml` file.**

> /app/config/expansion.yml

In this file replace `login1` by your own login. You may add as many logins as you wish on multiple lines. Exempme : 

```yml
e_xpansion_admin_groups:
    groups:
        master_admin:
            label: Master Admin
            logins:
                - oliverde8
                - reaby
            permissions: [] # Master_admin has always all permissions.
        admin:
            label: Admin
            logins: []
            permissions:
              - next
              - restart
```