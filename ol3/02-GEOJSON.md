## GeoJSON layer with markers

Loading a GeoJSON features returned from an API call is fairly straight forward even when the GeoJSON features are in WGS84 and your map is in British National Grid.

Add the following to be bottom of `ol3.js`:

```javascript
// -- Load planning applications as GeoJSON and zoom to their extent once loaded --

// Define a GeoJSON source that will load features via a http call. By
// specifying the projection of the map's view OL3 will transform the coordinates
// for display
var planningAppsSource = new ol.source.GeoJSON({
    'projection': map.getView().getProjection(),
    'url': 'http://hub-dev.astun.co.uk/developmentcontrol/0.1/applications/search?status=live&gsscode=E07000214&status=live'
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
