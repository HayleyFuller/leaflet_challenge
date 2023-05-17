//Part A - create the map
//Part B - add the tile layer
//Part C - add the url as a query
//Part D - fetch the data with JSON library D3
//Part E - create circle markers to signify the eartquakes on the map. Include fill color, fill opacity, and marker color
//Part F - add the data to the map and the bind pop up
//Part G - add a legend and add it to the map. Note: style of the legend in CSS

//Part A
// create the map
let earthMap = L.map("map", {
    center: [36.00, -110.71],
    zoom: 5
});

//Part B
// add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(earthMap);

//Part C
// store the API endpoint as a query Url. There are several links (for data of the past 7 days)listed.
//Any can be used by removing the /// at the begining of the line.

// All earthquakes
let urlQuery = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Link for M1.0+ Earthquakes
//let urlQuery = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"

// Link for M2.5+ Earthquakes
/// let urlQuery = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonn"

//Link for M4.5+ Earthquakes
/// let urlQuery = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"

//Link for significate Earthquakes
/// urlQuery = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

//Part D
// fetch the data with D3.
d3.json(urlQuery).then(function(data) {
//Part E
    // create the markers
    function createMarker(feature, y) {
        return L.circleMarker(y, {
            opacity: 2,
            fillOpacity: 1,
            fillColor: markerColor(feature.geometry.coordinates[2]),
            radius: feature.properties.mag * 5,
            color: "white",
            weight: 0.5
        });
    }

    // assign the markers a color
    function markerColor(y) {
        return y > 90 ? '#d73027' :
            y > 70 ? '#fc8d59' :
            y > 50 ? '#fee08b' :
            y > 30 ? '#d9ef8b' :
            y > 10 ? '#91cf60' :
                     '#1a9850' ;   
    };
//Part F
    //add the data to the map
    L.geoJson(data, {
        pointToLayer: createMarker,
        // add the bind pop up
       onEachFeature: function (feature, layer) {
           layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + "<br>Depth: " + feature.geometry.coordinates[2]);
        }
    }).addTo(earthMap);

    //Part G
    //add a legend
    let legend = L.control({position: 'bottomleft'});

    legend.onAdd = function () {
        let div = L.DomUtil.create('div', 'info legend'),
            y = [-10, 10, 30, 50, 70, 90];

        for (let i = 0; i < y.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markerColor(y[i] + 1) + '"></i> ' +
                y[i] + (y[i + 1] ? '&ndash;' + y[i + 1] + '<br>' : '+');
        }    
        return div;
    };

    // add the legend to the map
    legend.addTo(earthMap);
});
//Note: This challenge was researched for inspiration from Google, GitHub and slack