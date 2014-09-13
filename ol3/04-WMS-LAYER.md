## WMS layer

Adding a WMS overlay layer in the same projection as the map is also fairly straightforward, in this example we are adding a local authority district layer from [GeoServer](http://geoserver.org/).

Here we are defining a cached tiled layer similar to our base map, using the same `tileGrid` to ensure that the requests are for the appropriate resolutions (scales) and line up with the cache grid.

Add the following **just above where you added the code to add a GeoJSON layer** (`// -- GeoJSON layer --`) a few steps back:

```javascript
// -- Load GB disticts as a WMS layer --

var districtLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://osgis.astun.co.uk/geoserver/gwc/service/wms?',
        params: {
            'LAYERS': 'osgb:district_borough_unitary_region',
            'VERSION': '1.1.1',
            'FORMAT': 'image/png',
            'TILED': true
        },
        tileGrid: tileGrid
    })
});
map.addLayer(districtLayer);
```
