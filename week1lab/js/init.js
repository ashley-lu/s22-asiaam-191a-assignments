console.log("test");

// JavaScript const variable declaration
const map = L.map('map').setView([40.058323, -74.405663], 4);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker1 = L.marker([45.501690, -73.567253]).addTo(map)
        .bindPopup('Where I was born!')
        .openPopup();

let marker2 = L.marker([40.058323, -74.405663]).addTo(map)
        .bindPopup('Where I live!')
        .openPopup();

let marker3 = L.marker([34.068920, -118.445183]).addTo(map)
        .bindPopup('Where I go to school!')
        .openPopup();
        