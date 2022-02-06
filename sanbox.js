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

handChecker = (playerHand, suit) => {
  const testArr = playerHand.map((item) => {
    return item.suit === suit;
  });
  return testArr.includes(true);
};

console.log(handChecker(checkArr2, "clubs"));
