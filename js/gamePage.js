const gamePageBox = document.querySelector(".gamePage");
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


function gameInitSet(){
    lifeText.innerHTML = "3";
    timeText.innerHTML = "00:05";


}


function init(){
    gameInitSet();
}


init();