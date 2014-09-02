# Leaflet

> An Open-Source JavaScript Library for Mobile-Friendly Interactive Maps.
>
> Leaflet is designed with simplicity, performance and usability in mind. It works efficiently across all major desktop and mobile platforms out of the box, taking advantage of HTML5 and CSS3 on modern browsers while still being accessible on older ones. - [leafletjs.com](http://leafletjs.com/)

## Get started

If you've not already completed the [OpenLayers 3 exercise](../ol3/README.md) then change to the root of the repository and start a local webserver:

    python -m SimpleHTTPServer

Navigating to [http://localhost:8000/leaflet/leaflet.html](http://localhost:8000/leaflet/leaflet.html) you should see a blank map ready for us to get started.

### Editing files

To get started coding open `leaflet/leaflet.js` in a text editor then move on to building a [basic map with OSM tiles](00-OSM-MAP.md). The other supporting files include:

#### HTML

The HTML file `leaflet.html` will remain the same throughout the workshop, it provides the basic page structure of a full page map and includes the required CSS and JavaScript including `leaflet.js` which you will be working on.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Leaflet</title>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <link rel="stylesheet" href="lib/leaflet-0.7.3/leaflet.css" />
    <link rel="stylesheet" href="leaflet.css" />
  </head>
  <body>
    <div id="map"></div>
    <script src="../common/lib/reqwest.min.js"></script>
    <script src="lib/leaflet-0.7.3/leaflet.js"></script>
    <script src="lib/proj4-compressed.js"></script>
    <script src="lib/proj4leaflet.js"></script>
    <script src="leaflet.js"></script>
  </body>
</html>
```

#### CSS

The CSS file `leaflet.css` will also remain unchanged, it defines some basic page style and ensures the map takes up the full page.

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
