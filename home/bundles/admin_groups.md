---
layout: home
---

# Admin Groups

## Using admin chat commands

eXpansion 2 admin commands uses mostly dedicated methods names, but there are also aliases.
Allowed admin syntax's are:<br> 
//**cmd** "parameter 1" "parameter 2"<br>
/adm **cmd** "parameter 1" "parameter 2"<br>
/admin **cmd** "parameter 1" "parameter 2"<br>

Where **cmd** is the command or alias you wish to run.
Parameter handling differs from previous version of expansion.
If you have spaces in your parameters, you need to surround the parameter with `"`.
This way you can for example unset server password.<br>
example:<br>
``//password ""``<br>
``//name "$fffMy Cool $0f0Stadium $fffServer"``<br>

## Defining admins

Admins are defined at `/app/config/expansion.yml` file.

By default following groups are set:

```yaml
e_xpansion_admin_groups:
    groups:
        master_admin:
            label: Master Admin
            logins:
                - 'login'
                - 'more.logins'
            permissions: [] # Master_admin has always all permissions.
        admin:
            label: Admin
            logins:
              - 'adminlogin'
            permissions:
              - next
              - restart       
```

To make new groups, use following syntax:

```yaml
        new_group:
            label: New group display name
            logins:
              - 'login'
            permissions:
              - next
              - restart
              - ...       
```
