const Solution = require('../../../utils/solution.class');

const day = 1;

const dayOnePartOne = new Solution({ day });

dayOnePartOne.data.then((data) => {
  let frequency = 0;

  console.log('Processing data...');

  data.forEach((change) => {
    const changeAmount = parseInt(change.trim(), 10);

    frequency = frequency + changeAmount;
  });

  console.log('FREQUENCY:', frequency);

  process.exit(0);
});
