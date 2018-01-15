---
layout: dev
---

# Installing eXpansion for development. 

There is 2 development cases, either you wish to create a Pull Request to eXpansion or you wish to develop a Bundle for
eXpansion. 

## Creating custom bundles

If you wish to create custom bundles, you will need to
 
1. install eXpansion like every body else : [Install on Linux](/docs/admin/install.md)
2. Create a `src` folder in the root, this is where you will put your custom code. 
3. Update composer to add src to autoload : 
```json
{
    "autoload": {
        "psr-0": {
            "": "src/"
        }
    }
}
```

## Coding for eXpansion 

If you wish to create a Pull Request in order to help us you will need to : 

1. Fork eXpansion repository : https://github.com/eXpansionPluginPack/eXpansion2
2. Clone the fork. 
3. Install all necessery dependencies for expansion like everybody else : [Install on Linux](/docs/admin/install.md)
4. Do changes
5. Write Unit Tests if necessery
6. Create PullRequest.

## Notes : 

You will also need to install the falowing php extensions : 
* xdebug