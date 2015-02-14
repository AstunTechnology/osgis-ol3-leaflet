## Info for GeoJSON layer

Displaying information associated with a marker requires a popup overlay and an event handler that finds the closest marker and displays the popup showing the associated features information.

Again add the following **to the bottom** of `ol3.js`:

```javascript
// -- Display information on singleclick --

// Create a popup overlay which will be used to display feature info
var popup = new ol.Overlay.Popup();
map.addOverlay(popup);

// Add an event handler for the map "singleclick" event
map.on('singleclick', function(evt) {

    // Hide existing popup and reset it's offset
    popup.hide();
    popup.setOffset([0, 0]);

    // Attempt to find a feature in one of the visible vector layers
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

    }

});
```

### Notes

#### Popup

OpenLayers 3 doesn't currently provide a popup so we are using one based on an example provided by Tim Schaub one of the OL3 core team. The popup is simply a positioned HTML element which is added to the map as an overlay which is fixed to a geographic coordinate.

#### Cross-domain requests

The GeoJSON features are requested from a server on a different domain to the one that our OL3 map is served from. Normally these requests would fail due to your browser respecting the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) which by default prevents a page served from one domain loading textual content such as GeoJSON from another domain.

Both the GeoJSON and WMS services used for this workshop allow cross-domain requests as they support [CORS](http://www.w3.org/wiki/CORS_Enabled#What_is_CORS_about.3F) which is the modern way of permitting such requests. CORS is supported by [all modern browsers](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing#Browser_support). The alternative would be to use [JSONP](https://en.wikipedia.org/wiki/JSONP) which has wide browser support but requires requests be JSONP requests which specify a callback parameter.
