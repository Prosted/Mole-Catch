//page
const gamePageBox = document.querySelector(".gamePage");
const endPage = document.querySelector(".endPage");
//item status
const itemStatus = document.querySelector(".itemStatus");
const doubleScoreText = itemStatus.querySelector(".itemStatus__double-score");
const bonusTimeText = itemStatus.querySelector(".itemStatus__bonus-time");
const bonusLifeText = itemStatus.querySelector(".itemStatus__bonus-life");
//score-board
const scoreBoard = gamePageBox.querySelector(".score-board");
const maxScore = scoreBoard.querySelector(".score-board__max");
const currentScore = scoreBoard.querySelector(".score-board__current");
const maxScoreText = maxScore.querySelector(".score-board__max__text"); 
const currentScoreText = currentScore.querySelector(".score-board__current__text"); 

//game info
const gameInfo = document.querySelector(".game-info");
const life = gameInfo.querySelector(".game-info__life");
const time = gameInfo.querySelector(".game-info__time");
const lifeText = life.querySelector(".game-info__life__text");
const timeText = time.querySelector(".game-info__time__text");

//game table
const table = gamePageBox.querySelector(".game-table");
const areas = table.querySelectorAll(".game-table__spawnPoint"); 

//monster score
const monsterScore = document.querySelector(".monster-score");
const monsterLowText = monsterScore.querySelector(".monster-score__low__text");
const monsterMiddleText = monsterScore.querySelector(".monster-score__middle__text");
const monsterHighText = monsterScore.querySelector(".monster-score__high__text");

const MAX_TIME = 1972;
const HOW_MANY_MONSTERS = 6;
const SPAWN_PERCENTAGE = 100;
const HOW_MANY_AREAS = 9;
const DOUBLE_SCORE_TIME = 30000; //millisecond
const BONUS_TIME = 10;


let HOW_MANY_LIFES="3";
let playerScore = 0;
let clickedLow = 0;
let clickedMiddle = 0;
let clickedHigh = 0;
let areAreasFull=false;
let gameOverTrigger=false;
let doubleScoreTrigger=false;
let currentTime = MAX_TIME;
let timerRepeatTrigger;


const monstersInfo=[
{
       score : 100,
       time : 3000,
       id : 1,
       url : "https://cdn.pixabay.com/photo/2018/04/19/21/17/lion-3334357_960_720.jpg",
}, 
{
    score : 300,
    time : 2500,
    id : 2,
    url : "https://cdn.pixabay.com/photo/2018/01/10/23/53/rabbit-3075088_960_720.png",
},
{
    score : 500,
    time : 2000,
    id : 3,
    url : "https://cdn.pixabay.com/photo/2018/02/26/11/13/cat-3182830_960_720.png",
},
{
    score : 10000,
    time : 2000,
    id : 4,
    url : "https://www.incimages.com/uploaded_files/image/1920x1080/getty_1128909572_411459.jpg",
},
{
    score : 500,
    time : 2000,
    id : 5,
    url : "https://images.wsj.net/im-159769?width=1280&size=1"
},
{
    score : 1000,
    time : 2000,
    id : 6,
    url : "https://i.pinimg.com/474x/fa/0b/60/fa0b6036237b28f51e1dbb46ed0c028e.jpg"
}
];

function saveUserScore(){
    const bestScore = parseInt(localStorage.getItem(BEST_SCORE));
    if(bestScore==null)
        localStorage.setItem(BEST_SCORE, 0);
    localStorage.setItem(PLAYER_SCORE, playerScore);
    // if(bestScore == null || parseInt(bestScore) < playerScore){
    //     localStorage.setItem(BEST_SCORE, playerScore);
    //     localStorage.setItem(PLAYER_SCORE, playerScore);
    // }
    // else{
    //     localStorage.setItem(PLAYER_SCORE, playerScore);
    // }
}

