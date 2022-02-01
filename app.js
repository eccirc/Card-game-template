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

class Player {
  constructor(name) {
    this._name = name;
    this._hand = [];
  }
}

class Board {
  constructor(remaining, discarded) {
    this._remaining = remaining;
    this._discarded = discarded;
  }
}

class Game {
  constructor(board) {
    this._board = board;
    this._players = {
        player1 = new Player("Player 1"),
        player2 = new Player("Player 2")
    };
  }
}
