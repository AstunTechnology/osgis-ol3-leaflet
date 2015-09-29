# Practical OpenLayers 3 & Leaflet

A hands on introduction to using [OpenLayer 3 (OL3)](http://ol3js.org) and [Leaflet](http://leafletjs.com) to display spatial data on the web. The workshop will introduce the two libraries, the underpinning concepts and strengths of each, and take delegates through creating a series of examples.

Documentation: [http://astuntechnology.github.io/osgis-ol3-leaflet/](http://astuntechnology.github.io/osgis-ol3-leaflet/)  
Repository: [https://github.com/AstunTechnology/osgis-ol3-leaflet](https://github.com/AstunTechnology/osgis-ol3-leaflet)  

## What we will build

The workshop walks through building the same simple web mapping application first using OpenLayers 3 and then with Leaflet. The steps break down as follows:

* Basic map with OSM tiles
* OS-GB Map with Ordnance Survey tiles
* GeoJSON layer with markers
    * Info for GeoJSON layer
* WMS layer
    * Info for WMS layer

Completed versions can be seen here:

* [OpenLayers 3 version](http://astuntechnology.github.io/osgis-ol3-leaflet/ol3/ol3-complete.html)
* [Leaflet version](http://astuntechnology.github.io/osgis-ol3-leaflet/leaflet/leaflet-complete.html)

## Getting started

### Get a copy of the repository

First clone or download (and unzip) [the repository from GitHub](https://github.com/AstunTechnology/osgis-ol3-leaflet) to a suitable location on your local machine.

    git clone https://github.com/AstunTechnology/osgis-ol3-leaflet.git

If you are using your own machine then you should be good to go, [start building an OpenLayers 3 map](ol3/README.md).

#### OSGeo Live DVD

If you are using the [OSGeo Live DVD](http://live.osgeo.org/en/) do the following:

* Dismiss the Welcome and Upgrade prompts
* In Firefox (Applications > Web Browser) navigate to [http://is.gd/osgis2014](http://is.gd/osgis2014)
* Copy and paste the commands displayed in your browser into a Terminal (Applications > Accessories > Terminal Emulator) and hit return

The commands set the keyboard layout to GB, installs `git` and `gedit` (a slightly better text editor) then clones the repository and changes you into it's root. Now you're ready to [start building an OpenLayers 3 map](ol3/README.md).

----

## Extra credit

* Style markers based on an attribute value
* Add additional WMS layer (the WMS server used in the workshop also has a `osgb:county_region` layer)

### Resources

* [OpenLayers 3 website](http://ol3js.org) and [API docs](http://ol3js.org/en/master/apidoc/)
* [Leaflet website](http://leafletjs.com) and [API docs](http://leafletjs.com/reference.html)

## License

The documentation is licensed under the Creative Commons Attribution 4.0 International
License. To view a copy of this license, visit
http://creativecommons.org/licenses/by/4.0/. Sample code is licensed MIT. &copy; Astun Technology.

Third-party libraries bundled with this repository for convenience such as
OpenLayers 3, Leaflet, reqwest etc. retain their original license.

## Todo

* Consider adding Canvas example as suggested by @acanimal
