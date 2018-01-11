---
layout: dev
---

# Directory Structure of a Bundle

Directories are marked **bold**. Mandatory files are marked `red`.

* **Bundle**    
    * **MyPluginBundle**
        - `MyPluginBundle.php`                   
        * **ChatCommand**
            - Help.php
        * **DataProviders**
            - MyCustomDataProvider.php
            * **Listener**
                - ListenerInterfaceMyPluginEvent.php              
        * **DependencyInjection**
            - `MyPluginExtension.php`            
        * **Plugins**
            - `MyPlugin.php`
            * **Gui**
                - WidgetFactory.php
        * **Resources**
            * **config**
                - chat_commands.yml
                - `plugin.yml`
                - gui.yml
                - services.yml
            * **translations**
                - messages.en.yml
        * **Services**
            - MyService.php        

## Directories purposes

Mandatory Directories marked **bold**.

| Directory | Purpose | Description |
| --- | --- | --- |
| ChatCommand | Chat command classes |  Free to name your classes |
| DataProviders | Data Provider classes |  Class postfixed with `DataProvider.php` |
| DataProviders/Listener | Interfaces |Class prefixed with `ListenerInterface` |
| **DependencyInjection** | Dependencies and Config loading |PluginName postfixed with `Extension`|
| **Plugins** | Plugin Classes |Free to name your classes |
| Plugins/Gui | User Interface classes |Free to name your classes |
| **Resources/config** | Configs | snake cased names |
| **Resources/translations** | Localization messages | Always named: messages.**lang_code**.yml |
| Services | Additional services |Free to name your classes |

## How Plugin loading works

