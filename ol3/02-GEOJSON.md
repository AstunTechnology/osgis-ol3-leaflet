## GeoJSON layer with markers

Loading GeoJSON features returned from an API call is fairly straight forward even when the GeoJSON features are in WGS84 and your map is in British National Grid.

OpenLayers has the concept of a format to read data, a source to manage loading data and a layer to display it.

Here we are creating a [`ol.source.GeoJSON`](http://ol3js.org/en/master/apidoc/ol.source.GeoJSON.html) source which loads the data and uses the [`ol.format.GeoJSON`](http://ol3js.org/en/master/apidoc/ol.format.GeoJSON.html) format to read the features. An [`ol.layer.Vector`](http://ol3js.org/en/master/apidoc/ol.layer.Vector.html) layer is then used to display the features using the specified style.

Add the following **to the bottom** of `ol3.js`:

```javascript
// -- GeoJSON layer --

// Define a GeoJSON source that will load features via a http call. By
// specifying the projection of the map's view OL3 will transform the coordinates
// for display
var planningAppsSource = new ol.source.GeoJSON({
    'projection': map.getView().getProjection(),
    'url': 'http://digitalservices.surreyi.gov.uk/developmentcontrol/0.1/applications/search?status=live&gsscode=E07000214&status=live'
});

// Create a vector layer to display the features within the GeoJSON source and
// applies a simple icon style to all features
var planningAppsLayer = new ol.layer.Vector({
    source: planningAppsSource,
    style: new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 40],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'marker-icon.png'
        }))
    })
});

// Add the layer to the map
map.addLayer(planningAppsLayer);

// Once the change event of the source occurs and the source is 'ready' zoom to
// the extent of the features
planningAppsSource.on('change', function (evt) {
    var src = evt.target;
    if (src.getState() === 'ready') {
        map.getView().fitExtent(src.getExtent(), map.getSize());
    }
});
```
