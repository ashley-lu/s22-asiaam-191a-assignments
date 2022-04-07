console.log('Hello Asian Am 191! :)');

// JavaScript const variable declaration
const map = L.map('map').setView([39.8283, 98.5795], 5);

// Leaflet tile layer, i.e. the base map
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.0709, -118.444]).addTo(map)
        .bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
        .openPopup();

// let marker2 = L.marker([40.717979, -74.358749]).addTo(map)
//         .bindPopup('Where I\'m from!')
//         .openPopup();

function my_first_function() {
        console.log("hi from function")
}

my_first_function()

function add_marker(lat, lng, popup) {
        L.marker([lat, lng]).addTo(map)
        .bindPopup(popup)
        //.openPopup();
}

add_marker(40.717979, -74.358749, "Where I'm from!")