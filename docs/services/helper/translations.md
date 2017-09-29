---
layout: docs
---

## Helper : Translations

* **Autowire : TRUE** This service can be autowired into your services. 
* **Class :** eXpansion\Framework\AdminGroups\Helpers\Translations

This service will help fetching translations. The Symfony translator service is built to deliver translations for a website, 
which means the format might not exactly bee what is needed. The helper will help with that.

| Method                | Description |
| --------------------- | ----------- |
| **getTranslation**      | Get a certain message in a certain language. |
|                       | **id :** The message key to be translate. |
|                       | **Parameters :** List of parameters to insert into the trasnlation variables. |
|                       | **Locale :** The locale to fetch the translation into. 
|||
| **getTranslations**     | Get array of all translations. When sending a message or a manialink to multiple users at the same time, you need to send a table propelry structured where languages are sorted. This will return an associative array to be used to send chat messages or in manialinks. |
|                       | **id :** The message key to be translate. |
|                       | **Parameters :** List of parameters to insert into the trasnlation variables. |

> Tip: In dev mode symfony will log all missing translations

The translation helper service will also allow you to add decorations & glyph icons to your messages. 

To use a decorationn you need to write the name of the decoration between `{` and `}`'s 

For glyph's between two pipes(`|`). 

**Exemple**
* `{error}` : Will allow all content that fallows to be red
* `|success|` : Will add a check icon. 

### List of default decorations
// TODo decorations are still in fluctuation. 

### List of default glyph's
// TODo decorations are still in fluctuation. 

### Defining a new decoration & glyph. 
// TODO the code doing this will change. 
