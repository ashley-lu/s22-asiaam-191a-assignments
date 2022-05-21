// declare variables
let mapOptions = { 'center': [34.0709, -118.444], 'zoom': 5 }

let englishFirst = L.featureGroup();
let nonEnglishFirst = L.featureGroup();

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(data) {
    //console.log(message)
    if (data["Is your English your first language?"] == "Yes") {
        englishFirst.addLayer(L.circleMarker([data.lat, data.lng]).bindPopup(`<h2>${data['Location']}</h2> <h3>English first language </h3>`))
        createButtons(data.lat, data.lng, data.Location)
        circleOptions.fillColor = "red"
    }
    else {
        nonEnglishFirst.addLayer(L.circleMarker([data.lat, data.lng]).bindPopup(`<h2>${data['Location']}</h2> <h3>Non-English first language </h2>`))
        createButtons(data.lat, data.lng, data.Location)
        nonEnglishSpeaker += 1;
        circleOptions.fillColor = "blue"
    }
    return data
}

function createButtons(lat, lng, title) {
    const newButton = document.createElement("button");
    newButton.id = "button" + title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat", lat);
    newButton.setAttribute("lng", lng);
    newButton.addEventListener('click', function () {
        map.flyTo([lat, lng]);
    })
    const placeForButtons = document.getElementById("placeForButtons")
    placeForButtons.appendChild(newButton);
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2WyfKTyZJ-_ja3GGrxoAXwranavyDGXYsxeFUO4nvHpCJrkKhChymXQqUEyhdGLnz9VN6BJv5tOjp/pub?gid=1560504149&single=true&output=csv"

function loadData(url) {
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

let nonEnglishSpeaker = 0;
function processData(results) {
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    document.body.append("Number of hidden records:" + nonEnglishSpeaker)
    englishFirst.addTo(map)
    nonEnglishFirst.addTo(map)
    let allLayers = L.featureGroup([englishFirst, nonEnglishFirst]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)