const startPage = document.querySelector(".startPage");
const userNameForm = document.querySelector(".startPage__box__userName");
const userNameInput = userNameForm.querySelector("input");
const startButton = startPage.querySelector(".load-button");


const HIDDEN = "hidden";
const USERNAME = "userName";


function gameStartVisible(){
    userNameForm.classList.add(HIDDEN);
    startButton.classList.remove(HIDDEN);
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


function init(){
    loadGameStart();
}

init();