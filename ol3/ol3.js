// Extent of the map in units of the projection
var extent = [-3276800, -3276800, 3276800, 3276800];

// Fixed resolutions to display the map at
var resolutions = [1600,800,400,200,100,50,25,10,5,2.5,1,0.5,0.25,0.125,0.0625];

// Define British National Grid Proj4js projection (copied from http://epsg.io/27700.js)
proj4.defs("EPSG:27700","+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");

// Define a projection based on the included Proj4js projection definition.
// Include the extent here and specify the resolutions as a property of the
// View to specify the zoom levels that are available to the user.
var bng = ol.proj.get('EPSG:27700');
bng.setExtent(extent);

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://t0.ads.astuntechnology.com/astuntechnology/osopen/service?',
                attributions: [
                    new ol.Attribution({html: 'Astun Data Service &copy; Ordnance Survey.'})
                ],
                params: {
                    'LAYERS': 'osopen',
                    'FORMAT': 'image/png',
                    'TILED': true
                },
                // Define a TileGrid to ensure that WMS requests are made for
                // tiles at the correct resolutions and tile boundaries
                tileGrid: new ol.tilegrid.TileGrid({
                    origin: extent.slice(0, 2),
                    resolutions: resolutions
                })
            })
        })
    ],
    view: new ol.View({
        projection: bng,
        resolutions: resolutions,
        center: [413674, 289141],
        zoom: 0
    })
});

// -- Load GB disticts as a WMS layer --

var districtLayer = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'http://ec2-54-216-41-47.eu-west-1.compute.amazonaws.com/geoserver/osgb/wms?',
        params: {
            'LAYERS': 'osgb:district_borough_unitary_region'
        },
        extent: extent
    })
});
map.addLayer(districtLayer);

// -- Load planning applications as GeoJSON and zoom to their extent once loaded --

var planningAppsSource = new ol.source.GeoJSON({
    'projection': map.getView().getProjection(),
    'url': 'http://hub-dev.astun.co.uk/developmentcontrol/0.1/applications/search?status=live&gss_code=E07000214&status=live'
});

planningAppsSource.on('change', function (evt) {
    var src = evt.target;
    if (src.getState() === 'ready') {
        map.getView().fitExtent(src.getExtent(), map.getSize());
    }
});

var planningAppsLayer = new ol.layer.Vector({
    source: planningAppsSource,
    style: new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 40],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'marker-icon.png'
        }))
    })
});
map.addLayer(planningAppsLayer);

// -- Display information on click --

// Create a popup overlay which will be used to display feature info
var popup = new ol.Popup();
map.addOverlay(popup);

map.on('click', function(evt) {
    popup.container.className = 'ol-popup';
    // Attempt to find a marker from the appsLayer
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return feature;
    });
    if (feature) {
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        popup.container.className = 'ol-popup marker';
        popup.show(coord, "<h2><a href='" + feature.get('caseurl') + "'>" + feature.get('casereference') + "</a></h2><p>" + feature.get('locationtext') + "</p><p>Status: " + feature.get('status') + "</p>");
    } else {
        // popup.hide();
        var url = districtLayer.getSource().getGetFeatureInfoUrl(evt.coordinate, map.getView().getResolution(), map.getView().getProjection(), {'INFO_FORMAT': 'text/javascript', 'format_options': 'callback:results', propertyName: 'NAME,AREA_CODE,DESCRIPTIO'});
        reqwest({
            url: url,
            type: 'jsonp',
            jsonpCallbackName: 'results'
        }).then(function (data) {
            var feature = data.features[0];
            popup.show(evt.coordinate, "<h2>" + feature.properties.NAME + "</h2><p>" + feature.properties.DESCRIPTIO + "</p>");
        });
    }
});
