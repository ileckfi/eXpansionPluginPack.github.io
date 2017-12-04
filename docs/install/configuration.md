---
layout: docs
---

# Configuration

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

## Database configurations

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

## Dedicated server configurations

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

### Local / Remote dedicated. 

If the dedicated server & eXpansion are installed on the same server eXpansion can detect the path to the 
Dedicated `UserData` folder, but if the dedicated server is installed remotely you will need to say to expansion how
to access the files. 

If you installed the dedicated & eXpansion on the same server jump to configuring admins section

eXpansion uses [flysystem](https://github.com/thephpleague/flysystem) library to handle this. It therefore supports
ftp/sftp or even other methods. 

Let's first have a look at the default config : 
```yaml
oneup_flysystem:
    adapters:
        dedicated_user_data:
            nulladapter: ~

    filesystems:
        dedicated_user_data:
            adapter: dedicated_user_data
```

Here we are using the `nulladapter` if the connection is local it's automatically replaced by the proper local adapter.
If null adapter is left with a remote connection eXpansion will simply not be able to write or read files in UserData. 
This will limit some functionality.

#### Docker exemple 

In case of docker you will need to make the user directory available locally to eXpansion. 
Then configure the adapter as fallows

```yaml
oneup_flysystem:
    adapters:
        dedicated_user_data:
            local:
                directory: "/var/maniaplanet/UserData/"
    filesystems:
        dedicated_user_data:
            adapter: dedicated_user_data
```

Here was say to eXpansion that the UserData is available locally in at the path `/var/maniaplanet/UserData/`

#### FTP Exemple 

```yaml
oneup_flysystem:
    adapters:
        dedicated_user_data:
            ftp:
                host: ftp.domain.com
                port: ~
                username: ~
                password: ~
                root: ~
                ssl: ~
                timeout: ~
                permPrivate: ~
                permPublic: ~
                passive: ~
    filesystems:
        dedicated_user_data:
            adapter: dedicated_user_data
```

#### SFTP Exemple 

```yaml
oneup_flysystem:
    adapters:
        dedicated_user_data:
            sftp:
                host: ftp.domain.com
                port: ~
                username: ~
                password: ~
                root: ~
                timeout: ~
                privateKey: ~
                permPrivate: ~
                permPublic: ~
                directoryPerm: ~
    filesystems:
        dedicated_user_data:
            adapter: dedicated_user_data
```

See the OneupFlystemBundle documentation for more user cases : https://github.com/1up-lab/OneupFlysystemBundle/blob/master/Resources/doc/index.md

## Configuring admins 

WIP so no doc for now. Sorry (look into expansion.yml)