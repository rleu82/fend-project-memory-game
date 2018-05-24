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
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
* Create memory game board
*    - shuffle the cards using provided function
*    - loop through the new array and generate html that will be stored in fragment (lesson 23.2) for performance
*    - add the stored fragment into <ul> with class of deck
*    - used map method to handle the new shuffled array 
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
      let theCard = `<li class="card"><i class="fa ${cardItem}"></i></li>`;
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
