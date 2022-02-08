export class cardsHeld {
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
  get name() {
    return this._name;
  }
  set hand(hand) {
    this._hand = hand;
  }
  set element(element) {
    this._element = element;
  }
  addCard(cardObj) {
    this._hand.push(cardObj);
    this.appendCardToElement(cardObj.div);
  }

  appendCardToElement(cardDiv) {
    this._element.appendChild(cardDiv);
  }
}
