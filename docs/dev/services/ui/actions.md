---
layout: dev
---

## Manialink actions
Adding functionality for buttons and other ui elements.
 
So, to make things easy actionFactory is already set in place for ui classes, for Windows and for Widgets.

Here's how to use for button, but you can use the same technique to any element which supports: $element->setAction();

These functions describes as:

CreateAction(ManialinkInterface $manialink, Callable $callback, array $params);
DestroyAction(string $action);

```php
<?php
/** @var string $myAction */
$myAction = $this->actionFactory->createManialinkAction($manialink, [$this, 'callbackSayHello'], null);

$helloButton = $this->uiFactory->createButton("myBundle.gui.button.hello", uiButton::TYPE_DECORATED);
        $helloButton->setTranslate(true)->setAction($myAction);
        $manialink->addChild($helloButton);
```
 
You usually don't need to unset actions, as they are cleared automatically on window close.
but you can do so, if you need to set temporarily actions at your update calls.

```php
<?php
$this->actionFactory->destroyAction($myAction);
```

The callback function is always structured like this:
$login is login of the player who clicked the action,
$entries is array of input elements, usually we use these to send data back from checkboxes, dropdown menus and 
textboxes and text inputs.
$args is the args you can set freely at createManialinkAction, it's the last entry, normally an array.

```php
<?php
    public function callbackSayHello(ManialinkInterface $manialink, $login, $entries, $args) {
    
    }
```

here the $manialink is provided for closing the window, or updating the contents with ease:
```php
<?php
 $this->update($manialink->getUserGroup());
 // or to close
 $this->closeManialink($manialink);
```
