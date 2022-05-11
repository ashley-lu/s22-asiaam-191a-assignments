console.log("test");

// define map options
let mapOptions = { 'center': [40.058323, -74.405663], 'zoom': 4 }

// declare const map
const map = L.map('map').setView(mapOptions.center, mapOptions.zoom);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
}).addTo(map);

// Creating a custom icon
var magnifyingGlassIcon = L.icon({
    iconUrl: 'images/magnifying-glass.png',
    shadowUrl: 'images/magnifying-glass-shadow.png',
    iconSize: [50, 50], // width and height of the image in pixels
    shadowSize: [65, 45], // width, height of optional shadow image
    iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
});

// var breadIcon = L.icon({
//     iconUrl: 'images/bread.png',
//     iconSize: [50, 50], // width and height of the image in pixels
//     iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
// });

// Options for the marker
// var markerOptions = {
//         clickable: true,
//         icon: customIcon
//      };

// specify popup options 
/*var customOptions =
    {
    'maxWidth': '500',
    'className' : 'custom'
    }

/*add_marker(45.501690, -73.567253, "Montreal, Canada",
        "Where I was born! I was born in Montreal, Canada and lived there for around 3 months before moving to the US. I can't speak any French at all :(",
        "images/canada-flag.png")

add_marker(40.058323, -74.405663, "Summit, New Jersey",
        "Where I live! I've lived in New Jersey for most of my life in a quaint suburban neighborhood.",
        "images/nj.jpg")

add_marker(34.068920, -118.445183, "UCLA",
        'Where I go to school! I\'ve been having a lot of fun at UCLA so far :)',
        "images/ucla-logo.svg")*/

//JavaScript function to create markers
function add_marker(lat, lng, title, popup) {
    var customPopup = `<h2>${title}</h2>` + popup;
    L.marker([lat, lng], { icon: breadIcon }).addTo(map).bindPopup(customPopup);
    // L.circleMarker([lat, lng]).addTo(map)
    //     .bindPopup(customPopup)
    //createButtons(lat, lng, title)
    return customPopup;
    //.openPopup();
}

const surveyUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXs_a66SVOOHKnp12UHz0lrIdrRJGxkXbxcxQ1tYn-bdSQDcgnfq0NKHHUii82iAIlYmAxUfMNDIly/pub?output=csv"

function loadData(url) {
    console.log("Map")
    fetch(url)
        .then(response => response.json())
        .then(data => {
            createButtons(data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0], data.features[0].properties.place, "images/canada-flag.png")
            createButtons(data.features[1].geometry.coordinates[1], data.features[1].geometry.coordinates[0], data.features[1].properties.place, "images/nj.jpg")
            createButtons(data.features[2].geometry.coordinates[1], data.features[2].geometry.coordinates[0], data.features[2].properties.place, "images/ucla-logo.svg")
            L.geoJSON(data, {
                pointToLayer: (feature, latlng) => {
                    return L.marker(latlng, { icon: magnifyingGlassIcon, color: feature.properties.color })
                }
            }).bindPopup(layer => {
                return `<h2>${layer.feature.properties.place}</h2>` + layer.feature.properties.description;
            }).addTo(map);
        })
        .catch((err) => { console.log(err) })
}

function createButtons(lat, lng, title, img) {
    const newButton = document.createElement("button");
    newButton.id = "button" + title;
    newButton.innerHTML = title + `<br>` + `<img src=${img} width="50">`;
    newButton.setAttribute("lat", lat);
    newButton.setAttribute("lng", lng);
    newButton.addEventListener('click', function () {
        map.flyTo([lat, lng]);
    })
    const placeForButtons = document.getElementById("placeForButtons");
    placeForButtons.appendChild(newButton);
    // if (placeForButtons != null) {
    //     placeForButtons.appendChild(newButton);
    // }
}

// function createButtons2(lat, lng, title) {
//     const newButton = document.createElement("button");
//     newButton.id = "button" + title;
//     newButton.innerHTML = title;
//     newButton.setAttribute("lat", lat);
//     newButton.setAttribute("lng", lng);
//     newButton.addEventListener('click', function () {
//         map.flyTo([lat, lng]);
//     })
//     const placeForSurveyButtons = document.getElementById("placeForSurveyButtons");
//     placeForSurveyButtons.appendChild(newButton);
//     // if (placeForSurveyButtons != null) {
//     //     placeForSurveyButtons.appendChild(newButton);
//     // }
// }

loadData("map.geojson")
// loadData(surveyUrl)

// function processData(results) {
//     console.log(results) //for debugging: this can help us see if the results are what we want
//     results.data.forEach(data => {
//         console.log(data) // for debugging: are we seeing each data correctly?
//         add_marker(data.lat, data.lng, data['What is the name of your favorite food place?'], data['Please describe what you enjoy about your favorite food place in 1-2 sentences.'])
//         createButtons(data.lat, data.lng, data['What is the name of your favorite food place?'], "images/bread.png");
//     })
// }

// fetch("map.geojson")
//     .then(response => {
//         return response.json()
//     })
//     .then(data =>{
//         // Basic Leaflet method to add GeoJSON data
//         createButtons(data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0], data.features[0].properties.place, "images/canada-flag.png")
//         createButtons(data.features[1].geometry.coordinates[1], data.features[1].geometry.coordinates[0], data.features[1].properties.place, "images/nj.jpg")
//         createButtons(data.features[2].geometry.coordinates[1], data.features[2].geometry.coordinates[0], data.features[2].properties.place, "images/ucla-logo.svg")
//         L.geoJSON(data, {
//                 pointToLayer: (feature, latlng) => {
//                     return L.marker(latlng, {icon: MyIcon, color: feature.properties.color})
//                 }
//             }).bindPopup(layer => {
//                 return `<h2>${layer.feature.properties.place}</h2>` + layer.feature.properties.description;
//             }).addTo(map);
//     })