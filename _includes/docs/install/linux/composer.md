Composer installation is really simple and can be done with a single command:

```bash
$ curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

This will download and install Composer as a system-wide command named composer, under /usr/local/bin. 
The output should look like this:

```
#!/usr/bin/env php
All settings correct for using Composer
Downloading...

Composer successfully installed to: /usr/local/bin/composer
Use it: php /usr/local/bin/composer
```

Now test your installation by running: 
```bash
$ composer
```

Which should output : 
```
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 1.4.2 2017-05-17 08:17:52



Usage:
 command [options] [arguments]

```
