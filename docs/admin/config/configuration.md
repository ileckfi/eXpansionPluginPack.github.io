---
layout: admin
---

# Configuration

{% include docs/install/config_base.md %}

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
