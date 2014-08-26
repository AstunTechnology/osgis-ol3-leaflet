## OS-GB Map with Ordnance Survey tiles

Displaying a map in British National Grid (`EPSG:27700`) with Leaflet requires the [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin which adds [Proj4js](http://proj4js.org/).

> Leaflet comes with built in support for tiles in Spherical Mercator. If you need support for tile layers in other projections, the Proj4Leaflet plugin lets you use tiles in any projection supported by Proj4js, which means support for just about any projection commonly used. - [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet)

Unlike OpenLayers coordinates are still expressed in WGS84 as you can see in the call to `map.setView`.

Replace the contents of `leaflet.js` with the following and read through the comments for explanation:

```javascript
// Define a Proj4Leaflet crs instance configured for British National Grid
// (EPSG:27700) and the resolutions of our base map
var crs = new L.Proj.CRS(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
    {
        resolutions: [1600,800,400,200,100,50,25,10,5,2.5,1,0.5,0.25,0.125,0.0625]
    }
);

// Define a standard Leaflet map specifying our crs instance and define a WMS
// base map
var map = new L.Map('map', {
    crs: crs,
    continuousWorld: true,
    worldCopyJump: false,
    layers: [
        L.tileLayer.wms('http://t0.ads.astuntechnology.com/open/osopen/service', {
            layers: 'osopen',
            format: 'image/png',
            maxZoom: 14,
            minZoom: 0,
            continuousWorld: true,
            attribution: 'Astun Data Service &copy; Ordnance Survey.'
        })]
});

map.setView([52.5, -1.8], 0);
```