function minusLife(event){
    const click = event.path.length;
    if(click === 8){
        HOW_MANY_LIFES--;
        if(HOW_MANY_LIFES===0){
            gameOver();
        }    
        while (lifeText.hasChildNodes()){
            lifeText.removeChild(lifeText.firstChild);
        }        
        fillLifes();
    }
}

function fillLifes(){
    for(i=0; i<HOW_MANY_LIFES; i++){
        const initLife = document.createElement("img");
        initLife.src="https://i.pinimg.com/474x/fa/0b/60/fa0b6036237b28f51e1dbb46ed0c028e.jpg";
        lifeText.appendChild(initLife);
    }
}

function clickMonster(event){
    const monsterId = parseInt(event.target.id);
    const monster = event.path[0];
    const monsterContainer = event.path[1];
    switch(monsterId){
        case 1:
            playerScore+=monstersInfo[monsterId-1].score;
            currentScoreText.innerHTML = playerScore;
            monsterLowText.innerHTML = ++clickedLow;
            break;
        case 2:
            playerScore+=monstersInfo[monsterId-1].score;
            currentScoreText.innerHTML = playerScore;
            monsterMiddleText.innerHTML = ++clickedMiddle;
            break;   
        case 3:
            playerScore+=monstersInfo[monsterId-1].score;
            currentScoreText.innerHTML = playerScore;
            monsterHighText.innerHTML = ++clickedHigh;
            break;
        case 4:
            if(doubleScoreTrigger === false){
                doubleScoreTrigger = true;
                doubleScoreText.innerHTML = "🎊 Double Score";
                for(i=0; i<3; i++){
                    monstersInfo[i].score*=2;
                }
                setTimeout(()=>{
                    for(i=0; i<3; i++){
                        parseInt(monstersInfo[i].score/=2);
                    }
                    doubleScoreText.innerHTML = "";
                    doubleScoreTrigger = false;
                }, DOUBLE_SCORE_TIME);
            }
            else{
                playerScore+=monstersInfo[monsterId-1].score;
                currentScoreText.innerHTML=playerScore;
            }
            break;
        case 5:
            bonusTimeText.innerHTML = "🎁 Bonus Time +10";
            setTimeout(()=>{
                bonusTimeText.innerHTML = "";
            }, 1000);
            currentTime+=BONUS_TIME;
            clearInterval(timerRepeatTrigger);
            startTimer(currentTime);
            break;
        case 6: 
            bonusLifeText.innerHTML = "❤ Bonus Life +1";
            setTimeout(()=>{
                bonusLifeText.innerHTML = "";
            }, 1000);
            if(HOW_MANY_LIFES == 3){
                playerScore +=monstersInfo[monsterId-1].score;
                currentScoreText.innerHTML = playerScore;
                break;
            }
            while (lifeText.hasChildNodes()){
                lifeText.removeChild(lifeText.firstChild);
            }
            HOW_MANY_LIFES++;
            fillLifes();
            break;
    }
    monsterContainer.removeChild(monster);
}

function spawnMonsters(){
    gameOverTrigger = setInterval( ()=>{
        let monsterRan = Math.ceil(Math.random()*SPAWN_PERCENTAGE);
        if(monsterRan <= 29){
            monsterRan=0;
        }else if(monsterRan <= 54){
            monsterRan=1;
        }
        else if(monsterRan <= 74){
            monsterRan=2;
        }
        else if(monsterRan <= 84){
            monsterRan=3;
        }
        else if(monsterRan <= 94){
            monsterRan=4;
        }
        else if(monsterRan <= 100){
            monsterRan=5;
        }
        let positionRan = Math.ceil(Math.random()*HOW_MANY_AREAS)-1;
        const newMonster = document.createElement("img");
        newMonster.src=monstersInfo[monsterRan].url;
        newMonster.id=monstersInfo[monsterRan].id;
        newMonster.addEventListener("click", clickMonster);

        if(!areas[positionRan].hasChildNodes()){
            areas[positionRan].appendChild(newMonster);
        }
        else{
            let positionRanSecond = Math.ceil(Math.random()*HOW_MANY_AREAS)-1;
            if(positionRan == positionRanSecond){
                while(positionRan != positionRanSecond){
                    positionRanSecond = Math.ceil(Math.random()*HOW_MANY_AREAS)-1;
                }
            }
            positionRan = positionRanSecond;
            areas[positionRan].appendChild(newMonster);
        }
        setTimeout(function() {
            if (areas[positionRan].hasChildNodes()){
                areas[positionRan].removeChild(areas[positionRan].firstChild);
            }    
        }, monstersInfo[monsterRan].time);
    }, 1000);
}

