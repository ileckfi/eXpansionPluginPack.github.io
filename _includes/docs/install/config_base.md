eXpansion2 is a symfony application before anything else, there are therefore a-lot of symfony related configurations. 
We will ignore all this configuration and only bother about what is necessary by eXpansion.

Configuration can be found in `app/config` directory. Configuration that interests us is in the `parameters.yml` file.

If you have not done so already rename the `parameters.yml.dist` to `parameters.yml`.

The fallowing part of the file interests us : 
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

| Parameter             | Description |
| --------------------- | ----------- |
| **database_driver**   | Database driver to use. eXpansion was tested on mysql but should work with other databases as well |
|                       | (mysql/sqlite/pgsql/oracle) |
| | |
| **database_host**     | Host or Ip to connect to the database. |
|                       | If you are using wamp/xamp it's probably `localhost or `127.0.0.1` |
| | |
| **database_port**     | if at null(`~`) default will be used |
| | |
| **database_name**     | Name of the database to use. eXpansion should have it's own database and not share it!|
| | |
| **database_user**     | User to connect to the database, this user should be able to create tables as eXpansion intalls it's own schema |
| | |
| **database_password** | Password to connect to thed database. |

### Dedicated server configurations

| Parameter                 | Description |
| ---------------------     | ----------- |
| **dedicated_host**        | Host or ip to connect to the dedicated. |
|                           | If you are using wamp/xamp it's probably `localhost or `127.0.0.1` |
| **dedicated_port**        | the xmlrpc port configured in the dedicated config file |
| | | 
| **dedicated_timeout**     | Max timeout time, shouldn't be changed |
| | | 
| **dedicated_password**    | Unless specific use case it's needs to be SuperAdmin |
| | | 
| **dedicated_connection_type** | local if the dedicated is on the same machine as eXpansion. remote if not |
|                               | See section below if you configured it as **remote** | 
