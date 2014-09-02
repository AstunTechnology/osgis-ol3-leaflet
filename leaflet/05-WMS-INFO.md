## Info for WMS layer

Getting information for a WMS layer is a bit more involved due to Leaflet not providing an out of the box way of determining the URL for a WMS GetFeatureInfo request. This example defines a `getFeatureInfoUrl` function derived from [this gist](https://gist.github.com/rclark/6908938#file-l-tilelayer-betterwms-js-L33).

Add the following **to the bottom** of `leaflet.js`:

```javascript
// -- Display information on click --

// Add an event handler for the map "click" event
map.on('click', function(e) {

    // Build the URL for a GetFeatureInfo
    var url = getFeatureInfoUrl(
                    map,
                    districtLayer,
                    e.latlng,
                    {
                        'info_format': 'application/json',
                        'propertyName': 'NAME,AREA_CODE,DESCRIPTIO'
                    }
                );

    // Send the request and create a popup showing the response
    reqwest({
        url: url,
        type: 'json',
    }).then(function (data) {
        var feature = data.features[0];
        L.popup()
        .setLatLng(e.latlng)
        .setContent(L.Util.template("<h2>{NAME}</h2><p>{DESCRIPTIO}</p>", feature.properties))
        .openOn(map);
    });

});

/**
 * Return the WMS GetFeatureInfo URL for the passed map, layer and coordinate.
 * Specific parameters can be passed as params which will override the
 * calculated parameters of the same name.
 */
function getFeatureInfoUrl(map, layer, latlng, params) {

    var point = map.latLngToContainerPoint(latlng, map.getZoom()),
        size = map.getSize(),
        bounds = map.getBounds(),
        sw = bounds.getSouthWest(),
        ne = bounds.getNorthEast(),
        sw = crs.projection._proj.forward([sw.lng, sw.lat]),
        ne = crs.projection._proj.forward([ne.lng, ne.lat]);

    var defaultParams = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: layer._crs.code,
        styles: '',
        version: layer._wmsVersion,
        format: layer.options.format,
        bbox: [sw.join(','), ne.join(',')].join(','),
        height: size.y,
        width: size.x,
        layers: layer.options.layers,
        query_layers: layer.options.layers,
        info_format: 'text/html'
    };

    params = L.Util.extend(defaultParams, params || {});

    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

    return layer._url + L.Util.getParamString(params, layer._url, true);

}
```

### All done!

At this point you should have a working Leaflet web map. Visit the [Leaflet website](http://leafletjs.com) where you will find excellent documentation including a [comprehensive list of plugins](http://leafletjs.com/plugins.html).

If you're still looking to do more try the [Extra Credit suggestions](../#extra-credit).
