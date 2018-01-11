---
layout: admin
---


# Adding an admin

By default following groups are set: 
1. Master Admin
2. Admin

Admins are defined at ```/app/config/expansion.yml``` file.

Most editors expands spaces to tabs automatically when intend file-contents, this will make the YAML-files not working. 
Please check that you use spaces instead of tabs for intents.  

> /app/config/expansion.yml

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
