function solvePuzzle(data) {
  // resolve the Promise our Solution class has for it's `data` getter function
  return data.reduce((frequency, change) => {
      // because the values in our data are just String representations of integers
      // prefixed with "+" or "-" we can parseInt() them to receive an Integer value
      // that we can use for math
      return frequency + parseInt(change.trim(), 10);
  }, 0);
}

module.exports = solvePuzzle;
