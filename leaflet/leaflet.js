var crs = new L.Proj.CRS(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
    {
        resolutions: [1600,800,400,200,100,50,25,10,5,2.5,1,0.5,0.25,0.125,0.0625]
    }
);

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

reqwest({
    url: 'http://hub-dev.astun.co.uk/developmentcontrol/0.1/applications/search?status=live&gsscode=E07000214&status=live',
    type: 'json',
}).then(function (data) {
    var geojson = L.Proj.geoJson(data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(L.Util.template('<h2><a href="{caseurl}">{casereference}</a></h2><p>{locationtext}</p><p>Status: {status} {statusdesc}</p>', feature.properties));
        }
    }).addTo(map);
    // Zoom to the extent of all features
    map.fitBounds(geojson.getBounds());
});

var planningAppsLayer = L.tileLayer.wms('http://ec2-54-216-41-47.eu-west-1.compute.amazonaws.com/geoserver/osgb/wms?', {
    layers: 'osgb:district_borough_unitary_region',
    format: 'image/png',
    transparent: true,
    maxZoom: 14,
    minZoom: 0,
    continuousWorld: true
}).addTo(map);

map.on('click', function(e) {
    var url = getFeatureInfoUrl(map, planningAppsLayer, e.latlng, {'info_format': 'application/json', 'propertyName': 'NAME,AREA_CODE,DESCRIPTIO'});
    console.log(url);
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

function getFeatureInfoUrl(map, layer, latlng, params) {

    // Construct a GetFeatureInfo request URL given a point
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
    console.log(params);

    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

    return layer._url + L.Util.getParamString(params, layer._url, true);

}
