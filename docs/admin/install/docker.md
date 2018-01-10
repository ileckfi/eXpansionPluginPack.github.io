---
layout: admin
---

## Install using docker

Install docker [www.docker.com](www.docker.com)

> Docker works on linux or on Windows 10 pro, it don't work on a windows home.

The easiest way to install eXpansion using docker is to use a docker-compose file. 

For this installation we are going to use 3 images : 
1. **[Mysql](https://hub.docker.com/_/mysql/)**
2. **[MP Dedicated Server](https://hub.docker.com/r/oliverde8/mp-dedicated/)**
3. **[eXpansion](https://hub.docker.com/r/oliverde8/mp-expansion/)**

### Preparing the docker file

#### Mysql

First let's configure the easiest service, the mysql. 

```yaml
mysql:
    image: mysql:5.7
    environment:
        MYSQL_ROOT_PASSWORD: ""
        MYSQL_DATABASE: expansion
        MYSQL_USER: root
        MYSQL_PASSWORD: ""
        MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
    volumes:
        - ./data/mysql:/var/lib/mysql
```

We have chosen to persist our data in ./data/mysql we can also let docker handle it.

**Check the documentation of the mysql docker for more information.**

#### Dedicated

For this exemple we are going to start a TmCanyon server so lets configure the dedicated server and use the proper
tag of the image.

```yaml
dedicated:
    image: docker/mp-dedicated:TmCanyon
    environment:
        MP_LOGIN: login
        MP_PASSWORD: password
        MP_GAME_SETTINGS: 'MatchSettings/TMCanyonA.txt'
    volumes:
        - ./data/UserData/Maps:/var/maniaplanet/UserData/Maps
        - ./data/UserData/Config:/var/maniaplanet/UserData/Config
        - ./data/UserData/Scripts:/var/maniaplanet/UserData/Scripts
        
```

You are going to need to set up the login and password of you maniaplanet server account in 
the `MP_LOGIN` and `MP_PASSWORD` section.

#### eXpansion

Finally we can configure our eXpansion image. 

```yaml
expansion:
    image: docker/mp-expansion
    links:
        - mysql
        - dedicated
    volumes:
        - ./data/expansion/app:/var/expansion/app
        - ./data/expansion/composer.json:/var/expansion/composer.json
        # We also share the user data from the dedicated so that eXpansion can read & write in the files
        - ./data/UserData:/var/maniaplanet/UserData
```

Our volumes will allow us to configure expansion, but as it is everything is configured to work already. 

(the eXpansion docker is pre configured with the default configurations of the dedicated docker)

#### The final file

I like to put to have the main application first 

```yaml
expansion:
    image: docker/mp-expansion
    links:
        - mysql
        - dedicated
    volumes:
        - ./data/expansion/app:/var/expansion/app
        - ./data/expansion/composer.json:/var/expansion/composer.json
        
dedicated:
    image: docker/mp-dedicated:TmCanyon
    environment:
        MP_LOGIN: login
        MP_PASSWORD: password
        MP_GAME_SETTINGS: 'MatchSettings/TMCanyonA.txt'
    volumes:
        - ./data/UserData:/var/maniaplanet/UserData
        
mysql:
    image: mysql:5.7
    environment:
        MYSQL_ROOT_PASSWORD: ""
        MYSQL_DATABASE: expansion
        MYSQL_USER: root
        MYSQL_PASSWORD: ""
        MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
    volumes:
        - ./data/mysql:/var/lib/mysql
```

### Launch 

We can now launch our services

```bash
docker-compose up
```

First start will be slow as docker downloads all the sources. 

To start the dockers in the background

```bash
docker-compose up -d
```

And to stop them 

```bash
docker-compose stop
```

> Thanks to the way we share UserData directory eXpansion can handle the dedicated server 
as well as if it was installed locally.
