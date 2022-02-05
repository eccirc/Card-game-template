/*
NINTH ITERATION - GAME LOGIC - LETS GO
 
Classes: 

(- Two players (class) 1)
(- One board (class) 1)
(- deck (class) 4)
- Very basic game logic

*/
import { cards } from "./cards.mjs";
import { RummyRulesBasic as rules } from "./handChecker.mjs";
import { Player } from "./player.mjs";

class Game {
  constructor() {
    this._deck = new Deck(cards);
    this._shuffled = [];
    this._turn = 0;
    this._rules = new rules();
    this._players = {
      player1: new Player(
        new cardsHeld("Player_1", document.getElementById("player_1_cards")),
        new cardsHeld(
          "Player_1_Played",
          document.getElementById("player_1_played")
        ),
        document.getElementById("player_1_action"),
        document.getElementById("player_1_message")
      ),
      player2: new Player(
        new cardsHeld("Player_2", document.getElementById("player_2_cards")),
        new cardsHeld(
          "Player_2_Played",
          document.getElementById("player_2_played")
        ),
        document.getElementById("player_2_action"),
        document.getElementById("player_2_message")
      ),
    };
    this._playArea = {
      mainDeck: new cardsHeld(
        "main deck",
        document.getElementById("main_pile")
      ),
      discardPile: new cardsHeld(
        "discard pile",
        document.getElementById("discard_pile")
      ),
    };
    this._curentPlayer = this._players.player1;
  }
  startGame() {
    this.populateShuffledDeck(this._deck.cardsShuffled());
    this.dealCards(10, this._players.player1.hand);
    this.dealCards(10, this._players.player2.hand);
    this.gameTurnChecker();
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
      this._playArea.mainDeck.addCard(newObj);
    });
  }
  dealCards(amount, deckTo) {
    for (let i = 0; i < amount; i++) {
      deckTo.addCard(this.addCardToDeck(this._playArea.mainDeck.hand));
    }
  }

  addPlayerPileListener(deckTo, deckFrom) {
    deckFrom.element.addEventListener(
      "click",
      (event) => {
        const cardObj = deckFrom.hand.filter(
          (item) => item.div.innerHTML === event.target.innerHTML
        )[0];
        //cardObj.div.classList.add(`card--main`);
        const offset = deckFrom.hand.length;
        cardObj.div.style.transform = `translateX(-${offset}px) translateY(-${offset}px)`;
        deckFrom.hand.splice(deckFrom.hand.indexOf(cardObj), 1);
        deckFrom.element.removeChild(cardObj.div);
        deckTo.addCard(cardObj);
        this._turn++;
        this.gameTurnChecker();
      },
      { once: true }
    );
  }

  gameTurnChecker() {
    if (this._turn % 2 === 0) {
      this._curentPlayer = this._players.player1;
    } else this._curentPlayer = this._players.player2;
    this.addPlayerPileListener(
      this._playArea.discardPile,
      this._curentPlayer.hand
    );
  }

  addCardToDeck(deckFrom) {
    const cardObj = deckFrom.pop();
    const element = cardObj.div;
    element.style.transform = "translateX(0) translateY(0)";
    element.innerHTML = cardObj.symbol;
    element.classList.add(cardObj.colour);
    element.classList.remove("card--main");
    return cardObj;
    //[deckTo].addCard(cardObj);
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
