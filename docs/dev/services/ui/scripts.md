---
layout: dev
---

## Scripts

To write scripts for your widgets or windows, you can use FML scripting framework and facilities.

```php
<?php

function createManialink($manialink) {
    
    // to add custom functions and labels you can use this snippet:
    $manialink->getFmlManialink()->getScript()->addScriptFunction("", 
    <<<EOL
        // your maniascript goes here
        Void sayHello() {
            log("hello");        
        }
        
        Text sayHello(Text text) {
            return "hello " ^ text;
        }                         
EOL
    );     
    
    // normally what you'll write at begin of main(), you do onInit    
    $manialink->getFmlManialink()->getScript()->addCustomScriptLabel(ScriptLabel::OnInit, 
    <<<EOL
        // your maniascript goes here
        declare Text toto = "toto";
EOL
     );
     
     // and parts that goes to while loop goes here:     
     $manialink->getFmlManialink()->getScript()->addCustomScriptLabel(ScriptLabel::Loop,
     <<<EOL
     // your maniascript goes here
     foreach (event in PendingEvents) {
        if (event.ControlId == "toto") 
        {
            sayHello();
        }               
     }          
EOL
    );              
}
```

