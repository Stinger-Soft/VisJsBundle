# VisJs Bundle for Symfony2
vis.js Bundle for Symfony2

## Current Version

vis.js v4.3.0

## Installation

### Add bundle to your composer.json file

``` js
// composer.json

{
    "require": {
		// ...
        "stinger/visjs-bundle": "~4.3"
    }
}
```

### Add bundle to your application kernel

``` php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new Stinger\VisJsBundle\StingerVisJsBundle(),
        // ...
    );
}
```

### Download the bundle using Composer

``` bash
$ php composer.phar update stinger/visjs-bundle
```

### Install assets

Given your server's public directory is named "web", install the public vendor resources

``` bash
$ php app/console assets:install web
```

Optionally, use the --symlink attribute to create links rather than copies of the resources 

``` bash
$ php app/console assets:install --symlink web
```

### Usage

Add the css and js file where needed:

``` html
{% stylesheets  filter="cssrewrite"
	'bundles/stingervisjs/css/vis.min.css'
%}
	<link rel="stylesheet" href="{{ asset_url }}" />
{% endstylesheets %}

{% javascripts
	'bundles/stingervisjs/js/vis.min.js'
%}
	<script src="{{ asset_url }}" ></script>
{% endjavascripts %}
```


# Licenses

Refer to the source code of the included files for license information

# References

1. http://www.visjs.org/
2. http://symfony.com