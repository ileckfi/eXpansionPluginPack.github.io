---
layout: docs
---

## Component : Admin Groups

The Admin Groups component of eXpansion allows having various admin groups with players in them. 
Each group having different permissions. 

There are multiple services forming this component, but as we will see layer a helper service simplifies the usage of the component. 
Making it easy to use.

The Admin groups functionality of expansion will place each player in a certain group, 
player that has no privileges will be put in the guest group. 

In eXpansion V1 a player could bee in multiple groups, this is no longer possible. 
A player can only be in one Admin group.

### Admin Groups Helper

This **service** will allow to check if a player has certain permissions, to which admin group a player belongs, 
and get player groups in order to display widgets for each admin group.


* **Service Name** : `expansion.framework.admin_groups.helpers.groups`

| Method                     | Description |
| -------------------------- | ----------- |
| **getUserGroups**          | Get list of all admin user groups, with the guest user group as well.  |
||
| **getLoginUserGroups**     | Get the user group a certain player is.  |
|                            | **String $login** The login of the user to get the user group of.|
||
| **hasPermission**          | Check if a certain player has a certain permission  |
|                            | **String $login** The login of the user to check the permission for.|
|                            | **String $permission** The permission to check for.|
||

### Admin Chat Commands. 

This component also allows the creation of admin chat commands. In order to do this we will simply use 
`eXpansion\Framework\AdminGroups\Model\AbstractAdminChatCommand` instead of `eXpansion\Framework\Core\Model\ChatCommand\AbstractChatCommand`

When creating chat command using this class we our commands will automatically be prfixes with **admin**.
So if we register a **restart** command it will actually work with **/admin restart** and not just **/restart**.

It will also register aliases so that **/adm restart** works as well. Like normal chat commands you can also register 
aliases. Lihe the command line if you register **res** as alias you are going to have **/admin res** & **/adm res** work.
. 
Finally when registering a AdminChatCommand you must register the permission needed for a user to use the command. 

#### Exemple 
```yaml
    expansion.admin_chat.chat_command.restart:
        class: eXpansion\Bundle\AdminChat\ChatCommand\Restart
        parent: expansion.admin_chat.chat_command.base
        arguments:
            - "restart"
            - "restart"
            -  ['res', 'restartmap']
            - '@expansion.framework.admin_groups.helpers.groups'
```