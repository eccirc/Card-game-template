const cardsArr = [
  { symbol: "🂢", suit: "spades", value: 2, colour: "black", name: "two" },
  { symbol: "🂣", suit: "spades", value: 3, colour: "black", name: "three" },
  { symbol: "🂤", suit: "spades", value: 4, colour: "black", name: "four" },
  { symbol: "🂥", suit: "spades", value: 5, colour: "black", name: "five" },
  { symbol: "🂦", suit: "spades", value: 6, colour: "black", name: "six" },
  { symbol: "🂧", suit: "spades", value: 7, colour: "black", name: "seven" },
  { symbol: "🂨", suit: "spades", value: 8, colour: "black", name: "eight" },
  { symbol: "🂩", suit: "spades", value: 9, colour: "black", name: "nine" },
  { symbol: "🂪", suit: "spades", value: 10, colour: "black", name: "ten" },
  { symbol: "🂫", suit: "spades", value: 10, colour: "black", name: "jack" },
  { symbol: "🂭", suit: "spades", value: 10, colour: "black", name: "queen" },
  { symbol: "🂮", suit: "spades", value: 10, colour: "black", name: "king" },
  { symbol: "🂡", suit: "spades", value: 11, colour: "black", name: "ace" },
];

const checkArr = [
  { symbol: "🂢", suit: "spades", value: 7, colour: "black", name: "two" },
  { symbol: "🂤", suit: "spades", value: 5, colour: "black", name: "four" },
  { symbol: "🂣", suit: "spades", value: 6, colour: "black", name: "three" },
];

const checkArr2 = [
  { symbol: "🂢", suit: "spades", value: 2, colour: "black", name: "two" },
  { symbol: "🂢", suit: "hearts", value: 2, colour: "black", name: "two" },
  { symbol: "🂢", suit: "diamonds", value: 2, colour: "black", name: "two" },
];

/* RUN conditions (sequence)
 - length >= 3
 - same suit
 - sequential

 SET conditions
 - length > 3
 - same name
*/
const checkIfThree = (arr) => {
  return arr.length >= 3;
};
const checkIfName = (arr, val) => {
  const check = arr.map((item) => {
    return item[val] === arr[0][val];
  });
  return !check.includes(false);
};

const checkIfSeq = (arr, value) => {
  const copy = [...arr];
  copy.sort((a, b) => a[value] - b[value]);
  for (let i = 1; i < copy.length; i++) {
    if (copy[i].value === copy[i + 1].value - 1) {
      return true;
    } else return false;
  }
};

//console.log(checkIfSeq(checkArr));

const checkIsValidSet = (arr) => {
  return checkIfThree(arr) && checkIfName(arr, "name");
};

const checkIsValidRun = (arr) => {
  return (
    checkIfThree(arr) && checkIfName(arr, "suit") && checkIfSeq(arr, "value")
  );
};

console.log(checkIsValidRun(checkArr));

class rummyRulesBasic {
  constructor() {
    this._validHand = checkIsValidRun() || checkIsValidSet();
  }

  get validHand() {
    return this._validHand;
  }

  checkIfThree(arr) {
    return arr.length >= 3;
  }
  checkIfValMatch(arr, val) {
    const check = arr.map((item) => {
      return item[val] === arr[0][val];
    });
    return !check.includes(false);
  }
  checkIfSeq(arr, value) {
    const copy = [...arr];
    copy.sort((a, b) => a[value] - b[value]);
    for (let i = 1; i < copy.length; i++) {
      if (copy[i].value === copy[i + 1].value - 1) {
        return true;
      } else return false;
    }
  }
  checkIsValidSet(arr, value) {
    return checkIfThree(arr) && checkIfName(arr, value);
  }
  checkIsValidRun(arr, valueName, valueSeq) {
    return (
      checkIfThree(arr) &&
      checkIfName(arr, valueName) &&
      checkIfSeq(arr, valueSeq)
    );
  }
}
