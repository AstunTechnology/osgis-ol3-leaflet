// Extent of the map in units of the projection (these match our base map)
var extent = [-3276800, -3276800, 3276800, 3276800];

// Fixed resolutions to display the map at (pixels per ground unit (meters when
// the projection is British National Grid))
var resolutions = [1600,800,400,200,100,50,25,10,5,2.5,1,0.5,0.25,0.125,0.0625];

// Define British National Grid Proj4js projection (copied from http://epsg.io/27700.js)
proj4.defs("EPSG:27700","+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");

// Define an OL3 projection based on the included Proj4js projection
// definition and set it's extent.
var bng = ol.proj.get('EPSG:27700');
bng.setExtent(extent);

// Define a TileGrid to ensure that WMS requests are made for
// tiles at the correct resolutions and tile boundaries
var tileGrid = new ol.tilegrid.TileGrid({
    origin: extent.slice(0, 2),
    resolutions: resolutions
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://t0.ads.astuntechnology.com/open/osopen/service?',
                attributions: [
                    new ol.Attribution({html: 'Astun Data Service &copy; Ordnance Survey.'})
                ],
                params: {
                    'LAYERS': 'osopen',
                    'FORMAT': 'image/png',
                    'TILED': true
                },
                tileGrid: tileGrid
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

// Create a LayerSwitcher instance and add it to the map
var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);

// -- Load GB disticts as a WMS layer --

var districtLayer = new ol.layer.Tile({
    title: 'Local Authorities',
    source: new ol.source.TileWMS({
        url: 'http://osgis.astun.co.uk/geoserver/gwc/service/wms?',
        params: {
            'LAYERS': 'osgb:district_borough_unitary_region',
            'VERSION': '1.1.1',
            'FORMAT': 'image/png',
            'TILED': true
        },
        tileGrid: tileGrid
    })
});
map.addLayer(districtLayer);

// -- GeoJSON layer --

// Define a GeoJSON source that will load features via a http call. By
// specifying the projection of the map's view OL3 will transform the coordinates
// for display
var planningAppsSource = new ol.source.GeoJSON({
    'projection': map.getView().getProjection(),
    'url': 'http://digitalservices.surreyi.gov.uk/developmentcontrol/0.1/applications/search?status=live&gsscode=E07000214&status=live'
});

// Create a vector layer to display the features within the GeoJSON source and
// applies a simple icon style to all features
var planningAppsLayer = new ol.layer.Vector({
    title: 'Planning Applications',
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

// Add the layer to the map
map.addLayer(planningAppsLayer);

// Once the change event of the source occurs and the source is 'ready' zoom to
// the extent of the features
planningAppsSource.on('change', function (evt) {
    var src = evt.target;
    if (src.getState() === 'ready') {
        map.getView().fitExtent(src.getExtent(), map.getSize());
    }
});

// -- Display information on singleclick --

// Create a popup overlay which will be used to display feature info
var popup = new ol.Overlay.Popup();
map.addOverlay(popup);

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

        if (districtLayer.getVisible()) {

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

    }

});
