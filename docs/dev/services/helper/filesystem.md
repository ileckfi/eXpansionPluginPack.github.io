---
layout: dev
---

## Helper : File System

* **Autowire : TRUE** This service can be autowired into your services. 
* **Class :** eXpansion\Framework\Core\Helpers\FileSystem

File sytem uses the very nice [flysystem](https://github.com/thephpleague/flysystem) library to add a complete 
abstraction on how the controller needs to write files in the dedicated server. 

So basically if the server and the controller are on the same server, or they are hosted each on a docker; or even
if they are on completely different servers the way you will interact with the files of the dedicated 
(Maps/matchsettings) don't change. 
 

| Method                | Description |
| --------------------- | ----------- |
| **getUserData**       | Get filesystem whose root as the UserData folder of the dedciated server. |
|                       | No need to worry about the connection type (local/sftp ...)

