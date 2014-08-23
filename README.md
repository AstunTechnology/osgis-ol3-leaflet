# Practical OpenLayers 3 & Leaflet

A hands on introduction to using OpenLayer 3 (ol3) and Leaflet to display spatial data on the web. The workshop will introduce the two libraries, the underpinning concepts and strengths of each, and take delegates through creating a series of examples.

## What we will build

The workshop walks through building the same simple web mapping application first using OpenLayers 3 and then with Leaflet. The steps break down as follows:

* Basic map with OSM tiles
* OS-GB Map with Ordnance Survey tiles
* GeoJSON layer with markers
    * Display info for GeoJSON layer
* WMS layer
    * Display info for WMS layer

## Getting started

### Get a copy of the repository

First clone or download (and unzip) [the repository from GitHub](https://github.com/AstunTechnology/osgis-ol3-leaflet) to a suitable location on your local machine.

    git clone https://github.com/AstunTechnology/osgis-ol3-leaflet.git

### Open your working files

Change to the root of the repository and open `ol3/ol3.html` `ol3/ol3.js` and `ol3/ol3.css` in a text editor.

### Start a local webserver

You can start a local Python webserver by changing to the root of the repository in a command prompt and running:

    python -m SimpleHTTPServer

Then in a web browser navigate to [http://localhost:8000/ol3/ol3.html](http://localhost:8000/ol3/ol3.html) where you should see a placeholder for a map.



## Todo

* Set up sub-domain for GeoServer server on AWS (osgis.astun.co.uk)
