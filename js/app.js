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

function createGameBoard() {
    let cardHtml = "";

    for (let cardItem of shuffledCards) {
        /*let cardPieceA = `<li class="card"><i class="fa `;
        let cardPieceB = `"></i></li>`;
        let theCard = cardPieceA + cardItem + cardPieceB;*/
        // condensed to below using template literal
        let theCard = `<li class="card" data-symbol="${cardItem}"><i class="fa ${cardItem}"></i></li>`;
        cardHtml += theCard;
    }
    gameDeck.innerHTML = cardHtml;
    cardStored = [];
}

createGameBoard();

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
const getAllCards = Array.from(document.getElementsByClassName("card"));

// Displays card's symbol and disables mouse event on card (prevents double click)
function openCard(card) {
    card.classList.add("open", "show", "stopMouse");
}

// Hides cards symbol and enables mouse events for cards that are flipped
function closeCard() {
    let arrCards = Array.from(document.getElementsByClassName("open"));
    enableCards();
    arrCards.forEach(function(card) {
        card.classList.remove("open", "show", "stopMouse");
        console.log(card);
    });
}

// Add Match class and disable mouse events for matched cards
function matchedCard() {
    let arrCards = Array.from(document.getElementsByClassName("open"));
    arrCards.forEach(function(card) {
        card.classList.add("match", "stopMouse");
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

// Disables mouse events on all cards - Function called if cards match or do not match to reset mouse events
function enableCards() {
    getAllCards.forEach(function(card) {
        card.classList.remove("stopMouse");
    });
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

/* 
* Start and End Game modals
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
    yourMoves = 0;
    starCount = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    stopGameTimer = true;
    stopTimer();
    stopTimerCount();
    stopGameTimer = false;
    grabStars.innerHTML = starCount;
    grabMoves.innerHTML = "0";
    grabSeconds.innerHTML = "0";
    grabMinutes.innerHTML = "0";
    createGameBoard();
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
* Event listener for a card(<li>)
*   - event delegation on parent gameDeck
*   - if target is card(<li>), the card is flipped and pushed to array cardStored[]
*       - openCard() adds open, show, stopMouse classes to card
*       - stopMouse prevents clicking same card twice
*
* If the cardStored array has TWO cards stored, disable all cards to prevent more cards from flipping
*   - check array to compare dataset
*   - matched cards have match and stopMouse classes added to prevent clicks
*   - all other cards are enabled
*       - if no matches found, close the cards and clear the array again.
*/

// Main Game Event Listener
gameDeck.addEventListener("click", function(thisCard) {
    let card = thisCard.target;
    let gameCards = document.querySelectorAll(".card");

    if (thisCard.target.nodeName == "LI") {
        openCard(card);
        pushCard(card);
        console.log(cardStored);

        if (cardStored.length == 2) {
            // when two cards added to array
            disableCards(); // disable all cards for checking match
            displayMoves(); // update move counter
            if (cardStored[0].dataset.symbol == cardStored[1].dataset.symbol) {
                // check for match
                matchedCard(); // add match to class to keep cards open
                cardStored = []; // clear the card store array
                allMatched++; // increment matched to signal endgame if 8 matched
                enableCards(); // enable the rest of the cards to continue
                console.log(allMatched); // test
                matchedAll(); // if 8 matches are signaled this executes to end game
            } else {
                setTimeout(function() {
                    // keeps cards open for 1.15 seconds
                    closeCard(); // flip cards back over because no cards matched
                }, 1150);
                cardStored = []; // clear the stored cards array used for checking matches
            }
        }
    }
});

/*
* Event listener for Start and Restart
*/

// Restart
gameRestart.addEventListener("click", function() {
    restartAllGame();
    console.log("restart");
});
