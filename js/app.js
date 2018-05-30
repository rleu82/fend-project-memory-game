/*
 * Create an array of symbols(list) that will be attached to the cards
 *   - these symbols are classes that will be added to the <i> when html is generated
 *   - symbols are from fontawesome using fa- naming scheme
 */
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

/*
* Create memory game board
*    - shuffle the cards using provided function
*    - loop through the new array and generate html
*    - add the stored html into <ul> with class of deck
*    - used forOf to handle the new shuffled array 
*/
const shuffledCards = shuffle(gameCards);
const gameDeck = document.querySelector(".deck");
const gameRestart = document.querySelector(".restart");
let cardStored = [];

// Render the cards
function createGameBoard() {
    let cardHtml = "";

    for (let cardItem of shuffledCards) {
        let theCard = `<li class="card" data-symbol="${cardItem}"><i class="fa ${cardItem}"></i></li>`;
        cardHtml += theCard;
    }

    gameDeck.innerHTML = cardHtml;
    cardStored = [];
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
let getAllCards = Array.from(document.getElementsByClassName("card"));

// Displays card's symbol and disables mouse event on card (prevents double click)
function openCard(card) {
    card.classList.add("open", "show", "stopMouse");
}

// Hides cards symbol
function closeCard() {
    let arrCards = Array.from(document.getElementsByClassName("open"));
    arrCards.forEach(function(card) {
        card.classList.remove("open", "show", "stopMouse");
        console.log(card);
    });
}

// Enables mouse events on all cards - Function called if cards match or do not match to reset mouse events
function enableCards() {
    getAllCards.forEach(function(card) {
        card.classList.remove("stopMouse");
    });
}

// Add Match class and disable mouse events for matched cards
function matchedCard() {
    let arrCards = Array.from(document.getElementsByClassName("open"));
    arrCards.forEach(function(card) {
        card.classList.add("match");
    });
}

// Add card to cardStored array(list) until compared
function pushCard(card) {
    cardStored.push(card);
}

// Disables mouse events on all cards - Function called when two cards are flipped
function disableCards() {
    getAllCards.forEach(function(card) {
        card.classList.add("stopMouse");
    });
}

// Reset all cards
function resetCards() {
    getAllCards.forEach(function(card) {
        card.classList.remove("open", "show", "stopMouse", "match");
    });
}

// Check if cards match
function checkMatch() {
    disableCards();
    if (cardStored[0].dataset.symbol == cardStored[1].dataset.symbol) {
        matchedCard(); // add match to class to keep cards open
        allMatched++; // increment matched to signal endgame if 8 matched
        cardStored = [];
        enableCards();
    } else {
        disableCards();
        setTimeout(function() {
            closeCard(); // flip cards back over because no cards matched
            enableCards();

            cardStored = [];
        }, 1150);
    }
}

/*
* Score Tracking Functions - Moves and Timer DOM
*/
// Move Count - Change stars to two when moves = 12, one star at moves = 18. default is 3 stars
let yourMoves = 0;
let starCount = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
let modalMessage = " 3 Stars! You are a Pro!";
const grabMoves = document.getElementById("moves");
const grabStars = document.getElementById("stars");

function displayMoves() {
    let twoStars = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>`;
    let oneStar = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>`;
    yourMoves++;
    console.log(yourMoves);
    grabMoves.innerHTML = yourMoves;
    if (yourMoves == 12) {
        grabStars.innerHTML = twoStars;
        starCount = twoStars;
        modalMessage = " 2 Stars! Keep at it!";
    } else if (yourMoves == 18) {
        grabStars.innerHTML = oneStar;
        starCount = oneStar;
        modalMessage = " 1 Star! I know you can do better!";
    }
}

// Manage timer DOM
let tSeconds = 0;
let tMinutes = 0;
const grabSeconds = document.getElementById("seconds");
const grabMinutes = document.getElementById("minutes");
let stopGameTimer = false;

function stopTimerCount() {
    if ((stopGameTimer = true)) {
        tSeconds = 0;
        tMinutes = 0;
    }
}
function manageTimer() {
    tSeconds++;
    if (tSeconds == 60) {
        tMinutes++;
        tSeconds = 0;
    } else if (tSeconds < 10) {
        grabSeconds.innerHTML = "0" + tSeconds;
    } else {
        grabSeconds.innerHTML = tSeconds;
    }
    grabMinutes.innerHTML = tMinutes;
}

// Start Timer
let startTimer;
function timer() {
    startTimer = setInterval(manageTimer, 1000);
}

// Stop Timer
function stopTimer() {
    clearInterval(startTimer);
}

// Reset Timer
function resetTimer() {
    stopGameTimer = true;
    stopTimer();
    stopTimerCount();
    stopGameTimer = false;
}

/* 
* End Game modals
*/
// Show end game modal
const endModal = document.getElementById("eModal");
const getModalMessage = document.getElementById("end-message");
function showModal() {
    endModal.style.display = "block";
    getModalMessage.innerHTML = modalMessage;
}

// Hide modal
function hideModal() {
    endModal.style.display = "none";
}

// Restart Game function
function restartAllGame() {
    starCount = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    resetTimer();
    grabStars.innerHTML = starCount;
    grabMoves.innerHTML = "0";
    grabSeconds.innerHTML = "0" + tSeconds;
    grabMinutes.innerHTML = "0";
    yourMoves = 0;
    allMatched = 0;
    createGameBoard();
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
    let card = thisCard.target;
    let gameCards = document.querySelectorAll(".card");
    if (thisCard.target.nodeName == "LI") {
        openCard(card);
        pushCard(card);
        firstClick++;
        if (firstClick == 1) {
            timer();
        } else if (cardStored.length == 2) {
            displayMoves(); // update move counter
            checkMatch(); // check for match
            matchedAll();
        }
    }
});

// Restart
gameRestart.addEventListener("click", function() {
    restartAllGame();
    console.log("restart");
});
