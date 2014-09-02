## Basic map with OSM tiles

Edit `ol3.js` so that it looks as follows to display a simple map displaying an OpenStreetMap base map in Spherical Mercator:

```javascript
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6
    })
});
```

Save the file and refresh the page in your browser (F5).

### Notes

#### Projection

The default OL3 projection is [Spherical Mercator (EPSG:3857)](http://epsg.io/3857) which is used by Google Map, OSM amongst others. While Spherical Mercator's map units are in meters it's common to use longitude & latitude to represent coordinates and here we see the initial map center specified in [WGS84 (EPSG:4326)](http://epsg.io/4326) and transformed to Spherical Mercator.
