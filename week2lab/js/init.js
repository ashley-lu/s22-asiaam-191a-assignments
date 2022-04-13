console.log("test");

// JavaScript const variable declaration
const map = L.map('map').setView([40.058323, -74.405663], 4);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Icon options
var iconOptions = {
        iconUrl: 'images/magnifying-glass.png',
        iconSize: [45, 45]
     }
     
// Creating a custom icon
var customIcon = L.icon(iconOptions);

// Options for the marker
var markerOptions = {
        clickable: true,
        icon: customIcon
     }

// create popup contents
// var customPopup = "Mozilla Toronto Offices<br/><img src='http://joshuafrazier.info/images/maptime.gif' alt='maptime logo gif' width='350px'/>";
    
// specify popup options 
var customOptions =
    {
    'maxWidth': '500',
    'className' : 'custom'
    }

//JavaScript function to create markers
function add_marker(lat, lng, popup, img) {
        var customPopup = popup + "<br/><img src='" + img + "'class = 'popupImage center'/>";
        L.marker([lat, lng], markerOptions).addTo(map)
        .bindPopup(customPopup)
        //.openPopup();
}

add_marker(45.501690, -73.567253, 
        "Where I was born! I was born in Montreal, Canada and lived there for around 3 months before moving to the US. I can't speak any French at all :(",
        "images/canada-flag.png")

add_marker(40.058323, -74.405663, 
        "Where I live! I've lived in New Jersey for most of my life in a quaint suburban neighborhood.",
        "images/nj.jpg")

add_marker(34.068920, -118.445183, 
        'Where I go to school! I\'ve been having a lot of fun at UCLA so far :)',
        "images/ucla-logo.svg")
        