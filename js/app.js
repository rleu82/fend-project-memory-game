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
var getOpenCards = document.querySelectorAll(".open");

// Displays card's symbol
function openCard(card) {
    card.classList.add("open", "show");
}

//Hides cards symbol - find all cards with .open class and remove .open and .show
function closeCard(card) {
    getOpenCards.forEach(function(card) {
        card.classList.remove("open", "show");
    });
}

// Add card to cardStored array(list) until compared
function pushCard(card) {
    cardStored.push(card);
}

// Add Match class - find all .open cards if cards match and add .match class
function matchedCard() {
    getOpenCards.forEach(function(card) {
        card.classList.add("match");
    });
}

gameDeck.addEventListener("click", function(thisCard) {
    var card = thisCard.target;
    var gameCards = document.querySelectorAll(".card");

    if (thisCard.target.nodeName == "LI") {
        openCard(card);
        pushCard(card);
        console.log(cardStored);
    }
    if (cardStored.length == 2) {
        if (cardStored[0].dataset == cardStored[1].dataset) {
            matchedCard(card);
        } else {
            setTimeout(100);
            closeCard(card);
            closeCard(cardStored[0]);
        }
    }
});
