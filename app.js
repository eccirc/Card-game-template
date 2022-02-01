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
      this.playerMethodHandler(pile, "player1");
    } else {
      this.playerMethodHandler(pile, "player2");
    }
    this._turn++;
  }

  playerMethodHandler(pile, player) {
    let value = `${player} added card from ${pile} pile`;
    this._players[player].addCard(value);
    this._players[player].appendCardToElement(value);
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
  }
  get hand() {
    return this._hand;
  }
  get element() {
    return this._element;
  }
  appendCardToElement(text) {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = text;
    this._element.appendChild(newDiv);
  }
}

const board = new Board(
  document.getElementById("main_pile"),
  document.getElementById("discard_pile")
);

const tens = new Game(board);
