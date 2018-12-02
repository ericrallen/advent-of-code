const Solution = require('../../../utils/solution.class');

const day = 1;

const dayOnePartOne = new Solution({ day });

dayOnePartOne.data.then((data) => {
  let frequencies = [0];

  let foundFrequency;

  const iterateThroughFrequencies = (changes) => {
    changes.some((change) => {
      const changeAmount = parseInt(change.trim(), 10);

      const lastFrequency = frequencies[frequencies.length - 1];

      let frequency = lastFrequency + changeAmount;

      if (frequencies.indexOf(frequency) !== -1) {
        foundFrequency = frequency;

        return true;
      } else {
        frequencies.push(frequency);

        return false;
      }
    });
  };

  console.log('Processing data...');

  while (!foundFrequency) {
    iterateThroughFrequencies(data);
  }

  console.log('FREQUENCY:', foundFrequency);

  process.exit(0);
});
