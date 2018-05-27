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

    gameDeck.insertAdjacentHTML("afterbegin", cardHtml);
    timer();
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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var cardStored = [];
var getAllCards = Array.from(document.getElementsByClassName("card"));

// Displays card's symbol and disables mouse event on card (prevents double click)
function openCard(card) {
    card.classList.add("open", "show", "stopMouse");
}

// Hides cards symbol and enables mouse events for cards that are flipped
function closeCard() {
    var arrCards = Array.from(document.getElementsByClassName("open"));
    enableCards();
    arrCards.forEach(function(card) {
        card.classList.remove("open", "show", "stopMouse");
        console.log(card);
    });
}

// Add Match class and disable mouse events for matched cards
function matchedCard() {
    var arrCards = Array.from(document.getElementsByClassName("open"));
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

// Move Count
var yourMoves = 0;
function displayMoves() {
    let grabMoves = document.getElementById("moves");
    yourMoves++;
    console.log(yourMoves);
    grabMoves.innerHTML = yourMoves;
}

// Manage timer DOM
var tSeconds = 0;
var tMinutes = 0;
function manageTimer() {
    let grabSeconds = document.getElementById("seconds");
    let grabMinutes = document.getElementById("minutes");
    tSeconds++;
    if (tSeconds == 60) {
        tMinutes++;
        tSeconds = 0;
    }
    if (tSeconds < 10) {
        grabSeconds.innerHTML = "0" + tSeconds;
    } else {
        grabSeconds.innerHTML = tSeconds;
    }
    grabMinutes.innerHTML = tMinutes;
}

// Start Timer
function timer() {
    startTimer = setInterval(manageTimer, 1000);
}

// Stop Timer
function stopTimer() {
    clearInterval(startTimer);
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
gameDeck.addEventListener("click", function(thisCard) {
    var card = thisCard.target;
    var gameCards = document.querySelectorAll(".card");

    if (thisCard.target.nodeName == "LI") {
        openCard(card);
        pushCard(card);
        console.log(cardStored);

        if (cardStored.length == 2) {
            disableCards();
            displayMoves();
            if (cardStored[0].dataset.symbol == cardStored[1].dataset.symbol) {
                matchedCard();
                cardStored = [];
                enableCards();
                stopTimer();
            } else {
                setTimeout(function() {
                    closeCard();
                }, 1500);
                cardStored = [];
            }
        }
    }
});
