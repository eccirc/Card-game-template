/*
SIXTH ITERATION - CLASSES OVERRHAUL - EVERYTHING IS AN OBJECT
 
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
(- make a start game function in Game class which shuffles the cards and adds the cards as new divs to the main pile 5)
(- deal 10 cards to each player - deducted from the main pile)
(- both main deck and discard pile need to be objects - use the same logic as the (previously) Player class and duplicate this 6)
(- add event listeners for each players card deck to let them move cards around 7)



*/
import { cards } from "./cards.mjs";

class Game {
  constructor() {
    this._deck = new Deck(cards);
    this._shuffled = [];
    this._turn = 0;
    this._players = {
      player1: new cardsHeld(
        "Player 1",
        document.getElementById("player_1_cards")
      ),
      player2: new cardsHeld(
        "Player 2",
        document.getElementById("player_2_cards")
      ),
    };
    this._pickupArea = {
      mainDeck: new cardsHeld(
        "main deck",
        document.getElementById("main_pile")
      ),
      discardPile: new cardsHeld(
        "discard pile",
        document.getElementById("discard_pile")
      ),
    };
  }
  startGame() {
    this.populateShuffledDeck(this._deck.cardsShuffled());
    this.dealCards(10, this._players, "player1");
    this.dealCards(10, this._players, "player2");
    this.addMainPileListener();
    this.addDiscardPileListner();
    this.addPlayerPileListener(
      this._pickupArea,
      "discardPile",
      this._players.player1
    );
    this.addPlayerPileListener(
      this._pickupArea,
      "discardPile",
      this._players.player2
    );
    //console.log(this._players.player1);
  }

  creatCardDownDiv(index) {
    const element = document.createElement("div");
    element.classList.add(`card`);
    element.classList.add(`card--main`);
    element.innerHTML = "🂠";
    element.style.transform = `translateX(-${index}px) translateY(-${index}px)`;
    return element;
  }

  populateShuffledDeck(array) {
    array.forEach((item, index) => {
      const newObj = { ...item };
      newObj.div = this.creatCardDownDiv(index);
      this._pickupArea.mainDeck.addCard(newObj);
    });
  }
  dealCards(amount, area, deck) {
    for (let i = 0; i < amount; i++) {
      this.addCardToDeck(area, deck, this._pickupArea.mainDeck.hand);
    }
  }
  addMainPileListener() {
    this._pickupArea.mainDeck.element.addEventListener("click", (event) => {
      this.gameTurnChecker("mainDeck");
    });
  }
  addDiscardPileListner() {
    this._pickupArea.discardPile.element.addEventListener("click", (event) => {
      this.gameTurnChecker("discardPile");
    });
  }
  addPlayerPileListener(area, deckTo, deckFrom) {
    deckFrom.element.addEventListener("click", (event) => {
      const cardObj = deckFrom.hand.filter(
        (item) => item.div.innerHTML === event.target.innerHTML
      )[0];
      cardObj.div.classList.add(`card--main`);
      const offset = deckFrom.hand.length;
      cardObj.div.style.transform = `translateX(-${offset}px) translateY(-${offset}px)`;
      deckFrom.hand.splice(deckFrom.hand.indexOf(cardObj), 1);
      deckFrom.element.removeChild(cardObj.div);
      area[deckTo].addCard(cardObj);
    });
  }

  gameTurnChecker(pile) {
    if (this._turn % 2 === 0) {
      this.addCardToDeck(this._players, "player1", this._pickupArea[pile].hand);
    } else {
      this.addCardToDeck(this._players, "player2", this._pickupArea[pile].hand);
    }
    this._turn++;
  }

  addCardToDeck(area, deckTo, deckFrom) {
    const cardObj = deckFrom.pop(); //This needs to be "slice"  and splice in order to remove it in order to target the correct element of the array when clicked
    //const cardObj = deckFrom.slice(deckFrom)
    const element = cardObj.div;
    element.style.transform = "translateX(0) translateY(0)";
    element.innerHTML = cardObj.symbol;
    element.classList.add(cardObj.colour);
    element.classList.remove("card--main");
    area[deckTo].addCard(cardObj);
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

class cardsHeld {
  constructor(name, element) {
    this._name = name;
    this._element = element;
    this._hand = [];
  }
  get hand() {
    return this._hand;
  }
  get element() {
    return this._element;
  }
  addCard(cardObj) {
    this._hand.push(cardObj);
    this.appendCardToElement(cardObj.div);
  }

  appendCardToElement(cardDiv) {
    this._element.appendChild(cardDiv);
  }
}

const tens = new Game(board);
tens.startGame();
