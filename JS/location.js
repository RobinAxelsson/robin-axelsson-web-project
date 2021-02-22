const map = L.map('mapid', {
    zoomControl: false,
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    boxZoom: false,
    keyboard: false
});
map.setView([0, 0], 2);

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

tiles.addTo(map);

function refreshMap() {
    map.invalidateSize(); 
} //for easier binding

//Connected to <button>Location</button>
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