---
layout: docs
---

## Manialinks 

In eXpansion2 manialinks are consisted of 2 essetial services. 
* **The Plugin** Will hold the logic of when to display/update the manailink, in case of windows this can be a chat command, for widgets it can be on MapBegin event. 
* **The Manialink Factory** will create the manialink & it's content. We will use the factory in the plugin to create/update/destroy the manialink. 

So in a MVC structure, the Plugin is the Controller, the Manialink Factory is the view, they both can use any number of Models to achieve their purpose.

> In eXpansion2 when a player disconnects you don't need to destroy the manialink, the core will take care of it !

Let's note that the Manialink Factory is also handled by the core as a plugin as it needs to be aware of player disconnect events. 

### Creating a new Manialink, 

At this instance we have 2 options either we wish to create a window, in that case we need to extend `WindowFactory` or we wish to create a Widget in which case we will extend `WidgetFactory`. But on both cases we will only bother with 2 functions. 

```php
<?php
protected function createContent(Manialink $manialink) { }

protected function updateContent(Manialink $manialink) { }
```

So how does this work, when a window or widget is displayed for the first time createContent & updateContent are called.
When a window or widget content is updated only the updateContent will be called. 

In both these functions we will append childs to the manialinks, 

```php
<?php
$manialink->addChild(Label::create());
```

#### Creating the ML Widtget service

```yaml
    expansion.framework.core.plugins.gui.menu:
        parent: "expansion.framework.core.plugins.gui.widget_factory"
        class: 'Class of your factory'
        arguments:
            index_0: 'Name of the window' # This can be a translation string as well, 
            index_1: 180 # Width of the ML
            index_2: 90  # Window of the ML
            index_3: null # Position X, if null it will center it
            index_4: null # Position Y, if null it will center it
        tags:
            - {name: expansion.plugin, data_provider: expansion.user_group} 
```

The other arguments the factory needs are provided thanks to the parent class. This way the core team are free to change them without affecting your code.

If you need any other service you can create a seter method in your factory and add this in your service declaration : 

```yaml
        calls:
            - [setAdminGroupsHelper, ['@expansion.framework.admin_groups.helpers.groups']]
```

#### Creating the ML Window service. 

Window service are nearly identical, you will just need to change 

```yaml
parent: "expansion.framework.core.plugins.gui.widget_factory"
```

to 

```yaml
parent: "expansion.framework.core.plugins.gui.window_factory"
```

#### Displaying updating the ML. 

Now that our service is created, we will simply inject it in the plugin that will handle the display. 

Once this is done we can very simply use the fallowing methods : 

```php
<?php
$userGroup = $this->mlfactory->create();
```

The create function either takes in parameter a `login` or a user group. In case of a user group you don't need to handle players connecting & disconnecting from the user group. When a player is added to a group or removed from one his manialinks will be automatically updated. 

We can also update the content of a manialink : 

```php
<?php
$this->mlfactory->update($userGroup);
```

Or destroy it.

```php
<?php
$this->mlfactory->destroy($userGroup);
```


### Sharing between Update & Create functions

You migh need to access some element created in the create function in the update function . In this case **you must not store manialink specific data on your factory**

```php
<?php
$this->myVariable[$manialink->getUserGroup()->getId()] = "...";
```

**This must never be done.**

Instead you can use

```php
<?php
$manialink->setData('my_variable', '...');
$manialink->getData('my_variable');
```

This way you are sure that when the manialink is destroyed so are those variables. 

## Complete Exemple

### The plugin

Here is an exemple showing a widget to all players : 

#### Service decleration

```yaml
    expansion.framework.core.plugins.menu:
        class: eXpansion\Bundle\Menu\Plugins\Menu
        arguments:
            - '@expansion.framework.admin_groups.helpers.groups'
            - '@expansion.framework.core.plugins.gui.menu'
        tags:
            - {name: expansion.plugin, data_provider: expansion.match_data}
```

#### The Service Class

```php
<?php
class Menu implements StatusAwarePluginInterface, MatchDataListenerInterface
{

    /** @var  AdminGroups */
    protected $adminGroups;

    /** @var MenuFactory */
    protected $menuGuiFactory;

    /**
     * Menu constructor.
     *
     * @param AdminGroups $adminGroups
     * @param MenuFactory $menuGuiFactory
     */
    public function __construct(AdminGroups $adminGroups, MenuFactory $menuGuiFactory)
    {
        $this->adminGroups = $adminGroups;
        $this->menuGuiFactory = $menuGuiFactory;
    }


    /**
     * Set the status of the plugin
     *
     * @param boolean $status
     *
     * @return $this
     */
    public function setStatus($status)
    {
        if ($status) {
            $this->displayMenu();
        }

        return $this;
    }

    /**
     * Display a menu for each user group
     */
    protected function displayMenu()
    {
        foreach ($this->adminGroups->getUserGroups() as $userGroup)
        {
            $this->menuGuiFactory->create($userGroup);
        }
    }
    
    // ...
}
```

### The Gui Factory

#### The service decleration

```yaml
    expansion.framework.core.plugins.gui.menu:
        parent: "expansion.framework.core.plugins.gui.widget_factory"
        class: eXpansion\Bundle\Menu\Plugins\Gui\MenuFactory
        arguments:
            index_0: 'Menu Factory'
            index_1: 180
            index_2: 90
            index_3: null
            index_4: null
        calls:
            - [setAdminGroupsHelper, ['@expansion.framework.admin_groups.helpers.groups']]
```

#### The sergvice class

```php
<?php
class MenuFactory extends WidgetFactory
{
    /** @var  ManiaScriptFactory */
    protected $menuScriptFactory;

    /** @var  AdminGroups */
    protected $adminGroupsHelper;

    /**
     * @param ManiaScriptFactory $menuScriptFactory
     */
    public function setMenuScriptFactory($menuScriptFactory)
    {
        $this->menuScriptFactory = $menuScriptFactory;
    }

    /**
     * @param AdminGroups $adminGroupsHelper
     */
    public function setAdminGroupsHelper($adminGroupsHelper)
    {
        $this->adminGroupsHelper = $adminGroupsHelper;
    }

    /**
     * @param Widget $manialink
     */
    protected function createContent(ManialinkInterface $manialink)
    {
        $label = Label::create();
        $label->setText('TEST');

        $manialink->addChild($label);

        $manialink->addChild($this->menuScriptFactory->createScript([]));
    }

    /**
     * @param Widget $manialink
     */
    protected function updateContent(ManialinkInterface $manialink)
    {
        // Do stuff Here.
    }
}
```