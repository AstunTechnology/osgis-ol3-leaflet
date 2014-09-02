## WMS layer

Adding a WMS overlay layer in the same projection as the map is again straightforward as Leaflet provides a [tiled WMS layer](http://leafletjs.com/reference.html#tilelayer-wms).

We are adding the same local authority district layer from [GeoServer](http://geoserver.org/) as with the [OL3 example](../ol3/04-WMS-LAYER.md).

Add the following **to the bottom** of `leaflet.js`:

```javascript
// -- Load GB disticts as a WMS layer --

var districtLayer = L.tileLayer.wms('http://osgis.astun.co.uk/geoserver/gwc/service/wms?', {
    layers: 'osgb:district_borough_unitary_region',
    tiled: true,
    format: 'image/png',
    transparent: true,
    maxZoom: 14,
    minZoom: 0,
    continuousWorld: true
}).addTo(map);
```
