# Basic map with OSM tiles

Edit `leaflet.js` so it looks as follows:

```javascript
var map = new L.Map('map', {
    layers: [
        new L.TileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            }
        )
    ]
});

map.setView([52.5, -1.8], 6);
```

### Notes

#### L.TileLayer

Leaflet doesn't provide pre-built layer types for common base map providers like OpenLayers but Leaflet's creator Vladimir Agafonkin provides various examples here: [https://gist.github.com/mourner/1804938](https://gist.github.com/mourner/1804938)

Details on the URL template from the Leaflet API docs:

> {s} means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; a, b or c by default, can be omitted), {z} — zoom level, {x} and {y} — tile coordinates.
