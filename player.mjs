export class Player {
  constructor(handArr, playedArr, buttonDiv, messageDiv) {
    this._hand = handArr;
    this._played = playedArr;
    this._tempHand = [];
    this._score = 0;
    this._hasWon = null;
    this._actions = {
      buttonDiv: buttonDiv,
      messageDiv: messageDiv,
      actionToggle: null,
    };
  }
  get hand() {
    return this._hand;
  }
  get played() {
    return this._played;
  }
  get temp() {
    return this._tempHand;
  }
  get score() {
    return this._score;
  }
  get turn() {
    return this._turn;
  }
  get actions() {
    return this._actions;
  }
  // set action() {
  //   this._actions = toggle;
  // }
  set score(amount) {
    this._score = amount;
  }
  set turn(isTurn) {
    this._turn = isTurn;
  }
  addToTemp(item) {
    this._tempHand.push(item);
  }
  resetTemp() {
    this._tempHand = [];
  }
}
