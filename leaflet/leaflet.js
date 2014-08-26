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
