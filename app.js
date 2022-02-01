/*
SECOND ITERATION - (VERY) BASIC FUNCTIONALITY
 
Classes: 

(- Two players)
(- One board)
- Very basic game logic

Events:
(- player clicks on board 'deck' and adds one 'card' to their hand (Player class method ?))
(- then switch to the next player (Game class method ? ))
- add an element property to the player class to hold corresponding HTML element
- display the each players hand in their respective area


*/

class Game {
  constructor(board) {
    this._board = board;
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
  addMainPileListener() {
    this._board.mainPile.addEventListener("click", (event) => {
      console.log("main clicked");
      if (this._turn % 2 === 0) {
        this._players.player1.addCard("p1 card from main pile");
        this._players.player1.element = "p1 card from main pile";
      } else {
        this._players.player2.addCard("p2 card from main pile");
      }
      this._turn++;
    });
  }
  addDiscardPileListner() {
    this._board.discardPile.addEventListener("click", (event) => {
      console.log("discarded clicked");
      if (this._turn % 2 === 0) {
        this._players.player1.addCard("p1 card from discard pile");
      } else {
        this._players.player2.addCard("p2 card from discard pile");
      }
      this._turn++;
    });
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
    console.log(this._hand);
  }
  get hand() {
    return this._hand;
  }
  get element() {
    return this._element;
  }
  element(text) {
    console.log("setting element", text);
    this._element.innerHTML = text;
  }
}

const board = new Board(
  document.getElementById("main_pile"),
  document.getElementById("discard_pile")
);

const tens = new Game(board);
