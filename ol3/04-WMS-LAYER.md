## WMS layer

Adding a WMS overlay layer in the same projection as the map is also fairly straightforward, in this example we are adding a local authority district layer from [GeoServer](http://geoserver.org/).

Add the following *just above* where you added the GeoJSON source a few steps back:

```javascript
// -- Load GB disticts as a WMS layer --

var districtLayer = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'http://ec2-54-216-41-47.eu-west-1.compute.amazonaws.com/geoserver/osgb/wms?',
        params: {
            'LAYERS': 'osgb:district_borough_unitary_region'
        },
        extent: extent
    })
});
map.addLayer(districtLayer);
```
