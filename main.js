/**
* For this assignment, you’ll be building a memory game in the browser using HTML, CSS, and JavaScript. 
* Your goal is to build a card-based memory game.
* Players will be shown a collection of cards, face down, and can click on a card to reveal what’s underneath.
* After clicking on two cards, the game should check to see whether they match. If they do, they will remain facing up.
* If not, the cards should remain displayed to the player for one second, and then flip back down.
* The goal of the game is to match up all the pairs.
*/

// created an Array for 8 cards
const arrayCards = ["10", "10", "20", "20", "30", "30", "40", "40"];

let numCards = arrayCards.length;
const score = document.getElementById("score");
let scoreClick = 0;
let countClick = 0;

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", handleStartGame);

const restartBnt = document.getElementById("restart");
restartBnt.addEventListener("click", handleRestartGame);
let firstCard = null;
let secondCard = null;

/* shuffle the Array
   It picks a random item from the array and puts the new item in the current iteration.
*/
function shuffleArray (array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function handleStartGame(){
    startBtn.classList.toggle("hidden");
    shuffleCards = shuffleArray(arrayCards);

    for(let card of shuffleCards){
        const divCards = document.getElementById("divCards");
        const divCard = document.createElement("div");
        divCard.className = "box";
    
        const back = document.createElement("div");
        back.className = "back";
    
        back.addEventListener("click", handleCardClick);
    
        const content = document.createElement("div");
        content.className = "content";
        content.innerText = card;
    
        back.appendChild(content);

        divCard.append(back);
        divCards.appendChild(divCard);
    }
}

function handleCardClick(event) { 
    scoreClick++;
    score.innerText = scoreClick;
    countClick++;
    event.target.classList.toggle("turn");

    if (countClick === 1) {
        firstCard = event.target;
        firstCard.removeEventListener("click", handleCardClick);

    } else {

        secondCard = event.target;
        secondCard.removeEventListener("click", handleCardClick);
        
        if (firstCard.firstElementChild.innerText === secondCard.firstElementChild.innerText) {

            numCards = numCards - 2;

            if (numCards === 0){
                let bestScore = JSON.parse(localStorage.getItem("memoryGameScore")) || 1000;
                if (scoreClick < bestScore){
                    localStorage.setItem("memoryGameScore", scoreClick);
                }
                restart.classList.toggle("hidden");
            }

            firstCard.classList.add("dark");
            secondCard.classList.add("dark");

            firstCard = null;
            secondCard = null;
        }
        else
        {
            setTimeout(function() {
                firstCard.addEventListener("click", handleCardClick);
                secondCard.addEventListener("click", handleCardClick);
                firstCard.classList.remove("turn");
                secondCard.classList.remove("turn");
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
        countClick = 0;
    }
}

function handleRestartGame(){
    restartBnt.classList.toggle("hidden");
    location.reload();
}

