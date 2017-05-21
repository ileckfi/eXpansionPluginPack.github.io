---
layout: docs
---

## Helper : Chat Notification

The chat notification helper allows to send chat message to players ingame. It can be used to either send a message to a single user or to a group of users with proper translations. 

The chat provider will also allow to add chat decorations to add color to the chat.

* **Service Name** : `expansion.framework.core.helpers.chat_notification`

| Method                | Description |
| --------------------- | ----------- |
| **sendMessage**         | Send message to a user or more |
|                       | **messageId :** The message to send, can be translation key to be translated before being sent. |
|                       | **to :** Login of the player to send the message to, or null to send it to everyone, or list of logins to send the message to |
|                       | **Parameters :** List of parameters to insert into the trasnlation variables |

### List of default decorations
// TODo decorations are still in fluctuation. 

### Defining a new decoration. 
// TODO the code doing this will change. 
