## Info for GeoJSON layer

The simplest way to display a popup with information for each marker is to use the Marker's [`bindPopup`](http://leafletjs.com/reference.html#marker-bindpopup) method. The GeoJSON layer provides an [`onEachFeature`](http://leafletjs.com/reference.html#geojson-oneachfeature) option which will be called once per feature before it's added to the layer which we can use to call `bindPopup`.

**Replace the placeholder** `// -- Layer options here --` with the following in `leaflet.js`:

```javascript
        // Define a function that will be called once for each feature that is
        // added to the GeoJSON layer. Here we define a popup for each feature
        onEachFeature: function (feature, marker) {
            var tmplt = '<h2><a href="{caseurl}">{casereference}</a></h2>';
                tmplt += '<p>{locationtext}</p><p>Status: {status} {statusdesc}</p>';
            marker.bindPopup(L.Util.template(tmplt, feature.properties));
        }
```
