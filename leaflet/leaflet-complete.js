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

// -- GeoJSON layer --

// Make a request for GeoJSON features, and add them to a layer using the
// default marker style and zoom to their extent
reqwest({
    url: 'http://digitalservices.surreyi.gov.uk/developmentcontrol/0.1/applications/search?status=live&gsscode=E07000214&status=live',
    type: 'json',
}).then(function (data) {
    var planningAppsLayer = L.geoJson(data, {
        // Define a function that will be called once for each feature that is
        // added to the GeoJSON layer. Here we define a popup for each feature
        onEachFeature: function (feature, marker) {
            var tmplt = '<h2><a href="{caseurl}">{casereference}</a></h2>';
                tmplt += '<p>{locationtext}</p><p>Status: {status} {statusdesc}</p>';
            marker.bindPopup(L.Util.template(tmplt, feature.properties));
        }
    }).addTo(map);
    // Zoom to the extent of all features
    map.fitBounds(planningAppsLayer.getBounds());
});

// -- Load GB disticts as a WMS layer --

var districtLayer = L.tileLayer.wms('http://osgis.astun.co.uk/geoserver/gwc/service/wms?', {
    layers: 'osgb:district_borough_unitary_region',
    tiled: true,
    format: 'image/png',
    transparent: true,
    maxZoom: 14,
    minZoom: 0,
    continuousWorld: true
}).addTo(map);

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
