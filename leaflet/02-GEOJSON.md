## GeoJSON layer with markers

Loading GeoJSON features returned from an API call with Leaflet is very simple as Leaflet defines a [GeoJSON layer](http://leafletjs.com/reference.html#geojson) which handles reading and displaying the features. Unlike OpenLayers Leaflet leaves loading the GeoJSON up to you so here we are using the `reqwest` library.

Add the following to be bottom of `leaflet.js`:

```javascript
// -- GeoJSON layer --

// Make a request for GeoJSON features, and add them to a layer using the
// default marker style and zoom to their extent
reqwest({
    url: 'http://digitalservices.surreyi.gov.uk/developmentcontrol/0.1/applications/search?status=live&gsscode=E07000214&status=live',
    type: 'json',
}).then(function (data) {
    var planningAppsLayer = L.geoJson(data, {
        // -- Layer options here --
    }).addTo(map);
    // Zoom to the extent of all features
    map.fitBounds(planningAppsLayer.getBounds());
});
```
