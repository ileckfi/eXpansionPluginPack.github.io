---
layout: dev
---

## UI Elements 

* **Autowire: TRUE** This service can be autowired into your services. 
* **Class:** eXpansion\Framework\Gui\Ui\Factory

eXpansion<sup>2</sup> has some custom FML elements written to help you build your ui.
These are accessible through a factory. The idea is to normalize the display in all the manialinks of the controller.

All Widget & Windows factories has the UI Factory pre injected in them. The factory can be used with:
```php
<?php
$this->uiFactory->createSomething($argument1, $argument2, ...);
```

The idea of using a factory service is that this allows any bundle developer to override our elements to completely 
redesign eXpansion.

### uiLabel

usage differs little from FML native label:

```php
<?php
namespace mybundle\example\plugins\example;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {   
        $label = $this->uiFactory->createLabel('text', uiLabel::TYPE_NORMAL);
        $label->setPosition(0,0);
        $manialink->addChild($label);
    }   
}
?>
```

type can be: `uiLabel::TYPE_NORMAL`, `uiLabel::TYPE_TITLE`, `uiLabel::TYPE_HEADER`

### uiButton

Create easily clickable buttons.

usage:
```php
<?php
namespace mybundle\example\plugins\example;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {    
        $button = $this->uiFactory->createButton('apply', uiButton::TYPE_DECORATED);
        $button->setAction(
            $this->actionFactory->createManialinkAction($manialink, [$this, "callbackApply"],[])
            );
        $manialink->addChild($button);
    }
}
?>
```
Parameters:

1. button label
2. type

types:
`uiButton::TYPE_DEFAULT`, `uiButton::TYPE_DECORATED`

methods:
`setText('string)`, `setTextColor('rrggbbbaa')`,`setBackgroundColor('rrggbbbaa')`, `setFocusColor()`, `setBorderColor()`, `setAction()`

### uiCheckbox

Creates checkbox. 
To receive values, you need to add button with callback.


example:
```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiButton; 

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {         
        $checkbox = $this->uiFactory->createCheckbox('enable option', 'checkboxName');
        $checkbox->setPosition(0,0);
        $manialink->addChild($checkbox);
        
        $sendbutton = $this->uiFactory->createButton("Send", uiButton::TYPE_DECORATED);
        $sendbutton->setPosition(36,0);
        $sendbutton->setAction($this->actionFactory->createManialinkAction($manialink, [$this, 'myButtonCallback'], []));
        $manialink->addChild($sendbutton);
    }

    function myButtonCallback($login, $parameters, $arguments) 
    {
        if (isset($parameters['checkboxName']) && $parameters['checkboxName'] == "1") {
            // checkbox is active
        } 
        else {
            // checkbox is passive    
        }
    }
}
?>
```

> uiCheckbox returns $parameters: key as name and value of string "0" or "1"


### uiInput

Create input fields. You can have password field masked by ****** changing the type to `uiInput::TYPE_PASSWORD`   

usage 
```php
<?php
$input = $this->uiFactory->createInput("name", "", 60, uiInput::TYPE_BASIC);
$manialink->addChild($input);

```

1. name for entry to return 
2. default value
3. width
4. type

Types:
`uiInput:TYPE_BASIC`, `uiInput::TYPE_PASSWORD`


### uiInputMasked

Create password field with a button to toggle masked/normal contents.

usage 
```php
<?php
$input = $this->uiFactory->createInputMasked("name", "", 60);
$manialink->addChild($input);

```

1. name for entry to return 
2. default value
3. width

### uiTextBox

Create multiline input field  

usage 
```php
<?php
$textbox = $this->uiFactory->createTextbox("name", "", 3,60);
$manialink->addChild($textbox);

```

1. name for entry to return 
2. default value
3. lines
4. width


### uiDropdown

usage:
```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiButton; 


class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {
        parent::createContent($manialink);
        $dropdown = $this->uiFactory->createDropdown('myDropdown', ["tech" => "techmap", "lol" => "roflmap"], -1);   
        $manialink->addChild($dropdown);
        
        $sendbutton = $this->uiFactory->createButton("Send", uiButton::TYPE_DECORATED);
        $sendbutton->setPosition(36,0);
        $sendbutton->setAction($this->actionFactory->createManialinkAction($manialink, [$this, 'myButtonCallback'], []));
        $manialink->addChild($sendbutton);
    }
    
    public function myButtonCallback($login, $parameters, $arguments) 
    {
         if (isset($parameters['myDropdown'])) {
            $selection = $parameters['myDropdown'];   // will return "", "techmap" or "roflmap"
            echo $login . " selected: ". $selection;
         }
    }
}

?>
```

### uiLine

Draws a line based on starting point and (angle + length) or ending point

```php
<?php
namespace mybundle\example\plugins\example;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {          
        $line1 = $this->uiFactory->createLine(0,0);
        $line1->to(0,10);
        $manialink->addChild($line1);
        
        
        $line2 = $this->uiFactory->createLine(0,0);
        $line2->setAngle(45.0)->setLength(5.3);        
        $manialink->addChild($line2);                          
    }   
}
?>
```

## UI Helpers

### uiAnimation

You can easily add animations to FML elements that implements class of **\FML\Controls\Control**, only label of uiElements is currently supported.
Frames, Quads and Labels are good to animate.

```php
<?php
    // create animation helper
    $animation= $this->uiFactory->createAnimation();
    $manialink->addChild($animation);
    
    $label = $this->uiFactory->createLabel("test");
    $label->setOpacity(0);
    
    $animation->addAnimation($label, "opacity='1'", 1000, 0, "Linear");
    $manialink->addChild($label);
    
```

