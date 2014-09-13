## OS-GB Map with Ordnance Survey tiles

Displaying a map in British National Grid (`EPSG:27700`) takes a little more work. The OSM map is in OL3's default projection (Spherical Mercator), covers the whole world and has well known resolutions (zoom levels). Using an alternative projection and a corresponding base map requires that we define the projection, map extents and resolutions.

Replace the contents of `ol3.js` with the following and read through the comments for explanation:

```javascript
// Extent of the map in units of the projection (these match our base map)
var extent = [-3276800, -3276800, 3276800, 3276800];

// Fixed resolutions to display the map at (pixels per ground unit (meters when
// the projection is British National Grid))
var resolutions = [1600,800,400,200,100,50,25,10,5,2.5,1,0.5,0.25,0.125,0.0625];

// Define British National Grid Proj4js projection (copied from http://epsg.io/27700.js)
proj4.defs("EPSG:27700","+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");

// Define an OL3 projection based on the included Proj4js projection
// definition and set it's extent.
var bng = ol.proj.get('EPSG:27700');
bng.setExtent(extent);

// Define a TileGrid to ensure that WMS requests are made for
// tiles at the correct resolutions and tile boundaries
var tileGrid = new ol.tilegrid.TileGrid({
    origin: extent.slice(0, 2),
    resolutions: resolutions
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://t0.ads.astuntechnology.com/open/osopen/service?',
                attributions: [
                    new ol.Attribution({html: 'Astun Data Service &copy; Ordnance Survey.'})
                ],
                params: {
                    'LAYERS': 'osopen',
                    'FORMAT': 'image/png',
                    'TILED': true
                },
                tileGrid: tileGrid
            })
        })
    ],
    view: new ol.View({
        projection: bng,
        resolutions: resolutions,
        center: [413674, 289141],
        zoom: 0
    })
});
```

### Notes

#### Projection

OL3 integrates [Proj4js](http://proj4js.org/) to transform coordinates from one coordinate system to another. [epsg.io](http://epsg.io/) provides definitions for most common projections including Proj4js definitions. The extents specified match those of our base map.
