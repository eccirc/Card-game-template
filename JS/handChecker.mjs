export class RummyRulesBasic {
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
    return this.checkIfThree(arr) && this.checkIfValMatch(arr, value);
  }
  checkIsValidRun(arr, valueName, valueSeq) {
    return (
      this.checkIfThree(arr) &&
      this.checkIfValMatch(arr, valueName) &&
      this.checkIfSeq(arr, valueSeq)
    );
  }
}
