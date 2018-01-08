---
layout: docs
---

# Install on Ubuntu 16.04^ 

## Install system requirements

### Install Mysql

{% include docs/install/linux/mysql_base.md %}

### Install & Configure PHP

{% include docs/install/linux/php_base.md %}

### Install Composer

{% include docs/install/linux/composer.md %}

## Install / Update eXpansion

{% include docs/install/install_base.md %}

## Configure eXpansion

{% include docs/install/config_base.md %}

For more information check : [Configure eXpansion](./configuration.md)

## Startup eXpansion 

{% include docs/install/linux/start_base.md %}

# Install on Debian (Stretch)

## Install system requirements

### Install Mysql

{% include docs/install/linux/mysql_base.md %}

### Install & Configure PHP

{% include docs/install/linux/php_base.md %}

### Install Composer

{% include docs/install/linux/composer.md %}

## Install / Update eXpansion

{% include docs/install/install_base.md %}

## Configure eXpansion

{% include docs/install/config_base.md %}

For more information check : [Configure eXpansion](./configuration.md)

## Startup eXpansion 

{% include docs/install/linux/start_base.md %}

# Install on Debian 8 (jessie)

### Install Mysql

{% include docs/install/linux/mysql_base.md %}

### Install & Configure PHP

Debian jessie comes with PHP 5.6 which as "expired" you will therefore need to install a newer version. 

The easiest way to install PHP 7.0 is to use [Ondrej Sury](https://deb.sury.org/) packages.

```bash
sudo apt install apt-transport-https ca-certificates
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
sudo sh -c 'echo "deb https://packages.sury.org/php/ stretch main" > /etc/apt/sources.list.d/php.list'
sudo apt update
```

{% include docs/install/linux/php_base.md %}

### Install Composer

{% include docs/install/linux/composer.md %}

## Install / Update eXpansion

{% include docs/install/install_base.md %}

## Configure eXpansion

{% include docs/install/config_base.md %}

For more information check : [Configure eXpansion](./configuration.md)

## Startup eXpansion 

{% include docs/install/linux/start_base.md %}