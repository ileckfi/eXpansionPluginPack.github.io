eXpansion has an internal cache, everytime you change configurations or you add/remove a bundle you will need to rebuild this cache. 

```bash
bin/console cache:clear --no-warmup --env=prod
```

We can now start eXpansion

```bash
bin/console eXpansion:run --env=prod
```