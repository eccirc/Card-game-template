/*
FIFTH ITERATION - (VERY) BASIC FUNCTIONALITY
 
Classes: 

(- Two players (class) 1)
(- One board (class) 1)
(- deck (class) 4)
- Very basic game logic


Events/ To Do:
(- player clicks on board 'deck' and adds one 'card' to their hand (Player class method ?) 1)
(- then switch to the next player (Game class method ? ) 1)
(- add an element property to the player class to hold corresponding HTML element 2)
(- display the each players hand in their respective area 2)
(- create styles in SCSS to more clearly de-lineate areas and components 3 )
    - components for areas
    - components for cards
(- create a card deck object to be used with the Game class 3)
(- create a deck class which takes the cards object as a parameter 4)
(- create a class method 'shuffle' within deck to return a new randomised array 4)
- make a start game function in Game class which shuffles the cards and adds the cards as new divs to the main pile
- deal 10 cards to each player - deducted from the main pile


*/
import { cards } from "./cards.mjs";

class Game {
  constructor(board) {
    this._board = board;
    this._deck = new Deck(cards);
    this._shuffled = [];
    this._shuffledDivs = [];
    this._turn = 0;
    this.addMainPileListener();
    this.addDiscardPileListner();
    this._players = {
      player1: new Player(
        "Player 1",
        document.getElementById("player_1_cards")
      ),
      player2: new Player(
        "Player 2",
        document.getElementById("player_2_cards")
      ),
    };
  }
  startGame() {
    //this._shuffled = this._deck.cardsShuffled();
    this.populateShuffledDeck(this._deck.cardsShuffled());
    this.populateMainPile(this._shuffled);
    console.log(this._shuffled);
  }
  populateShuffledDeck(array) {
    this._shuffled = array.map((item) => {
      const newObj = { ...item };
      const element = document.createElement("div");
      element.classList.add(`card`);
      element.classList.add(`card-main`);
      element.innerHTML = "🂠";
      newObj.div = element;
      return newObj;
    });
  }
  populateMainPile(array) {
    array.forEach((element) => {
      this._board.mainPile.appendChild(element.div);
    });
  }
  dealCards(amount, player) {
    for (let i = 0; i < amount; i++) {}
  }
  addMainPileListener() {
    this._board.mainPile.addEventListener("click", (event) => {
      this.gameTurnChecker("main");
    });
  }
  addDiscardPileListner() {
    this._board.discardPile.addEventListener("click", (event) => {
      this.gameTurnChecker("discard");
    });
  }
  gameTurnChecker(pile) {
    if (this._turn % 2 === 0) {
      this.addCardToPlayer("player1");
    } else {
      this.addCardToPlayer("player2");
    }
    this._turn++;
  }

  addCardToPlayer(player) {
    const cardObj = this._shuffled.pop();
    this._board.mainPile.removeChild(this._board.mainPile.lastChild);
    const element = cardObj.div;
    this._players[player].addCard(element);
  }
}

class Deck {
  constructor(cards) {
    this._cards = cards;
  }
  get cards() {
    return this._cards;
  }
  cardsShuffled() {
    const shuffledDeck = [...this._cards];
    for (let i = 0; i < this._cards.length; i++) {
      const rnd = (Math.random() * i) | 0;
      const tmp = shuffledDeck[i];
      shuffledDeck[i] = shuffledDeck[rnd];
      shuffledDeck[rnd] = tmp;
    }
    return shuffledDeck;
  }
}

class Board {
  constructor(mainPile, discardPile) {
    this._mainPile = mainPile;
    this._discardPile = discardPile;
  }
  get mainPile() {
    return this._mainPile;
  }
  get discardPile() {
    return this._discardPile;
  }
}

class Player {
  constructor(name, element) {
    this._name = name;
    this._element = element;
    this._hand = [];
  }
  addCard(card) {
    this._hand.push(card);
    this.appendCardToElement(card);
  }
  get hand() {
    return this._hand;
  }
  get element() {
    return this._element;
  }
  appendCardToElement(cardDiv) {
    this._element.appendChild(cardDiv);
  }
}

const board = new Board(
  document.getElementById("main_pile"),
  document.getElementById("discard_pile")
);

const tens = new Game(board);
tens.startGame();
