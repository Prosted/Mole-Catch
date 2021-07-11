const body = document.getElementsByTagName('body');
const startPage = document.querySelector(".startPage");
const userNameForm = document.querySelector(".startPage__box__userName");
const userNameInput = userNameForm.querySelector("input");
const startButton = startPage.querySelector(".load-button");
const startButtonImg = startButton.querySelector("img");
const logoutButton = document.querySelector(".startPage__box__logout");
const gamePage = document.querySelector(".gamePage");

const HIDDEN = "hidden";
const USERNAME = "userName";
const PLAYER_SCORE = "playerScore";
const BEST_SCORE = "bestScore";
let pageLoadNumber = 0;

function handleStartButton(event){
    startPage.classList.add(HIDDEN);
    gamePage.classList.remove(HIDDEN);
    localStorage.removeItem(PLAYER_SCORE);
    load(jsfiles, pageLoadNumber++);
}

function handleLogoutButton(){
    userNameForm.classList.remove(HIDDEN);
    startButton.classList.add(HIDDEN);
    logoutButton.classList.add(HIDDEN);
    localStorage.removeItem(PLAYER_SCORE);
    localStorage.removeItem(BEST_SCORE);
    userNameForm.addEventListener("submit", handleUserNameSubmit);
}

function gameStartVisible(){
    userNameForm.classList.add(HIDDEN);
    startButton.classList.remove(HIDDEN);
    logoutButton.classList.remove(HIDDEN);
    startButtonImg.addEventListener("click", handleStartButton);
    logoutButton.addEventListener("click", handleLogoutButton);
}

function askUserName(){
    userNameForm.addEventListener("submit", handleUserNameSubmit);
}

function saveUserName(userName){
    localStorage.setItem(USERNAME, userName);
}

function handleUserNameSubmit(event){
    event.preventDefault();
    const userName = userNameInput.value;
    saveUserName(userName);
    gameStartVisible();
}

function loadGameStart(){
    const userName = localStorage.getItem(USERNAME);
    if(userName!=null){
        gameStartVisible();
    }
    else{
        askUserName();
    }
}

/*loader.js*/
function load(files, i){
    var src = document.createElement('script');
    src.setAttribute('src', files[i]);
    body[0].appendChild(src);
}

var jsfiles = [
    "js/gamePage.js",
    "js/endPage.js"
];


function init(){
    loadGameStart();
}

init();