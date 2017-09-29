---
layout: docs
---

## Plugins

If DataProviders are the eyes & the ears of eXpansion, plugins are the brain. 
They are the ones that will take decision based on the data that comes from the DataProviders. 

Plugins have parent plugins and they have data providers. 

## Declaring a plugin 

```yaml
    yourName\AcmeBundle\Plugin\Acme:
        class: yourName\AcmeBundle\Plugin\Acme
        tags:
            - {name: expansion.plugin, data_provider: expansion.timer_data}
```

Here wa have created a plugin that requires the expansion timer data this also means that this plugin implements the `eXpansion\Framework\Core\DataProviders\Listener\TimerDataListenerInterface`.

```php
<?php 
class Acme implements TimerDataListenerInterface 
{
        public function onPostLoop()
        {
            $this->displayManialinks();
        }
    
        public function onPreLoop()
        {
        }
    
        public function onEverySecond()
        {
        }
}
```

We can of course have a plugin requiring multiple dataproviders.

```yaml
    expansion.acme.acme_plugin:
        class: yourName/AcmeBundle/Plugin\Acme
        tags:
            - {name: expansion.plugin, data_provider: expansion.timer_data}
            - {name: expansion.plugin, data_provider: expansion.player_data}
```

And the class will look like : 

```php
<?php 
class Acme implements TimerDataListenerInterface, PlayerDataListenerInterface
{
        // ...
}
```

Finally we can ask a plugin to depend upon another plugin. 

```yaml
    yourName\AcmeBundle\Plugin\Acme:
        class: yourName\AcmeBundle\Plugin\Acme
        tags:
            - {name: expansion.plugin, data_provider: expansion.timer_data}
            - {name: expansion.plugin, data_provider: expansion.player_data}
            - {name: expansion.plugin.parent, parent: "Service id of the plugin it requires to run"}
```

When creating bundles try to seperate different logic into different plugins, so that you can a easy to maintain code. 

### Status Aware Plugins

A plugin will only activate if all the data providers it needs & all parents it needs are active. You  might need to be able to know
if your plugin is running or not. 

To do this you plugin needs to implement `eXpansion\Framework\Core\Plugins\StatusAwarePluginInterface`. 
When it does the setStatus method will be called to let now the plugin when it's enabled and when it's disabled.

You usually don't need this, as when a plugin id disabled all calls to it's methods from the data prodivers will stop.