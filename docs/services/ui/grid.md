---
layout: docs
---

## Grids

Grids are elements allowing you to quickly display a table with pagination & search/sorting support. 

To create a grid you will need either a Window or a Widget factory but also a DataCollection. 

**Data Collections** are classes containing all the necessery methods for grids to get sorted & filtered data.

### Data Collection, 

There are 2 types of prebuilt data collections in eXpansion, 
nothing prevents you from creating you own that will use a custom data source. 

For exemple you may wish to create custom DataCollection to fetch data from an api.

#### Array Data Collection Factory

This allows you to create a data collection from a list of associative array. 

The `@expansion.framework.core.model.gui.grid.data_collection_factory.array` factory will allow you to create one. 

**Exemple :**  

```php
<?php
$collection = $this->dataCollectionFactory->create(
    [
        ['name' => 'TOTO-1', 'size' => 5],
        ['name' => 'TOTO-2', 'size' => 7],
    ]
)
```

#### Object Data Collection Factory, 

Works very much like the *Array Data Collection Factory*; 
but instead of a list of associative arrays will have a list of objects.

The `@expansion.framework.core.model.gui.grid.data_collection_factory.object` factory will allow you to create one. 


```php
<?php
$collection = $this->dataCollectionFactory->create(
    [
        $myObject1,
        $myObject2,
    ]
)
```

#### Custom Data Collections

TODO Describe how to create a custom data collection.

### Using the Grid Builder

To create a grid you need the grid builder factory service `@expansion.framework.core.model.gui.grid.builder_factory`

With this you can generate in instance of grid builder that you will be able to use to create you grid.

```php
$gridBuilder = $this->gridBuilderFactory->create();
```

You need after that set a few more informations : 

```php
<?php
function createContent(ManialinkInterface $manialink)
{
    $collection = $this->dataCollectionFactory->create($this->data);

    $gridBuilder = $this->gridBuilderFactory->create();
    $gridBuilder->setManialink($manialink)
        ->setDataCollection($collection)
        ->setManialinkFactory($this);
}
```

Basically the **grid builder** will need to access the manialink & the manialink factory 
(either the window factory or the widget factory). These are required so that pagination actions can
be handled automatically by the grid builder. The grid can be added in any element of your manialink.

To add the grid to your manialink you need first to finish building it. 

```php
<?php
$grid = $gridBuilder->build($width, $height);
```

The gird is a FML element that you may add as you wish, 

Here for exemple we add it in the main fame of the manialink.
```php
$contentFrame = $manialink->getContentFrame();
$contentFrame->addChild($grid);
```


#### Adding columns

Before building the grid you will need to configure the columns you wish to display.

You will need to use the `addTextColumn` method of the grid builder for this. 

```php
<?php 
$gridBuilder->setManialink($manialink)
    ->addTextColumn(
        'command',
        "expansion_core.windows.chat_commands.column_command",
        25
    )
```

The first parameter is the key in the associative array, 
or in case of a object collection the name of the getter method to call.

The second parameter is the translation id of the title of the column.

The third argument is the width coefficiency. Using this & total width the
builder will arrange the width of each column. 

```php
<?php 
$gridBuilder->setManialink($manialink)
    ->addTextColumn(
        'command',
        "expansion_core.windows.chat_commands.column_command",
        25
    )
<?php 
$gridBuilder->setManialink($manialink)
    ->addTextColumn(
        'command2',
        "expansion_core.windows.chat_commands.column_command_2",
        25
    )
```

In this case the both columns will be of equal width filling the full width of the grid. 

If you wish to have a 2/1 width ration you can do : 

```php
<?php 
$gridBuilder->setManialink($manialink)
    ->addTextColumn(
        'command',
        "expansion_core.windows.chat_commands.column_command",
        2
    )
<?php 
$gridBuilder->setManialink($manialink)
    ->addTextColumn(
        'command2',
        "expansion_core.windows.chat_commands.column_command_2",
        1
    )
```

#### Adding action buttons

Adding actions buttons is very much like adding any other column. 
But in action buttons you will need to add something else then a string, but a button FML element directly. 

```php
<?php
->addActionColumn(
    'description',
    '',
    5,
    array($this, 'callbackDescription'),
    $desctiptionButton
);
```


1) Action columns need a unque, key
2) It can take a text in parameter if no pregenerated element needs to be used.
3) As with a TextColumn a width coefficiency
4) The action callback, 
5) The custom FML element to use, or null if wish to use a text.

#### Configuring searcheble fields

TODO This has not been yet coded.

#### Exemple

```php
<?php
class WindowHelpFactory extends WindowFactory
{
    protected function createContent(ManialinkInterface $manialink)
    {
        $collection = $this->dataCollectionFactory->create($this->getChatCommands($manialink));
        $collection->setPageSize(2);
        $helpButton = new Label();
        $helpButton->setText('')
            ->setSize(6, 6)
            ->setAreaColor("0000")
            ->setAreaFocusColor("0000");
        $desctiptionButton = new Label();
        $desctiptionButton->setText('')
            ->setSize(6, 6)
            ->setAreaColor("0000")
            ->setAreaFocusColor("0000");
        $gridBuilder = $this->gridBuilderFactory->create();
        $gridBuilder->setManialink($manialink)
            ->setDataCollection($collection)
            ->setManialinkFactory($this)
            ->addTextColumn(
                'command',
                "expansion_core.windows.chat_commands.column_command",
                25
            )
            ->addTextColumn(
                'description',
                'expansion_core.windows.chat_commands.column_description',
                70,
                false,
                true
            )
            ->addActionColumn('help', '', 5, array($this, 'callbackHelp'), $helpButton)
            ->addActionColumn(
                'description',
                '',
                5,
                array($this, 'callbackDescription'),
                $desctiptionButton
            );
        $manialink->setData('grid', $gridBuilder);
    }
    /**
     * @inheritdoc
     */
    protected function updateContent(ManialinkInterface $manialink)
    {
        /** @var Frame $contentFrame */
        $contentFrame = $manialink->getContentFrame();
        $contentFrame->removeAllChildren();
        $collection = $this->dataCollectionFactory->create($this->getChatCommands($manialink));
        $collection->setPageSize(20);
        /** @var GridBuilder $gridBuilder */
        $gridBuilder = $manialink->getData('grid');
        $contentFrame->addChild($gridBuilder->build($contentFrame->getWidth(), $contentFrame->getHeight()));
    }
}
```

### Using the Grid Window

The grid window is is prebuilt and allows an easy usage of the grid.

It allows less flexibility as you can not display more then one grid in one window. 

```php
<?php

class MyWindoWFActory extends GridWindowFactory
{
    /**
     * @param ManialinkInterface $manialink
     * @return void
     */
    protected function createGrid(ManialinkInterface $manialink)
    {
        $collection = $this->dataCollectionFactory->create($this->getData());

        $gridBuilder = $this->gridBuilderFactory->create();
        $gridBuilder->setManialink($manialink)
            ->setDataCollection($collection)
            ->setManialinkFactory($this)
            ->addTextColumn(
                'index',
                'expansion_maps.gui.window.column.index',
                '1',
                true
            )
        $manialink->setData('grid', $gridBuilder);
    }
}
