## GeoJSON layer with markers

Loading a GeoJSON features returned from an API call is fairly straight forward even when the GeoJSON features are in WGS84 and your map is in British National Grid. Append the following to be bottom of `ol3.js`:

```javascript
// -- Load planning applications as GeoJSON and zoom to their extent once loaded --

var planningAppsSource = new ol.source.GeoJSON({
    'projection': map.getView().getProjection(),
    'url': 'http://hub-dev.astun.co.uk/developmentcontrol/0.1/applications/search?status=live&gsscode=E07000214&status=live'
});

planningAppsSource.on('change', function (evt) {
    var src = evt.target;
    if (src.getState() === 'ready') {
        map.getView().fitExtent(src.getExtent(), map.getSize());
    }
});

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
map.addLayer(planningAppsLayer);
```
