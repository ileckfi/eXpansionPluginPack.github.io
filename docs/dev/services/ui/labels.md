---
layout: dev
---

## Labels & Translations

* **Autowire: TRUE** This service can be auto wired into your services. 
* **Class:** eXpansion\Framework\Core\Model\Gui\Factory\LabelFactory

eXpansion supports translations for labels!
You never need to actually bother for translations if you create properly your labels - eXpansion will take care of it.

Instead of using native FML Label (`Label::create`), you can use our uiFactory: 
```php
<?php
$this->uiFactory->createLabel("my_awesome_bundle.gui.say_hello", uiLabel::TYPE_NORMAL)->setTranslate(true);
```

This uiFactory service to do this is already ready to use for all Windows and Widget-classes, you just need to call it.
and for the text id you would use like here:
 
> myBundle/Resources/config/translations/messages.en.yml

```yaml
my_awesome_bundle:
  gui:
      say_hello: 'hello world!'

```

### Why are we using factories ?
 
We are using factories since if we need to change the font of all labels on the controller we now we can do it easily. 

But as these factories are `services` it also means someone can make a plugin replacing our factories in order to 
completely change the look & feel of eXpansion.

### How to use uiFactory


| Method                | Description |
| --------------------- | ----------- |
| createLabel($text = "", $type = uiLabel::TYPE_NORMAL, $controlId = null) | Creates a new label |
| createButton($text, $type = UiButton::TYPE_DEFAULT)                      | Creates button, either with frame or 
normal |
| createConfirmButton($text, $type = UiButton::TYPE_DEFAULT)                      | Create button with confirm, user 
needs to double click on the button to perform the action. |
| createDropdown($name, $options, $selectedIndex = -1, $isOpened = false) | Create a dropdown selector, 
options is array with key = display, value = return value.|
| createInput($name, $default = "", $width = 30) | creates text input or masked text input |
| createInputMasked($name, $default = "", $width = 30) | creates masked text input with toggable clean
 text view |
|  createLine($x, $y) | Creates simple line from start coordinate with ->length() or ->to(x,y) |
| createTextbox($name, $default = "", $lines = 1, $width = 30) | creates multilined textbox |
| createTooltip() | Creates tooltip for elements, see usage on uiElements page |
| createAnimation() | Creates animation for elements, see usage on uiElements page |
| createLayoutLine($startX, $startY, $elements = [], $margin = 0.); | Create layout helper to align elements in line |
| createLayoutRow($startX, $startY, $elements = [], $margin = 0.) | Creates layout helper to align elements in rows|


