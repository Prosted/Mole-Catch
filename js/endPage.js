const retryButton = endPage.querySelector(".load-button");
const endScoreboard = endPage.querySelector(".score-board");
const endBestScore = endScoreboard.querySelector(".score-board__best");
const endPlayerScore = endScoreboard.querySelector(".score-board__player");
const newRecord = endPage.querySelector(".newRecord");
const newRecordText = newRecord.querySelector(".newRecord__text");


function printScore(){
    const playerScore =parseInt(localStorage.getItem(PLAYER_SCORE));
    const bestScore = parseInt(localStorage.getItem(BEST_SCORE));
    
    if(bestScore>=playerScore || (bestScore==0 && playerScore ==0)){
        if(endScoreboard.classList.contains(HIDDEN)){
            newRecord.classList.add(HIDDEN);
            endScoreboard.classList.remove(HIDDEN);
        }
        endBestScore.innerHTML = bestScore;
        endPlayerScore.innerHTML = playerScore;
    }else{
        endScoreboard.classList.add(HIDDEN);
        newRecord.classList.remove(HIDDEN);
        newRecordText.innerHTML = playerScore;
        localStorage.setItem(BEST_SCORE, playerScore);
    }
}


function goBackHome(){
    window.location.reload();
}

function init(){
    retryButton.addEventListener("click", goBackHome);
    printScore();
}

init();