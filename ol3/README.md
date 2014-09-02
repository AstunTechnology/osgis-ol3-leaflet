# OpenLayers 3

> A high-performance, feature-packed library for all your mapping needs. - [ol3js.org](http://ol3js.org/)

The next version of the widely used OpenLayer library, a ground up rewrite with
a focus on performance and mobile support while retaining the wide format
support and rich GIS functionality.

## Get started

### Start a local webserver

Assuming you have a local copy of the repository, start a local Python webserver by

* In a Terminal (Applications > Accessories > Terminal Emulator) change to the root of the repository. Assuming the repository is in your home directory run:

        cd ~/osgis-ol3-leaflet

* To start the web server run:

        python -m SimpleHTTPServer

* Open [http://localhost:8000/ol3/ol3.html](http://localhost:8000/ol3/ol3.html) in a Web Browser where you should see a blank map ready for us to get started.

### Editing files

To get started coding open `ol3/ol3.js` in a text editor then move on to building a [basic map with OSM tiles](00-OSM-MAP.md). The other supporting files include:

#### HTML

The HTML file `ol3.html` will remain the same throughout the workshop, it provides the basic page structure of a full page map and includes the required CSS and JavaScript including `ol3.js` which you will be working on.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>OpenLayers 3</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="lib/ol3/ol.css" />
    <link rel="stylesheet" href="lib/ol-popup.css" />
    <link rel="stylesheet" href="ol3.css" />
  </head>
  <body>
    <div id="map"></div>
    <script src="../common/lib/reqwest.min.js"></script>
    <script src="lib/proj4.js"></script>
    <script src="lib/ol3/ol.js"></script>
    <script src="lib/ol-popup.js"></script>
    <script src="ol3.js"></script>
  </body>
</html>
```

#### CSS

The CSS file `ol3.css` will also remain unchanged, it defines some basic page style and ensures the map takes up the full page.

```css
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: sans-serif;
  font-size: small;
}

#map {
  width: 100%;
  height: 100%;
}
```

Next step: build a [basic map with OSM tiles](00-OSM-MAP.md).
