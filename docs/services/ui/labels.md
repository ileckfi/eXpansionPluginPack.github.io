---
layout: docs
---

## Labels & Translations

As Expected eXpansion supports translation strings in labels. 
You never need to actually bother for translations if you create properly your labels eXpansion will take care of it.

In order to properly create labels instead of doing `Label::create` you will need to use our factory. 
The service of this factory is `expansion.framework.core.gui.element.factory.label`

### Why are we using factories ?
 
We are using factories because if we need to change the font of all labels on the controller we now we can do it easily. 

But as these factories are `services` 
it also means someone can make a plugin replacing our factories in order to completely change the look & feel of eXpansion.

### How to use labels factory

| Method                | Description |
| --------------------- | ----------- |
| **create**            | Create a new FML label |
|                       | **text :** The text to put in the label, in case of translations the symfony translation key. |
|                       | **translate :** Should the content inside the label be translated? |
|                       | **type :** The type of the label to create |

#### Label Types : 

* **LabelFactory::TYPE_NORMAL :** Normal label that you would use anywhere
* **LabelFactory::TYPE_TITLE :** Label to be used as a title, in grid header or other places.

### Exemple : 

```php
<?php
$label = $labelFactory->create('expansion_core.windows.chat_commands.column_command', true);
$label->setWidth(100);
// ...
```