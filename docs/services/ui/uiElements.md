---
layout: docs
---

## UI Elements 

* **Autowire : TRUE** This service can be autowired into your services. 
* **Class :** eXpansion\Framework\Gui\Ui\Factory

eXpansion<sup>2</sup> has some custom FML elements written to help you build your ui.
These are accessible through a factory. The idea is to normalize the display in all the manialinks of the controller.

All Widget & Windows factories has the UI Factory pre injected in them. The factory can be used with :
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

usage:
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
$input = $this->uiFactory->createInput("name", "", 60);
$manialink->addChild($input);

```

1. name for entry to return 
2. default value
3. width
4. type

Types:
`uiInput:TYPE_BASIC`, `uiInput::TYPE_PASSWORD`

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

### uiBackground

Draws a background behind a label or another element. 
You can draw 2 types of background one for titles & one for normal content. 

```php
<?php
namespace mybundle\example\plugins\example;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {          
        $bg = $this->uiFactory->createBackground(20, 5, 0/* Index of the line */);
        $manialink->addChild($bg);
        
        $bg = $this->uiFactory->createBackground(20, 5, 1/* Index of the line */);
        $manialink->addChild($bg);
        
        $bg = $this->uiFactory->createTitleBackground(20, 5, 1/* Index of the line */);
        $manialink->addChild($bg);                        
    }   
}
?>
```

### uiGridLine

A grid line is basically a line with labels & a background behind it. 
GridLines have fixed width and will redimension elements of a line in order to fit them.

```php
<?php
namespace mybundle\example\plugins\example;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {          
        $gline = $this->uiFactory->createGridLine(
            100, /* Width */
            [
                'width' => 10, /* Width coefficiency */
                'text' => 'Hello', /* Text to display */ 'renderer' => new Quad_Icons64x64_1(), /* Or display a FML element */
                'action' => $this->actionFactory->create(), /* Optional : Action to execute on click */
                'translatable' => true /* If text, should it be translated */
            ] /* Width */
        );
        $manialink->addChild($gline);                  
    }   
}
?>
```


## UI Helpers

### uiAnimation

TODO: write example 

### uiTooltip

You can easily add tooltips to **any** FML or uiElements.
Just add tooltip to manialink, and then use `$tooltip->createTooltip($element, $text)` to add tooltips.

```php
<?php
    // create tooltip helper
    $tooltip = $this->uiFactory->createTooltip();
    $manialink->addChild($tooltip);
   
    $apply = $this->uiFactory->createButton("Apply", uiButton::TYPE_DECORATED);
    $tooltip->addTooltip($apply, "Will apply changes");   
```



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

Creates a scrollable area

TODO: write usage


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

