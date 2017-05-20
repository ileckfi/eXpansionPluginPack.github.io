---
layout: docs
---

## Creating a chat command. 

We will first going to see how to create a chat command before looking into admin commands. 

We will of course need a bundle, but we will also need a plugin to attach the chat command to. This will allow the chat command to run only when the conditions are united for the plugin to run. 

We don't need to code a plugin for this, we can use the class of existing plugin but simply create a new service for our bundle. 

So in plugins.yml file let's put : 

```yaml
services:
    YouName.acme.plugins.chat_commands:
        class: eXpansion\Framework\Core\Model\ChatCommand\ChatCommandPlugin
        tags:
            - {name: YouName.plugin, data_provider: YouName.chat_command_data}
```

So at the moment there is no chat command registered. We could use a slightly more complicated plugin with dependencies (see plugin with dependencies).

Lets now create a new file `chat_commands.yml` 

> We could have put everything in a single services.yml file, but grouping them by file will make it easier to read & maintain. 

In this file we would like create a new service to handle the /acme chat command. 

```yaml
    YouName.acme.chat_command.acme:
        class: YouName\Bundle\Acme\ChatCommand\Acme
        parent: YouName.emotes.chat_command.base
        arguments:
            - "acme"
```

So we are missing the `YouName\Bundle\Acme\ChatCommand\Acme` class. This class needs to extend `eXpansion\Framework\Core\Model\ChatCommand\AbstractChatCommand` and contain only a single execute function. 

```php
public function execute($login, InputInterface $input) 
{
    // Do stuff here
}
```

We are now nearly done, we simply need to register our chat server service to our plugin. 
Open plugin.yml file and add a table argument containing the chat command service our `chat_commands` plugin.

```yaml
services:
    YouName.acme.plugins.chat_commands:
        class: eXpansion\Framework\Core\Model\ChatCommand\ChatCommandPlugin
        arguments:
            - 
                - '@YouName.acme.chat_command.acme'
        tags:
            - {name: YouName.plugin, data_provider: YouName.chat_command_data}
```

### Send message to user,

Well we are done creating our chat command. Let's try now to actually do something with this command. Display a message to the users? 

In order to do this we will need to use the expansion notification service `expansion.framework.core.helpers.chat_notification`. We need to pass the service to our chat command plugin. Let's modify the chat_commands.yml in order to do this : 

```yaml
    YouName.acme.chat_command.acme:
        class: YouName\Bundle\Acme\ChatCommand\Acme
        parent: YouName.emotes.chat_command.base
        arguments:
            - "acme"
            - []
            - '@expansion.framework.core.helpers.chat_notification'
```

At this point let's try and understand the parameters :
* First parameter is as you have guessed the name of the command. 
* Second one is tha aliases, so we add ['toto', 'yop'] then /acme, /toto, /yop would do the same thing. 
* Third is new, we are going to use it. 

We need to modify our `ChatCommand\Acme` to handle the third argument in the constructor. So let's add the fallowing code in the proper places of our Acme file : 

```php
use eXpansion\Framework\Core\Helpers\ChatNotification;

/** @var ChatNotification */
protected $chatNotification

    public funtion __construct(
        $command,
        $aliases,
        ChatNotification $chatNotification,
    ) {
        parent::__construct($command, $aliases);
        $this->chatNotification = $chatNotification;
    }

```

We can now use the chat notification in the execute method. 


```php
public function execute($login, InputInterface $input) 
{
    $this->chatNotification->sendMessage('Hello, this is acme bundle speaking', null);
}
```

> To see how to use translations please refer to the translation & chat notification sections of the documentation. 

### Add description to 

Adding description & helpmessage to your commands is extremely simple, simply overide the the getDescription & getHelp methods in our command class.

```php
    public function getDescription()
    {
        return 'Supe acme command description...;
    }
    public function getHelp()
    {
        return 'Super acle command help message...';
    }

```

Now you can ofcourse add translations for these message using translation keys.


### Using Input parameters

Finally we will try and get a parameter in input. Our command system uses the symfony console componenet to handle input to chat commands. Allowing parametrs of type input or arguments. 

In order to do this let's create a new configure method overiding the parent method.

```php
    protected function configure()
    {
        parent::configure();
        
        // enrich input definition here.
    }

```

We will require the login of the user we wish to send the message to. 

```php
$this->inputDefinition->addArgument(
            new InputArgument('login', InputArgument::REQUIRED, 'Login of the user to send the message to.')
        );
```

> Check the symfony console documentation to see everything you can accomlish here with the input definition!

Now in the execute method we can get this login on the input. 

```php
$login = $input->getArgument('login');
```

You don't need to check if the login argument exists as you have put `InputArgument::REQUIRED` and therefore expansion will handle the verification. 

**! You mist nevertheless check that $login is connected on the server**

### Warnings !

* Even true we use the symfony component you can't use the ask method during executions. 


