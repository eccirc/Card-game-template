import { cards } from "./cards.mjs";
import { Player } from "./player.mjs";
import { Deck } from "./deck.mjs";
import { cardsHeld as cardPile } from "./heldCards.mjs";

class Game {
  constructor() {
    this._deck = new Deck(cards);
    this._shuffled = [];
    this._turn = 0;
    this._currentSuit = null;
    this._gameDisplay = document.getElementById("game_display");
    this._players = {
      player1: new Player(
        new cardPile("Player_1", document.getElementById("player_1_cards")),
        document.getElementById("p1_score"),
        document.getElementById("player_1_message")
      ),
      player2: new Player(
        new cardPile("Player_2", document.getElementById("player_2_cards")),
        document.getElementById("p2_score"),
        document.getElementById("player_2_message")
      ),
    };
    this._playArea = {
      mainDeck: new cardPile("main deck", document.getElementById("main_pile")),
      discardPile: new cardPile(
        "discard pile",
        document.getElementById("played_pile")
      ),
    };
    this._curentPlayer = null;
  }
  startGame() {
    this.populateShuffledDeck(this._deck.cardsShuffled());
    this._players.player1.leading = true;
    this.dealCards(10, this._players.player1.hand);
    this.dealCards(10, this._players.player2.hand);
    this.gameTurnChecker();
  }

  creatCardDownDiv(index) {
    const element = document.createElement("div");
    element.classList.add("card", "card--main", "black");
    element.innerHTML = "🂠";
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
  handChecker(playerHand, suit) {
    const testArr = playerHand.hand.hand.map((item) => {
      return item.suit === suit;
    });
    return testArr.includes(true);
  }

  innerFunction(deckFrom, event) {
    const cardObj = deckFrom.hand.hand.filter(
      (item) => item.div.innerHTML === event.target.innerHTML
    )[0];

    //LEADING PLAYER
    if (deckFrom.leading) {
      this._gameDisplay.innerHTML = `Played Suit: ${cardObj.suit}`;
      this._currentSuit = cardObj.suit;
    }
    if (
      !deckFrom.leading &&
      cardObj.suit !== this._currentSuit &&
      this.handChecker(deckFrom, this._currentSuit)
    ) {
      deckFrom.messageDiv.innerHTML = "Select a card of the same suit";
    } else {
      deckFrom.messageDiv.innerHTML = "";
      deckFrom.hand.hand.splice(deckFrom.hand.hand.indexOf(cardObj), 1);
      deckFrom.hand.element.removeChild(cardObj.div);
      this._playArea.discardPile.addCard(cardObj);
      deckFrom.cardPlayed = cardObj;
      this._turn++;
      this.gameTurnChecker();
    }
  }

  addPlayerPileListener(deckFrom) {
    deckFrom.hand.element.addEventListener("click", (event) => {
      this.innerFunction(deckFrom, event);
    });
  }

  gameTurnChecker() {
    const message = "Your turn, select a card to play";
    const player1 = this._players.player1;
    const player2 = this._players.player2;
    let current = this._curentPlayer;

    if (this._turn % 2 === 0) {
      current = this._players.player1;
      current.hand.element.classList.innerHTML = "";
    } else current = this._players.player2;

    this.addPlayerPileListener(current);

    if (this._players.player1.cardPlayed && this._players.player2.cardPlayed) {
      if (player1.cardPlayed.order > player2.cardPlayed.order) {
        console.log("player 1 wins");
        this._gameDisplay.innerHTML = "Player 1 takes";
        this._players.player1.score++;
        this._players.player1.scoreDiv.innerHTML = `Tricks this round: ${this._players.player1.score}`;
        this._players.player2.leading = false;
        this._players.player1.leading = true;
      } else if (player2.cardPlayed.order > player1.cardPlayed.order) {
        console.log("player 2 wins");
        this._gameDisplay.innerHTML = "Player 2 takes";
        this._players.player2.score++;
        this._players.player2.scoreDiv.innerHTML = `Tricks this round: ${this._players.player2.score}`;
        this._players.player1.leading = false;
        this._players.player2.leading = true;
      }
      setTimeout(() => this.resetCards(), 2000);
    }
    if (player1.leading) {
      player1.messageDiv.innerHTML = message;
      player2.messageDiv.innerHTML = "";
    } else if (player2.leading) {
      player2.messageDiv.innerHTML = message;
      player1.messageDiv.innerHTML = "";
    }
  }
  checkIsSuitMatch() {
    const playersArr = Object.entries(this._players);
    const defendingPlayer = playersArr.filter((player) => {
      if (!player[1].leading) return player;
    });
    return defendingPlayer[0][1].cardPlayed.suit === this._currentSuit;
  }
  resetCards() {
    this._playArea.discardPile.element.innerHTML = "";
    this._players.player1.cardPlayed = null;
    this._players.player2.cardPlayed = null;
  }

  addCardToDeck(deckFrom) {
    const cardObj = deckFrom.pop();
    const element = cardObj.div;
    element.style.transform = "translateX(0) translateY(0)";
    element.innerHTML = cardObj.symbol;
    element.classList.remove("card--main", "black");
    element.classList.add(cardObj.colour);
    element.classList.remove("card--main");
    return cardObj;
    //[deckTo].addCard(cardObj);
  }
}

const tens = new Game(board);
tens.startGame();
