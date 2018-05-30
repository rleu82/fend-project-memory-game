// Cards array
const gameCards = [
    "fa-diamond",
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-anchor",
    "fa-bolt",
    "fa-bolt",
    "fa-cube",
    "fa-cube",
    "fa-bomb",
    "fa-bomb",
    "fa-leaf",
    "fa-leaf",
    "fa-bicycle",
    "fa-bicycle"
];

const shuffledCards = shuffle(gameCards);
const gameDeck = document.querySelector(".deck");
let cardStored = [];

// Create memory game board
function createGameBoard() {
    let cardHtml = "";
    for (let cardItem of shuffledCards) {
        let theCard = `<li class="card" data-symbol="${cardItem}"><i class="fa ${cardItem}"></i></li>`;
        cardHtml += theCard;
    }
    gameDeck.innerHTML = cardHtml;
}

// Create board when window loads
window.addEventListener("onload", createGameBoard());

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Card Management Functions
*/
const gameRestart = document.querySelector(".restart");

// Displays card's symbol and disables mouse event on card (prevents double click)
function openCard(card) {
    card.classList.add("stopMouse", "open", "show");
}

// Hides cards symbol

function closeCard() {
    let clCards = Array.from(document.getElementsByClassName("open"));
    console.log(clCards);
    clCards.forEach(function(card) {
        if (card.classList.contains("open")) {
            card.classList.toggle("stopMouse", false);
            card.classList.toggle("open", false);
            card.classList.toggle("show", false);
        }
    });
}

// Enables mouse events on all cards - Function called if cards match or do not match to reset mouse events
function enableCards() {
    let getAllCards = document.querySelectorAll(".card");
    getAllCards.forEach(function(card) {
        if (card.classList.contains("match")) {
            card.classList.toggle("stopMouse", true);
        } else {
            card.classList.toggle("stopMouse", false);
        }
    });
}

// Disables mouse events on all cards - Function called when two cards are flipped
function disableCards() {
    let getAllCards = document.querySelectorAll(".card");
    getAllCards.forEach(function(card) {
        card.classList.toggle("stopMouse", true);
    });
}

// Add Match class and disable mouse events for matched cards
function matchedCard() {
    cardStored.forEach(function(card) {
        card.classList.add("match");
    });
}

// Add card to cardStored array(list) until compared
function pushCard(card) {
    cardStored.push(card);
}

// Reset all cards
function resetCards() {
    let getAllCards = document.querySelectorAll(".card");
    getAllCards.forEach(function(card) {
        card.classList.toggle("open", false);
        card.classList.toggle("show", false);
        card.classList.toggle("stopMouse", false);
        card.classList.toggle("match", false);
    });
}

// Check if cards match
function checkMatch() {
    if (cardStored[0].dataset.symbol == cardStored[1].dataset.symbol) {
        matchedCard(); // add match to class to keep cards open
        allMatched++; // increment matched to signal endgame if 8 matched
        enableCards();
        cardStored = [];
    } else {
        setTimeout(function() {
            closeCard(); // flip cards back over because no cards matched
            enableCards();
            cardStored = [];
        }, 1150);
    }
}

/*
* Score Tracking Functions - Stars, Moves and Timer DOM
*/

// Timer Variables
const grabSeconds = document.querySelector("#seconds");
const grabMinutes = document.querySelector("#minutes");
const grabMoves = document.querySelector("#moves");
const grabStars = document.querySelector("#stars");
let tSeconds = 0;
let tMinutes = 0;
let startTimer;
let stopGameTimer = false;
let yourMoves = 0;
let modalMessage;

// Timer DOM Update
function manageTimer() {
    tSeconds++;
    if (tSeconds == 60) {
        tMinutes++;
        tSeconds = 0;
    } else if (tSeconds < 10) {
        grabSeconds.textContent = "0" + tSeconds;
    } else {
        grabSeconds.textContent = tSeconds;
    }
    grabMinutes.textContent = tMinutes;
}

// Start Timer
function timer() {
    startTimer = setInterval(manageTimer, 1000);
}

// Stop Timer
function stopTimer() {
    clearInterval(startTimer);
}

// Stop timer count
function stopTimerCount() {
    if ((stopGameTimer = true)) {
        tSeconds = 0;
        tMinutes = 0;
    }
}

// Reset Timer
function resetTimer() {
    stopGameTimer = true;
    stopTimer();
    stopTimerCount();
    stopGameTimer = false;
}

// Move Count - Change stars to two when moves = 12, one star at moves = 18. default is 3 stars
function displayMoves() {
    yourMoves++;
    grabMoves.textContent = yourMoves;
    if (yourMoves > 12) {
        grabStars.children[2].firstElementChild.classList.replace(
            "fa-star",
            "fa-star-o"
        );
        modalMessage = yourMoves + " moves! Keep at it!";
    } else if (yourMoves > 18) {
        grabStars.children[1].firstElementChild.classList.replace(
            "fa-star",
            "fa-star-o"
        );
        grabStars.children[2].firstElementChild.classList.replace(
            "fa-star",
            "fa-star-o"
        );
        modalMessage = yourMoves + " moves! I know you can do better!";
    } else if (yourMoves < 12) {
        grabStars.children[2].firstElementChild.classList.replace(
            "fa-star-o",
            "fa-star"
        );
        grabStars.children[1].firstElementChild.classList.replace(
            "fa-star-o",
            "fa-star"
        );
        grabStars.children[0].firstElementChild.classList.replace(
            "fa-star-o",
            "fa-star"
        );
        modalMessage = yourMoves + " moves! You are a Pro!";
    }
}

// Reset score
function resetScores() {
    grabMoves.innerHTML = "0";
    grabSeconds.innerHTML = "0" + tSeconds;
    grabMinutes.innerHTML = "0";
}

// Check first time click
function firstTimer() {
    if (firstClick == 1) {
        timer();
    }
}

/* 
* End Game modals
*/

// Show end game modal
const endModal = document.getElementById("eModal");
const getModalMessage = document.getElementById("end-message");
const modalButton = document.getElementById("modal-b");
function showModal() {
    endModal.style.display = "block";
    getModalMessage.innerHTML = modalMessage;
}

// Hide modal
function hideModal() {
    endModal.style.display = "none";
}

/*
* Restart and End Game 
*/
// Restart Game function
function restartGame() {
    resetTimer();
    resetScores();
    yourMoves = 0;
    allMatched = 0;
    createGameBoard();
    cardStored = [];
    firstClick = 0;
}

// Check if all are matched to end game
let allMatched = 0;
function matchedAll() {
    if (allMatched == 8) {
        stopTimer();
        showModal();
        disableCards();
    }
}

/*
* Event Listeners
*/

// Main Game Event Listener
firstClick = 0;
gameDeck.addEventListener("click", function(thisCard) {
    let tCard = thisCard.target;
    let gameCards = document.querySelectorAll(".card");
    if (thisCard.target.nodeName == "LI") {
        pushCard(tCard);
        openCard(tCard);
        firstClick++;
        firstTimer();
        if (cardStored.length == 2) {
            disableCards();
            console.log(cardStored);
            displayMoves(); // update move counter
            checkMatch(); // check for match
            matchedAll();
        }
    }
});

// Restart
gameRestart.addEventListener("click", function() {
    restartGame();
    console.log("restart");
});

// Modal Restart Game
modalButton.addEventListener("click", function() {
    restartGame();
    hideModal();
});
