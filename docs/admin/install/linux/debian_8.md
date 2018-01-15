---
layout: admin
---

# Install eXpansion on Debian 8 (jessie)

### Install Mysql

{% include docs/install/linux/mysql_base.md %}

### Install & Configure PHP

Debian jessie comes with PHP 5.6 which is "expired" you will therefore need to install a newer version. 

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

## Configure eXpansion

{% include docs/install/config_base.md %}

For more information check : [Configure eXpansion](../../config/configuration.html)

## Startup eXpansion 

{% include docs/install/linux/start_base.md %}

## Update eXpansion

{% include docs/install/update_base.md %}