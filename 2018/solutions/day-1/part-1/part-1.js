const Solution = require('../../../utils/solution.class');

const day = 1;
const part = 1;

const puzzle = new Solution({ day, part });

// resolve the Promise our Solution class has for it's `data` getter function
puzzle.data.then((data) => {
  // we start with the frequency at 0
  let frequency = 0;

  data.forEach((change) => {
    // because the values in our data are just String representations of integers
    // prefixed with "+" or "-" we can parseInt() them to receive an Integer value
    // that we can use for math
    frequency = frequency + parseInt(change.trim(), 10);
  });

  console.log('FREQUENCY:', frequency);

  process.exit(0);
});
