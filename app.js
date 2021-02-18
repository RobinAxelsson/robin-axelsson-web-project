// let startPage = document.querySelector("#startPage");
const startPage = document.querySelector("#loginPage");
startPage.style.display = 'flex';
const menuButtons = document.querySelectorAll(".menuBtn");

menuButtons.forEach(element => {
    element.addEventListener('click', event => {
        event.preventDefault;
        let page = document.getElementById(event.target.id.slice(0, -3));
        if (page != null) {
            menuButtons.forEach(element => {
                let page = document.getElementById(element.id.slice(0, -3));
                if (page != null) {
                    page.style.display = 'none';
                }
            });
            page.style.display = 'flex';
            if(page.id == 'loginPage'){
                map.invalidateSize();
            }
        }
    });
});

const long = document.querySelector("#long");
const lat = document.querySelector("#lat");
const ipAddress = document.querySelector("#ip");
const mapDiv = document.querySelector("#mapid");
const coordArrays = [];
let map = L.map('mapid', { 
    zoomControl: false,
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    boxZoom: false,
    keyboard: false
});
map.setView([0, 0], 2);
let tiles = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    tiles.addTo(map);
    
async function callApi() {
    console.log("api");
    const response = await fetch("https://ipwhois.app/json/");
    const jObj = await response.json();
    console.log(jObj);
    let latlong = [jObj.latitude, jObj.longitude];
    long.innerHTML = "Longitude: " + roundDec(jObj.longitude);
    lat.innerHTML = "Latitude: " + roundDec(jObj.latitude);
    ipAddress.innerHTML = "IP-adress: " + jObj.ip;
    map.setView(latlong, 12);
    L.marker(latlong).addTo(map);
    console.log(latlong);
}

function roundDec(float) {
    return Math.round(float * 100) / 100;
}