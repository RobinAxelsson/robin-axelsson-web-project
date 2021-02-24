//This code both creates the map widget and gets the coordinates of the IP-adress from https://ipwhois.io/.
//Only code related to Location Page
//general functions located in utility.

const map = L.map('openStreetMap-container', { //removes excess function from the map and renders it in the 
    zoomControl: false,
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    boxZoom: false,
    keyboard: false
});

map.setView([0, 0], 2); //0,0 longitude, latitude view with zoom value of 2

const long = select("#longitude");
const lat = select("#latitude");
const ipAddress = select("#ip-address");
const mapDiv = select("#openStreetMap-container");

const coordArrays = [];

let tiles = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

tiles.addTo(map); //Tiles are the actual map images that is rendered in the map-window.

function refreshMap() {
    map.invalidateSize();
} //This wrapper is needed to use bindBtnFunc(btn, func);

function formatCoordinates(decimalMeasure) { //json coordinate input is in decimal format but gets converted to degrees-minutes-seconds
    if (isNaN(decimalMeasure)) {
        console.error('function parseDegMinSec() have NaN input');
        return null;
    } else {
        let degrees = Math.floor(decimalMeasure);
        let remainder = (decimalMeasure - degrees)*60;
        console.log(remainder);
        let minutes = Math.floor(remainder);
        let seconds = Math.round((remainder-minutes)*60*10)/10;
        return degrees + '°' + minutes + "'" + seconds + "\''";
    }
}


//Following function is bound inline to #getLocationBtn in the location page, it updates both map and location data elements.
async function getIpLocation() {
    const response = await fetch("https://ipwhois.app/json/");
    const jObj = await response.json();
    let latlong = [jObj.latitude, jObj.longitude];

    long.innerHTML = "Longitude: " + formatCoordinates(jObj.longitude);
    lat.innerHTML = "Latitude: " + formatCoordinates(jObj.latitude);
    ipAddress.innerHTML = "IP-adress: " + jObj.ip;

    map.setView(latlong, 12);
    L.marker(latlong).addTo(map);

    select("#getLocationBtn").style.display = "none";
}