## Info for WMS layer

In order to display information for the WMS layer we need to make a `GetFeatureInfo` request to the WMS server. OL3 provides a `getGetFeatureInfoUrl` function to build the URL which we then make a request to using the [reqwest library](https://github.com/ded/reqwest).

Update `ol3.js` replacing the existing event handler for the map "click" event with the following which sends a GetFeatureInfo request if the click was not over a marker and hence no feature is found:

```javascript
// Add an event handler for the map "click" event
map.on('click', function(evt) {

    // Hide existing popup and reset it's class
    popup.hide();
    popup.container.className = 'ol-popup';

    // Attempt to find a marker from the planningAppsLayer
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return feature;
    });

    if (feature) {

        var coord = feature.getGeometry().getCoordinates();
        var str = "<h2><a href='{caseurl}'>{casereference}</a></h2><p>{locationtext}</p>";
            str += "<p>Status: {status} {statusdesc}</p>";
        var info = template(str, feature.getProperties());
        popup.container.className = 'ol-popup marker';
        popup.show(coord, info);

    } else {

        var url = districtLayer
                    .getSource()
                    .getGetFeatureInfoUrl(
                        evt.coordinate,
                        map.getView().getResolution(),
                        map.getView().getProjection(),
                        {
                            'INFO_FORMAT': 'application/json',
                            'propertyName': 'NAME,AREA_CODE,DESCRIPTIO'
                        }
                    );
        reqwest({
            url: url,
            type: 'json',
        }).then(function (data) {
            var feature = data.features[0];
            var info = template("<h2>{NAME}</h2><p>{DESCRIPTIO}</p>", feature.properties);
            popup.show(evt.coordinate, info);
        });

    }
});
```