/*
function spawnMonsters(){
    gameOverTrigger = setInterval( ()=>{
        const monsterRan = Math.ceil(Math.random()*HOW_MANY_MONSTERS)-1;
        let positionRan = Math.ceil(Math.random()*HOW_MANY_AREAS)-1;
        const newMonster = document.createElement("img");
        newMonster.src=monstersInfo[monsterRan].url;
        newMonster.id=monstersInfo[monsterRan].id;
        newMonster.addEventListener("click", clickMonster);
        
        for(i=0; i<areas.length; i++){
            if(!areas[i].hasChildNodes()){
                break;
            }
        }
        
        if(!areas[positionRan].hasChildNodes()){
            console.log("empty");
            areas[positionRan].appendChild(newMonster);
        }else{
            console.log("full");
            let positionRanSecond = Math.ceil(Math.random()*HOW_MANY_AREAS)-1;
            if(positionRan == positionRanSecond){
                while(positionRan != positionRanSecond){
                    positionRanSecond = Math.ceil(Math.random()*HOW_MANY_AREAS)-1;
                }
            }
            positionRan = positionRanSecond;
            areas[positionRan].appendChild(newMonster);
        }
        setTimeout(function() {
            while (areas[positionRan].hasChildNodes()){
                areas[positionRan].removeChild(areas[positionRan].firstChild);
            }    
        }, monstersInfo[monsterRan].time);
    }, 1000);
}
*/

function lifeManager(){
    Array.from(areas).forEach((area) => area.addEventListener("click", minusLife));
}

function gameStart(){
    spawnMonsters();
    lifeManager();
}

function gameOver(){
    gamePageBox.classList.add(HIDDEN);
    endPage.classList.remove(HIDDEN);
    saveUserScore();
    clearInterval(gameOverTrigger);
    load(jsfiles, pageLoadNumber++);
}

function startTimer(time){
    let initMinute = parseInt(time/60);
    let initSecond = parseInt(time%60);
    timeText.innerHTML = `${initMinute < 10 ? `0${initMinute}` : initMinute} : ${initSecond < 10 ? `0${initSecond}` : initSecond} 초`;
    
	timerRepeatTrigger = setInterval(function() {
        if(initMinute === 0 && initSecond ===1){
            clearInterval(timerRepeatTrigger);
            if(gamePage.classList.contains("hidden")===false){
                gameOver();
                return;
            }
        }
        initSecond-=1;
        currentTime-=1;
        if(initSecond===-1){
            initMinute-=1;
            initSecond=59;
        }
        timeText.innerHTML = `${initMinute < 10 ? `0${initMinute}` : initMinute} : ${initSecond < 10 ? `0${initSecond}` : initSecond} 초`;     
	}, 1000);  
}

function initScore(){
    const bestScore = localStorage.getItem(BEST_SCORE);
    monsterHighText.innerHTML = 0;
    monsterLowText.innerHTML = 0;
    monsterMiddleText.innerHTML = 0;
    maxScoreText.innerHTML = (bestScore == null ? 0 : bestScore);
    currentScoreText.innerHTML = 0;
}

function gameInitSet(){
    fillLifes();
    startTimer(currentTime);
    initScore();
}

function init(){
    gameInitSet();
    gameStart();
}

init();