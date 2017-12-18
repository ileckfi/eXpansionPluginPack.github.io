You will need to install php and the dependencies.

```bash
sudo apt-get install -y php7.0 php7.0-cli php7.0-common 
sudo apt-get install -y php7.0-intl php7.0-xml php7.0-mysql php7.0-mcrypt php7.0-zip php7.0-json php7.0-pdo_mysql
```

We can now edit the php.ini file, open with your favorite editor `/etc/php7.0/cli/php.ini` and change the memory limit
```
memory_limit = 1gb
```

If you intend to run 200+ players on the server go for `2gb` to handle peak usages.