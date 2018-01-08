---
layout: admin
---


# Configuring Bundles

Currently the eXpansion<sup>2</sup> alpha uses direct php-file to define loading the bundles.
Bundles are defined at ```/app/AppKernel.php``` file, to disable a bundle, just add comment mark: "```//```" before the 
bundle you wish to disable, to enable just remove the comment at beginning of the line.

Example, with Immersive windows-bundle disabled.

```php
<?php
  public function registerBundles()
    {
        /* Register symfony bundles & eXpansion core bundles */
        $bundles = $this->registerCoreBundles();

        /* Register eXpansion Base Bundles */
        $bundles[] = new \eXpansion\Bundle\CustomChat\CustomChatBundle();
//        $bundles[] = new \eXpansion\Bundle\ImmersiveWindows\ImmersiveWindowsBundle();
        $bundles[] = new \eXpansion\Bundle\CustomUi\CustomUiBundle();
        $bundles[] = new \eXpansion\Bundle\AdminChat\AdminChatBundle();

        /* Register eXpansion Plugins */
        $bundles[] = new \eXpansion\Bundle\LocalRecords\LocalRecordsBundle();
        $bundles[] = new \eXpansion\Bundle\Maps\MapsBundle();
        $bundles[] = new \eXpansion\Bundle\Players\PlayersBundle();
        $bundles[] = new \eXpansion\Bundle\JoinLeaveMessages\JoinLeaveMessagesBundle();
        $bundles[] = new \eXpansion\Bundle\Emotes\EmotesBundle();
        $bundles[] = new \eXpansion\Bundle\Menu\MenuBundle();
        $bundles[] = new \eXpansion\Bundle\Admin\AdminBundle();
        $bundles[] = new \eXpansion\Bundle\LocalMapRatings\LocalMapRatingsBundle();
        $bundles[] = new \eXpansion\Bundle\WidgetCurrentMap\WidgetCurrentMapBundle();
        $bundles[] = new \eXpansion\Bundle\WidgetBestCheckpoints\WidgetBestCheckpointsBundle();
        $bundles[] = new \eXpansion\Bundle\VoteManager\VoteManagerBundle();
        
        /* Register test bundles. */
        $bundles[] = new \eXpansion\Bundle\Acme\AcmeBundle();

        return $bundles;
    }      
```
