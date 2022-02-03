const arr = [
  { num: "one" },
  { num: "two" },
  { num: "three" },
  { num: "four" },
  { num: "five" },
];

const newItem = arr.filter((item) => item.num === "one")[0];

arr.splice(arr.indexOf(newItem), 1);

//console.log(newItem);

console.log(arr);
