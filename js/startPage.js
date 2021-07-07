const startPage = document.querySelector(".startPage");
const userNameForm = document.querySelector(".startPage__box__userName");
const userNameInput = userNameForm.querySelector("input");
const startButton = startPage.querySelector(".load-button");
const gamePage = document.querySelector(".gamePage");

const HIDDEN = "hidden";
const USERNAME = "userName";


function handleStartButton(event){
    startPage.classList.add(HIDDEN);
    gamePage.classList.remove(HIDDEN);
    load(jsfiles);

}

function gameStartVisible(){
    userNameForm.classList.add(HIDDEN);
    startButton.classList.remove(HIDDEN);
    startButton.addEventListener("click", handleStartButton);
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
        // console.log("userName is here");
    }
    else{
        askUserName();
        // console.log("userName is not defined");
    }
}

/*loader.js*/
function load(files){
    for (i=0; i< jsfiles.length; i++){
        var src = document.createElement('script');
        // src.setAttribute('type','text/javascript');
        src.setAttribute('src', files[i]);
        document.getElementsByTagName('body')[0].appendChild(src);
    }
    //console.log(document.getElementsByTagName('body')[0])
}

var jsfiles = [
    "js/gamePage.js"
];


function init(){
    loadGameStart();
}

init();