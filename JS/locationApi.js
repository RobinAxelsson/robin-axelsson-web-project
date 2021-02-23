//This code both creates the map widget and gets the coordinates of the IP-adress from https://ipwhois.io/.
//Only code related to Location Page
//general functions located in utility.

const map = L.map('mapid', { //removes excess function from the map
    zoomControl: false,
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    boxZoom: false,
    keyboard: false
});

map.setView([0, 0], 2); //0,0 longitude, latitude view with zoom value of 2

const long = select("#long");
const lat = select("#lat");
const ipAddress = select("#ip");
const mapDiv = select("#mapid");

const coordArrays = [];

let tiles = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

tiles.addTo(map); //Tiles are the actual map images that is rendered in the map-window.

function refreshMap() {
    map.invalidateSize();
}   //This wrapper is needed to use bindBtnFunc(btn, func);



//Following function is bound inline to #apiBtn in the location page, it updates both map and location data elements.
async function callApi() {
    const response = await fetch("https://ipwhois.app/json/");
    const jObj = await response.json();
    let latlong = [jObj.latitude, jObj.longitude];
    
    long.innerHTML = "Longitude: " + roundDec(jObj.longitude);
    lat.innerHTML = "Latitude: " + roundDec(jObj.latitude);
    ipAddress.innerHTML = "IP-adress: " + jObj.ip;
    
    map.setView(latlong, 12);
    L.marker(latlong).addTo(map);

    select("#apiBtn").style.display = "none";
}