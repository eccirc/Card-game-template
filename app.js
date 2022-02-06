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
import { Deck } from "./deck.mjs";
import { cardsHeld as cardPile } from "./heldCards.mjs";

class Game {
  constructor() {
    this._deck = new Deck(cards);
    this._shuffled = [];
    this._turn = 0;
    this._currentSuit = null;
    this._gameDisplay = document.getElementById("game_display");
    this._rules = new rules();
    this._players = {
      player1: new Player(
        new cardPile("Player_1", document.getElementById("player_1_cards")),
        new cardPile(
          "Player_1_Played",
          document.getElementById("player_1_played")
        ),
        document.getElementById("p1_score"),
        document.getElementById("player_1_message")
      ),
      player2: new Player(
        new cardPile("Player_2", document.getElementById("player_2_cards")),
        new cardPile(
          "Player_2_Played",
          document.getElementById("player_2_played")
        ),
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
    this._curentPlayer = this._players.player1;
    this._opposingPlayer = this._players.player2;
  }
  startGame() {
    this.populateShuffledDeck(this._deck.cardsShuffled());
    this._players.player1.leading = true;
    this.dealCards(10, this._players.player1.hand);
    this.dealCards(10, this._players.player2.hand);
    console.log(this._gameDisplay);
    this.gameTurnChecker();
  }

  creatCardDownDiv(index) {
    const element = document.createElement("div");
    element.classList.add(`card`);
    element.classList.add(`card--main`);
    element.innerHTML = "🂠";
    //element.style.transform = `translateX(-${index}px) translateY(-${index}px)`;
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
    return playerHand.reduce((prev, next) => {
      return prev && next !== suit;
    });
  }

  addPlayerPileListener(deckTo, deckFrom) {
    let legalMove;
    deckFrom.element.addEventListener(
      "click",
      (event) => {
        const cardObj = deckFrom.hand.filter(
          (item) => item.div.innerHTML === event.target.innerHTML
        )[0];
        if (this._curentPlayer.leading) {
          this._gameDisplay.innerHTML = `Played Suit: ${cardObj.suit}`;
          this._currentSuit = cardObj.suit;
        }
        if (
          (cardObj.suit !== this._currentSuit && deckFrom.hand) ||
          !this.handChecker(deckFrom.hand, this._currentSuit)
        ) {
          console.log("oi");
          legalMove = false;
          this._opposingPlayer.messageDiv.innerHTML =
            "Select a card of the same suit";
        } else {
          legalMove = true;
          deckFrom.hand.splice(deckFrom.hand.indexOf(cardObj), 1);
          deckFrom.element.removeChild(cardObj.div);
          deckTo.addCard(cardObj);
          this._curentPlayer.cardPlayed = cardObj;
          this._opposingPlayer.messageDiv.innerHTML = "";
          this._turn++;
          this.gameTurnChecker();
        }
      },
      { once: legalMove }
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
    if (this._players.player1.cardPlayed && this._players.player2.cardPlayed) {
      if (
        this._players.player1.cardPlayed.order >
        this._players.player2.cardPlayed.order
      ) {
        console.log("player 1 wins");
        this._gameDisplay.innerHTML = "Player 1 takes";
        this._players.player1.score++;
        this._players.player1.scoreDiv.innerHTML = `This round: ${this._players.player1.score}`;
      } else {
        console.log("player 2 wins");
        this._gameDisplay.innerHTML = "Player 2 takes";
        this._players.player2.score++;
        this._players.player2.scoreDiv.innerHTML = `This round: ${this._players.player2.score}`;
      }
      setTimeout(() => this.resetCards(), 2000);
    }
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
    element.classList.add(cardObj.colour);
    element.classList.remove("card--main");
    return cardObj;
    //[deckTo].addCard(cardObj);
  }
}

const tens = new Game(board);
tens.startGame();
