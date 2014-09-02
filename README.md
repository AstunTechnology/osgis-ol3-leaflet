# Practical OpenLayers 3 & Leaflet

A hands on introduction to using [OpenLayer 3 (OL3)](http://ol3js.org) and [Leaflet](http://leafletjs.com) to display spatial data on the web. The workshop will introduce the two libraries, the underpinning concepts and strengths of each, and take delegates through creating a series of examples.

Documentation: [http://astuntechnology.github.io/osgis-ol3-leaflet/](http://astuntechnology.github.io/osgis-ol3-leaflet/)

## What we will build

The workshop walks through building the same simple web mapping application first using OpenLayers 3 and then with Leaflet. The steps break down as follows:

* Basic map with OSM tiles
* OS-GB Map with Ordnance Survey tiles
* GeoJSON layer with markers
    * Info for GeoJSON layer
* WMS layer
    * Info for WMS layer

Completed versions can be seen here:

* [OpenLayers 3 version](ol3/ol3-complete.html)
* [Leaflet version](leaflet/leaflet-complete.html)

## Getting started

### OSGIS 2014 Workshop Quickstart

The [OSGIS 2014](http://www.nottingham.ac.uk/osgis/home.aspx) Workshop used the [OSGeo Live DVD](http://live.osgeo.org/en/). To get setup do the following:

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

This work is licensed under the Creative Commons Attribution 4.0 International
License. To view a copy of this license, visit
http://creativecommons.org/licenses/by/4.0/.

Third-party libraries bundled with this repository for convenience such as
OpenLayers 3, Leaflet, reqwest etc. retain their original license.

## Todo

* Consider adding Canvas example as suggested by @acanimal
