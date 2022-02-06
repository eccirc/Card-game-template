export class Player {
  constructor(handArr, playedArr, scoreDiv, messageDiv) {
    this._hand = handArr;
    this._played = playedArr;
    this._cardPlayed = null;
    this._score = 0;
    this._hasWon = null;
    this._leading = false;
    this._scoreDiv = scoreDiv;
    this._messageDiv = messageDiv;
  }
  get hand() {
    return this._hand;
  }
  get played() {
    return this._played;
  }
  get score() {
    return this._score;
  }
  get leading() {
    return this._leading;
  }
  get scoreDiv() {
    return this._scoreDiv;
  }
  get messageDiv() {
    return this._messageDiv;
  }
  get cardPlayed() {
    return this._cardPlayed;
  }
  set cardPlayed(card) {
    this._cardPlayed = card;
  }
  set leading(set) {
    this._leading = set;
  }

  set score(amount) {
    this._score = amount;
  }
}
