const startPage = select("#startPage");
const loginPage = select("#loginPage");
const authorPage = select("#authorPage");
const locationPage = select("#locationPage");

const startBtn = select("#startBtn");
const loginBtn = select("#loginBtn");
const authorBtn = select("#authorBtn");
const locationBtn = select("#locationBtn");
const logoutBtn = select("#logoutBtn");

startPage.style.display = 'flex';

bindBtnPage(startBtn, startPage);
bindBtnPage(loginBtn, loginPage);
bindBtnPage(authorBtn, authorPage);
bindBtnPage(locationBtn, locationPage);

bindBtnFunc(loginBtn, signInAttempt);
bindBtnFunc(locationBtn, refreshMap);
bindBtnFunc(logoutBtn, signOut);

function loginMode(){
    loginBtn.style.display = "none";
    locationBtn.style.display = "flex";
    logoutBtn.style.display = "flex";
}

function defaultMode(){
    loginBtn.style.display = "flex";
    locationBtn.style.display = "none";
    logoutBtn.style.display = "none";
}