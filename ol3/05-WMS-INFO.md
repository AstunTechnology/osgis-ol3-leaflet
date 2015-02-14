## Info for WMS layer

In order to display information for the WMS layer we need to make a `GetFeatureInfo` request to the WMS server. OL3 provides a [`getGetFeatureInfoUrl`](http://ol3js.org/en/master/apidoc/ol.source.ImageWMS.html#getGetFeatureInfoUrl) function to build the URL which we then make a request to using the [reqwest library](https://github.com/ded/reqwest).

Update `ol3.js` **replacing the existing event handler for the map "singleclick" event** with the following which sends a GetFeatureInfo request if the click was not over a marker and hence no feature is found:

```javascript
// Add an event handler for the map "singleclick" event
map.on('singleclick', function(evt) {

    // Hide existing popup and reset it's offset
    popup.hide();
    popup.setOffset([0, 0]);

    // Attempt to find a marker from the planningAppsLayer
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return feature;
    });

    if (feature) {

        var coord = feature.getGeometry().getCoordinates();
        var props = feature.getProperties();
        var info = "<h2><a href='" + props.caseurl + "'>" + props.casereference + "</a></h2>";
            info += "<p>" + props.locationtext + "</p>";
            info += "<p>Status: " + props.status + " " + props.statusdesc + "</p>";
        // Offset the popup so it points at the middle of the marker not the tip
        popup.setOffset([0, -22]);
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
            var props = feature.properties;
            var info = "<h2>" + props.NAME + "</h2><p>" + props.DESCRIPTIO + "</p>";
            popup.show(evt.coordinate, info);
        });

    }

});
```

### All done!

At this point you should have a working OpenLayers 3 web map client. Visit the [OpenLayers 3 website](http://ol3js.org) and [API docs](http://ol3js.org/en/master/apidoc/) for more information and to keep building.

### What's next?

[Try building the same using Leaflet](../leaflet/README.md).
