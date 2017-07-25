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
