---
layout: docs
---

## User Interfaces 

ManiaPlanet uses UI technology named ManiaLink which is build on XML. 
In eXpansion<sup>2</sup> we use FancyManiaLinks which is set of PHP classes to build XML, so we don't need to use xml templates and partials.
This allows us to do some really cool stuff, like add script partials to main script file, when if you use a prebuild element. Also where we use this feature is to 
automatically generate translations for UI labels.
     
Creating user interfaces in eXpansion<sup>2</sup>.  

1. **The Plugin** Will hold the logic when to display/update the manialink, in case of windows this can be a chat command, for widgets it can be on MapBegin event. 
2. **The Manialink Factory** Will create the manialink UI & it's content and also handle most of logic for example when user clicks a button and the event needs to travel back to backend. 

### Directory structure and conventions



### Creating new manialink

Core GUI Factories provides you currently 2 types of UI builders to extend with.

1. WindowFactory
2. WidgetFactory

Difference of the two is, Widget is rendered to be a static and borderless, without any extra elements and Window will create movable, framed window with closing possibility.  

But on both classes we will only need to implement the abstract 2 methods. 

```php
protected function createContent(Manialink $manialink) { }

protected function updateContent(Manialink $manialink) { }
```

> Note: With eXpansion<sup>2</sup> when a player disconnect you don't need to destroy the manialink manually, the core will take care of it!

When your Manialink is displayed for the first time, both of the functions are called respectably.
And when UI update is needed, well you guessed right, updateContent gets called.

#### Creating a Widget 

```yaml
    expansion.framework.core.plugins.gui.menu:
        parent: "expansion.framework.core.plugins.gui.widget_factory"
        class: 'Class of your factory'
        arguments:
            index_0: 'Title of the window' # This can be a translation string as well 
            index_1: 180 # Width of the ML
            index_2: 90  # Height of the ML
            index_3: null # Position X, if null it will center it
            index_4: null # Position Y, if null it will center it
        tags:
            - {name: expansion.plugin, data_provider: expansion.user_group} 
```

The other arguments the factory needs are provided thanks to the parent class.
This way the core team are free to change them without affecting your code.

If you need any other service in your class, you can create a setter method in your factory and add following calls to your gui.yml declaration:  

```yaml
        calls:
            - [setAdminGroupsHelper, ['@expansion.helper.admingroups']]
            - [setDedicatedConnection, ['@expansion.service.dedicate_connection']]
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
            - '@expansion.helper.admingroups'
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
            - [setAdminGroupsHelper, ['@expansion.helper.admingroups']]
```

#### The service class

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