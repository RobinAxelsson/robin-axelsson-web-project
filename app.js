let startPage = document.querySelector("#startPage");
// const startPage = document.querySelector("#locationPage");
startPage.style.display = 'flex';
// const loginPage = document.querySelector("#loginPage");
// loginPage.style.display = 'flex';
const menuButtons = document.querySelectorAll(".menuBtn");
document.querySelector("#logoutPageBtn").style.display = 'none';
document.querySelector("#locationPageBtn").style.display = 'none';

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
            if (page.id == 'locationPage') {
                map.invalidateSize();
            }
            if (page.id == 'loginPage') {
                SignInAttempt();
            }
            if(page.id == 'logoutPage'){
                console.log('hello logout');
            }
        }
    });
});


/*―――――――――――――――――――――*/
/* API-page map and coordinates */
/*―――――――――――――――――――――*/
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

/*―――――――――――――――――――――――――――*/
/* Login page and utilities */
/*―――――――――――――――――――――――――――*/
let oktaSignIn = null;
const logoutBtn = document.querySelector('#logoutPageBtn');
logoutBtn.addEventListener('click', event =>{
    event.preventDefault;
    console.log('hello logout');
    signOut();
});
//Create session
oktaSignIn = new OktaSignIn({
    baseUrl: 'https://dev-34426554.okta.com/', //Org URL
    clientId: '0oa7d2j7dMdzbChTQ5d6', //maybe callback
    // redirectUri: 'http://localhost:8080/',
    redirectUri: 'http://127.0.0.1:8080',
    // redirectUri: 'http://127.0.0.1:8080/portrait-author-small.png',
    authParams: {
        // pkce: false,
        issuer: 'https://dev-34426554.okta.com/oauth2/default',
        responseType: ['token', 'id_token'],
        display: 'page'
    }
});
// oktaSignIn.renderEl({
//         el: '#okta-login-container'
//     },
//     function success(res) {
//         console.log(res);
//     },
//     function error(err) {
//         console.error(err);
//     }
// );

oktaSignIn.session.get(function (res) {
    // If we get here, the user is already signed in.
    if (res.status === 'ACTIVE') {
        loginAddress.innerHTML = res.login;
        document.querySelector("#loginPageBtn").style.display = 'none';
        document.querySelector("#logoutPageBtn").style.display = 'flex';
        document.querySelector('#locationPageBtn').style.display = 'flex';
    }
});

function SignInAttempt() {
    if (oktaSignIn.token.hasTokensInUrl()) {
        oktaSignIn.token.parseTokensFromUrl(
            // If we get here, the user just logged in.
            function success(res) {
                var accessToken = res[0];
                var idToken = res[1];
                oktaSignIn.tokenManager.add('accessToken', accessToken);
                oktaSignIn.tokenManager.add('idToken', idToken);
                window.location.hash = '';
                refreshLoginStatus();
                startPage.style.display = 'flex';
                // document.getElementById("messageBox").innerHTML = "Hello, " + idToken.claims.email +
                //     "! You just logged in! :)";
            },
            function error(err) {
                console.error(err);
            }
        );
    } else {
        oktaSignIn.session.get(function (res) {
            // If we get here, the user is already signed in.
            if (res.status === 'ACTIVE') {
                loginAddress.innerHTML = res.login;
                document.querySelector("#loginPageBtn").style.display = 'none';
                document.querySelector("#logoutPageBtn").style.display = 'flex';
                document.querySelector('#locationPageBtn').style.display = 'flex';
            }
            oktaSignIn.renderEl({
                    el: '#okta-login-container'
                },
                function success(res) {
                    console.log(res);
                },
                function error(err) {
                    console.error(err);
                }
            );
        });
    }
}
// signIn.showSignInToGetTokens({
//     // Assumes there is an empty element on the page with an id of 'okta-login-container'
//     el: '#okta-login-container'
//   }).then(function(tokens) {
//     // Store tokens
//   }).catch(function(error) {
//     // Handle error
//   });


// function getLoginStatus() {
//     oktaSignIn.session.get(function (res) {
//         console.log(res);
//     });
// }

//refreshLoginAddress();

function refreshLoginStatus() {
    const loginAddress = document.querySelector("#loginAddress");
    console.log(oktaSignIn);
    if (oktaSignIn === null) {
        SignInAttempt();
    } else {
        oktaSignIn.session.get(function (res) {
            if (res.status === 'ACTIVE') {
                loginAddress.innerHTML = res.login;
                document.querySelector("#loginPageBtn").style.display = 'none';
                document.querySelector("#logoutPageBtn").style.display = 'flex';
                document.querySelector("#locationPageBtn").style.display = 'flex';
                console.log(res);
            } else {
                loginAddress.innerHTML = '';
                document.querySelector("#loginPageBtn").style.display = 'flex';
                document.querySelector("#logoutPageBtn").style.display = 'none';
                document.querySelector("#locationPageBtn").style.display = 'none';
                console.log(res);
            }
        });
    }
}

function signOut() {
    console.log('log out?');
    oktaSignIn.signOut();
    // await refreshLoginStatus();
    oktaSignIn.session.close();
    console.log(oktaSignIn);
}