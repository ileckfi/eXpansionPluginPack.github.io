---
layout: dev
---

# Installing for development using docker

There is 2 development cases, either you wish to create a Pull Request to eXpansion or you wish to develop a Bundle for
eXpansion. 

> Docker works on linux or on Windows 10 pro, it don't work on a windows home.

Using docker is not mandatory you can use any other method you wish. We assume here that you are familiar with docker.

## Installing to create a PR to core team. 

The package Readme file gives you the necessary information to [get started with development](https://github.com/eXpansionPluginPack/eXpansion2#getting-started)

## Installing to create your own bundles.

Installing docker to create you own bundles is very much like installing eXpansion to run it on your server using docker.

Start by following the tutorial: 

We will just add src to the volumes of the `eXpansion` container: 

```yaml
expansion:
    image: docker/mp-expansion
    links:
        - mysql
        - dedicated
    volumes:
        - ./data/expansion/app:/var/expansion/app
        - ./src:/var/expansion/src
        - ./data/expansion/composer.json:/var/expansion/composer.json
```

You can now write your eXpansion bundles in the src path. 
