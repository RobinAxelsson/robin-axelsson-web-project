const startPage = select("#startPage");
const loginPage = select("#loginPage");
const authorPage = select("#authorPage");
const locationPage = select("#locationPage");

const startBtn = select("#startBtn");
const loginBtn = select("#loginBtn");
const authorBtn = select("#authorBtn");
const locationBtn = select("#locationBtn");
const logoutBtn = select("#logoutBtn");
const dynamicParagraph = select("#dynamic-paragraph");

startPage.style.display = 'flex';

bindBtnPage(loginBtn, loginPage);
bindBtnPage(startBtn, startPage);
bindBtnPage(authorBtn, authorPage);
bindBtnPage(locationBtn, locationPage);

bindBtnFunc(loginBtn, signInAttempt);
bindBtnFunc(locationBtn, refreshMap);
bindBtnFunc(logoutBtn, signOut);

function loginMode(){
    loginBtn.style.display = "none";
    locationBtn.style.display = "flex";
    logoutBtn.style.display = "flex";
    dynamicParagraph.innerHTML = `<a id="location-link">Go to location to find the home of your IP!</a>`;
    let textBtn = select("#location-link");
    bindBtnPage(textBtn, locationPage);
    bindBtnFunc(textBtn, refreshMap);
    select("#noLoginBtn").style.display = "none";
}

function defaultMode(){
    loginBtn.style.display = "flex";
    locationBtn.style.display = "none";
    logoutBtn.style.display = "none";
    dynamicParagraph.innerHTML = `<a id="login-link">Login to find the home of your IP!</a>`
    var textBtn = select("#login-link");
    bindBtnPage(textBtn, loginPage);
    bindBtnFunc(textBtn, signInAttempt);
    select("#noLoginBtn").style.display = "flex";
}