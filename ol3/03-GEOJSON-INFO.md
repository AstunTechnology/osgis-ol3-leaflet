## Info for GeoJSON layer

Displaying information associated with a marker requires a popup overlay and an event handler that finds the closest marker and displays the popup showing the associated features information.

Again add the following to be bottom of `ol3.js`:

```javascript
// -- Display information on click --

// Create a popup overlay which will be used to display feature info
var popup = new ol.Popup();
map.addOverlay(popup);

// Add an event handler for the map "click" event
map.on('click', function(evt) {

    // Hide existing popup and reset it's class
    popup.hide();
    popup.container.className = 'ol-popup';

    // Attempt to find a feature in one of the visible vector layers
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

    }

});

/**
 * Utility function that accepts a template string of the form
 * 'Hello {a}, {b}' and a data object like {a: 'foo', b: 'bar'},
 * returns evaluated string ('Hello foo, bar').
 */
function template(str, data) {
    return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
        return data[key];
    });
}
```

### Notes

#### Popup

OpenLayers 3 doesn't currently provide a popup so we are using one based on an example provided by Tim Schaub one of the OL3 core team. The popup is simply a positioned HTML element which is added to the map as an overlay which is fixed to a geographic coordinate.

