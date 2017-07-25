---
layout: docs
---

# UI Elements 

eXpansion<sup>2</sup> has some custom FML elements written to help you build your ui.
These classes can be found at `/src/eXpansion/Framework/Gui/Components` directory.

## uiLabel

usage differs little from FML native label:
```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiButton; 

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {   
        
        $label = new uiLabel('text', uiLabel::TYPE_NORMAL);
        $label->setPosition(0,0);
        $manialink->addChild($label);
    }   
}
?>
```

type can be: `uiLabel::TYPE_NORMAL`, `uiLabel::TYPE_TITLE`, `uiLabel::TYPE_HEADER`

## uiButton

usage:
```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiButton; 

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {    
        $button = new uiButton('text', 'type');
        $button->setPosition(0,0);
        $manialink->addChild($button);
    }
}
?>
```
types:
`uiButton::TYPE_DEFAULT`, `uiButton::TYPE_DECORATED`

additional methods are:
`setText('string)`, `setTextColor('rrggbbbaa')`,`setBackgroundColor('rrggbbbaa')`, `setFocusColor()`, `setBorderColor()`, `setAction()`

## uiCheckbox

usage:
```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiCheckbox; 
use eXpansion\Framework\Gui\Components\uiButton; 

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {         
        $checkbox = new uiCheckbox('enable option', 'checkboxName');
        $checkbox->setPosition(0,0);
        $manialink->addChild($checkbox);
        
        $sendbutton = new uiButton("Send", uiButton::TYPE_DECORATED);
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

## uiDropdown

usage:
```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiDropdown; 
use eXpansion\Framework\Gui\Components\uiButton; 


class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {
        parent::createContent($manialink);
        $dropdown = new uiDropdown('myDropdown', ["tech" => "techmap", "lol" => "roflmap"], -1);   
        $manialink->addChild($dropdown);
        
        $sendbutton = new uiButton("Send", uiButton::TYPE_DECORATED);
        $sendbutton->setPosition(36,0);
        $sendbutton->setAction($this->actionFactory->createManialinkAction($manialink, [$this, 'myButtonCallback'], []));
        $manialink->addChild($sendbutton);
    }
    public function myButtonCallback($login, $parameters, $arguments) {
         if (isset($parameters['myDropdown'])) {
            $selection = $parameters['myDropdown'];   // will return "", "techmap" or "roflmap"
            echo $login . " selected: ". $selection;
         }
    }
}

?>
```

## uiLine

draws a line based on starting point and (angle + length) or ending point

```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiLine; 

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {          
        $line1 = new uiLine(0,0);
        $line1->to(0,10);
        $manialink->addChild($line1);
        
        
        $line2 = new uiLine(0,0);
        $line2->setAngle(45.0)->setLength(5.3);        
        $manialink->addChild($line2);                          
    }   
}
?>
```

# Layout builders

Layout builders are helper classes to position elements more easily! Layouts can take any Renderable uiComponent, which has predefined size.
You can also add lines to row or vice versa. 
## layoutRow

```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiCheckbox;
use eXpansion\Framework\Gui\Layouts\layoutRow;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {
        // to add in array
        $checkbox = new uiCheckbox("test checkbox 1", "checkbox1");
        $checkbox2 = new uiCheckbox("test checkbox 2", "checkbox2");
        $row = new layoutRow(0, 0, [$checkbox, $checkbox2], 0);
        $manialink->addChild($row);
        
        // to add one by one
        $rowHelper = new layoutRow(0, -$row->getHeight(), [], 1); // initialize with empty array
        for ($x = 0; $x < 10; $x++) {
            $btn = new uiCheckbox('box'.$x, 'cb_'.$x);
            $rowHelper->addChild($btn); // then add 
        }
        $manialink->addChild($rowHelper);
                              
    }
}
?>
```

## layoutLine

```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiButton;
use eXpansion\Framework\Gui\Layouts\layoutLine;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {
        // to add in array
        $button = new uiButton("Apply");
        $button2 = new uiButton("Cancel", uiButton::TYPE_DECORATED);
        $row = new layoutRow(0, 0, [$button, $button2 ], 0);
        $manialink->addChild($row);
        
        // to add one by one
        $lineHelper = new layoutLine(0, -9, [], 1); // initialize with empty array
        for ($x = 0; $x < 10; $x++) {
            $btn = new uiButton('btn'.$x, 'btn_'.$x);
            $lineHelper->addChild($btn); // then add 
        }
        $manialink->addChild($lineHelper);
    }
}
?>
```
## Complex example with rows and lines...


```php
<?php
namespace mybundle\example\plugins\example;

use eXpansion\Framework\Gui\Components\uiButton;
use eXpansion\Framework\Gui\Layouts\layoutLine;

class myWindowFactory {
    
    protected function createContent(ManialinkInterface $manialink)
    {       
       $checkbox = new uiCheckbox("test checkbox 1", "checkbox1");
       $checkbox2 = new uiCheckbox("test checkbox 2", "checkbox2");
       $line1 = new layoutRow(0, 0, [$checkbox, $checkbox2], 0);   // sum the two ui components to a line

       $ok = new uiButton("Apply", uiButton::TYPE_DECORATED);
       $ok->setAction($this->actionFactory->createManialinkAction($manialink, [$this, 'ok'], ["ok" => "ok"]));

       $cancel = new uiButton("Cancel");
       $cancel->setAction($this->actionFactory->createManialinkAction($manialink, [$this, 'ok'], ["ok" => "cancel"]));
       $line2 = new layoutLine(0, 0, [$ok, $cancel], 1); // sum the two ui components to second line 
       

       $row = new layoutRow(0, -10, [$line1, $line2], 0);  // make two rows of the lines
       $manialink->addChild($row);     
        
    }
}
?>
```