addAnimation(control, animations, length, delay, easing)
1. Control for animation to be added
2. animation properties, you can automate xml properties of the control:
   normally opacity, scale and pos,  
3. animation length in milliseconds
4. animation delay in milliseconds
5. easing function, string or const

Valid easings are defined as const for uiAnimation, you can use also string.
You can preview easing functions at [www.easings.net](http://easings.net).

| Easing      | Supported types |
| ----------- | ----------- |
| Linear        |`Linear`  |
| Quad          |`QuadIn`,`QuadOut`,`QuadInOut`|
| Cubic         |`CubicIn`,`CubicOut`,`CubicInOut`|
| Quart         |`QuartIn`,`QuartOut`,`QuartInOut`|
| Quint         |`QuintIn`,`QuintOut`, `QuintInOut`|
| Sine          |`SineIn`,`SineOut`,`SineInOut`|
| Exp           |`ExpIn`,`ExpOut`,`ExpInOut`|
| Circ          |`CircIn`,`CircOut`,`CircInOut`|
| Back          |`BackIn`,`BackOut`,`BackInOut`|
| Elastic       |`ElasticIn`,`ElasticOut`,`ElasticInOut`<br>`Elastic2In`,`Elastic2Out`,`Elastic2InOut`|
| Bounce        |`BounceIn`,`BounceOut`,`BounceInOut`|

### uiTooltip

You can easily add tooltips to any FML or uiElements.


```php
<?php
    // create tooltip helper
    $tooltip = $this->uiFactory->createTooltip();
    $manialink->addChild($tooltip);
   
    $btn = $this->uiFactory->createButton("Apply", uiButton::TYPE_DECORATED);
    $tooltip->addTooltip($btn, "Tooltip example 1");   
    
    $btn = $this->uiFactory->createButton("Cancel", uiButton::TYPE_DECORATED);
    $tooltip->addTooltip($btn, "Tooltip example 2");
```

parameters:

1. uiElement or FML control
2. tooltip text


## Layout builders

Layout builders are helper classes to position elements more easily! Layouts can take any Renderable 
uiComponent, which has predefined size. You can also add lines to row or vice versa. 

### layoutRow

```php
<?php
namespace mybundle\example\plugins\example;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {
        // to add in array
        $checkbox = $this->uiFactory->createCheckbox("test checkbox 1", "checkbox1");
        $checkbox2 = $this->uiFactory->createCheckbox("test checkbox 2", "checkbox2");
        $row = $this->uiFactory->createLayoutRow(0, 0, [$checkbox, $checkbox2], 0);
        $manialink->addChild($row);
        
        // to add one by one
        $rowHelper = $this->uiFactory->createLayoutRow(0, -$row->getHeight(), [], 1); // initialize with empty array
        for ($x = 0; $x < 10; $x++) {
            $btn = $this->uiFactory->createCheckbox('box'.$x, 'cb_'.$x);
            $rowHelper->addChild($btn); // then add 
        }
        $manialink->addChild($rowHelper);
                              
    }
}
?>
```

### layoutLine

```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiButton;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {
        // to add in array
        $button = $this->uiFactory->createButton("Apply");
        $button2 = $this->uiFactory->createButton("Cancel", uiButton::TYPE_DECORATED);
        $row = $this->uiFactory->createLayoutRow(0, 0, [$button, $button2 ], 0);
        $manialink->addChild($row);
        
        // to add one by one
        $lineHelper = $this->uiFactory->createLayoutLine(0, -9, [], 1); // initialize with empty array
        for ($x = 0; $x < 10; $x++) {
            $btn = $this->uiFactory->createButton('btn'.$x, 'btn_'.$x);
            $lineHelper->addChild($btn); // then add 
        }
        $manialink->addChild($lineHelper);
    }
}
?>
```

### layoutScrollable

Creates a scrollable area.

```php
<?php
    
    $content = $this->uiFactory->createLayoutRow(55, 0, [], 1);
    
    for ($x = 0; $x < 10; $x++) {
        $btn = $this->uiFactory->createCheckbox('box'.$x, 'cb_'.$x);
        $tooltip->addTooltip($btn, "long description that should go over the bounding box".$x);
        $content->addChild($btn);
    }
    
    $scrollable = new layoutScrollable($content, 40, 30);
    $scrollable->setAxis(true, true);
    $manialink->addChild($scrollable);
        
```

parameters:

1. frame or uiLayout
2. width
3. heigth

## Complex example

```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiButton;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {       
       $checkbox = $this->uiFactory->createCheckbox("test checkbox 1", "checkbox1");
       $checkbox2 = $this->uiFactory->createCheckbox("test checkbox 2", "checkbox2");
       $line1 = $this->uiFactory->createLayoutRow(0, 0, [$checkbox, $checkbox2], 0);   // sum the two ui components to a line

       $ok = $this->uiFactory->createButton("Apply", uiButton::TYPE_DECORATED);
       $ok->setAction($this->actionFactory->createManialinkAction($manialink, [$this, 'callbackButton'], ["type" => "ok"]));

       $cancel = $this->uiFactory->createButton("Cancel");
       $cancel->setAction($this->actionFactory->createManialinkAction($manialink, [$this, 'callbackButton'], ["type" => "cancel"]));
       $line2 = $this->uiFactory->createLayoutLine(0, 0, [$ok, $cancel], 1); // sum the two ui components to second line 
       
       $row = $this->uiFactory->createLayoutRow(0, -10, [$line1, $line2], 0);  // make two rows of the lines
       
       $manialink->addChild($row);     
        
    }
}
?>
```

