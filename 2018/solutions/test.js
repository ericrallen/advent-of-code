const Solution = require('../utils/solution.class');

class TestSolution extends Solution {
  test() {
    console.log(this.inputArray);
  }
}

const test = new TestSolution({
  inputPath: '../inputs/',
  day: 1,
});

test.data.then((data) => {
  console.log(data);
});
