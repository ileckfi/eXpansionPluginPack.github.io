---
layout: admin
---

# Using admin chat commands

eXpansion 2 admin commands uses mostly dedicated methods names, but there are also aliases.<br/>
Admin syntax's are: <br/>
{% include docs/admin/usage/commands.html %}

Where **command** is the command or alias you wish to run.

Parameter handling differs from previous version of expansion. If you have spaces in your parameters, you need to 
surround the parameter with `"`. This way you can for example unset server password.<br>
examples:<br>
```
//password ""
//name "$fffMy Cool $0f0Stadium $fffServer"
```

# Default Admin commands

## Server Related

| **Command**      | **Parameters**   |   **Description**   | 
|------------------|------------------|----------------------|
| name | 1 - name | sets new server name | 
| comment | 1 - comment | sets new comment |
| password | 1 - pass | set or unset password |
| specpass | 1 - password | set or unset spectator password |
| planets | 0 | show in game planets |
| server | 0 | opens server settings dialog |
| script | 0 | opens script settings dialog |
  
## Players related

| **Command**      | **Parameters**   |   **Description**   | 
|------------------|------------------|----------------------|
| ignore | 1 - login | ignore player |
| unignore | 1 - login | unignore player | 
| kick | 2 - login, reason| kick player with reason | 
| ban | 2  - login, reason | ban player | 
| unban | 1 - login | unban player |
| banlist | 0 | show banlist |
| cleanbanlist | 0 | clear banlist |
| black | 2  - login, reason | blacklist player | 
| unblack | 1 - login | unblacklist player |
| blacklist | 0 | show blacklist |
| saveblacklist | 0 | saves blacklist |
| loadblacklist | 0 | loads blacklist |
| cleanblacklist | 0 | clear banlist |
| addguest | 1 - login | add player to guest list | 
| removeguest | 1 - login | remove player from guest list |
| guestlist | 0 | show guestlist |
| saveguestlist | 0 | save guestlist |
| loadguestlist | 0 | save guestlist |

## Map related 

| **Command**      | **Parameters**   |   **Description**   | 
|------------------|------------------|----------------------|
| res, restart,restartmap | 0 | restarts map immediately | 
| skip, next, nextmap | 0 | skips to next map immediately | 
| shuffle         | 0| randomize map list |
| load | 1 - filename | load matchsettings |
| save | 1 - filename | save matchsettings |
