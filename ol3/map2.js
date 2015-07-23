// Extent of the map in units of the projection (these match our base map)
var extent = [-3276800, -3276800, 3276800, 3276800];

// Fixed resolutions to display the map at (pixels per ground unit (meters when
// the projection is British National Grid))
var resolutions = [1600,800,400,200,100,50,25,10,5,2.5,1,0.5,0.25,0.125,0.0625];

// Define WGS84 projection (copied from http://epsg.io/3857.js)
proj4.defs("EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");

// Define an OL3 projection based on the included Proj4js projection
// definition and set it's extent.
var bng = ol.proj.get('EPSG:3857');
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
                url: 'http://141.64.68.176/geoserver/wms?',
                attributions: [
                    new ol.Attribution({html: 'Test'})
                ],
                params: {
                    'LAYERS': 'Sicherheit',
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
        center: [1450000, 6809000],
        zoom: 4
    })
});

// Create a LayerSwitcher instance and add it to the map
var layerSwitcher = new ol.control.LayerSwitcher();
map.addControl(layerSwitcher);

// -- Load GB districts as a WMS layer --

var districtLayer = new ol.layer.Tile({
    title: 'Sicherheit',
    source: new ol.source.TileWMS({
        url: 'http://141.64.68.176/geoserver/wms?',
        params: {
            'LAYERS': 'jueterbog:Sicherheit',
            'VERSION': '1.1.1',
            'FORMAT': 'image/png',
            'TILED': true
        },
        tileGrid: tileGrid
    })
});
map.addLayer(districtLayer);

// -- Display information on singleclick --

// Create a popup overlay which will be used to display feature info
var popup = new ol.Overlay.Popup();
map.addOverlay(popup);

// Add an event handler for the map "singleclick" event
map.on('singleclick', function(evt) {

    // Hide existing popup and reset it's offset
    popup.hide();
    popup.setOffset([0, 0]);

    if (districtLayer.getVisible()) {

        var url = districtLayer
                    .getSource()
                    .getGetFeatureInfoUrl(
                        evt.coordinate,
                        map.getView().getResolution(),
                        map.getView().getProjection(),
                        {
                            'INFO_FORMAT': 'text/javascript'
                        }
                    );

        reqwest({
            url: url,
            type: 'json',
        }).then(function (data) {
            var feature = data.features[0];
            var props = feature.properties;
            var info = "<h2>" + props.nutzung + "</h2>";
            popup.show(evt.coordinate, info);
        });

    }

});
