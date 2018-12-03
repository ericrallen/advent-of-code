const Solution = require('../../../utils/solution.class');

const day = 1;
const part = 2;

const puzzle = new Solution({ day, part });

// resolve the Promise our Solution class has for it's `data` getter function
puzzle.data.then((data) => {
  // inspired by:  https://github.com/chrisman/advent-of-code/blob/master/2018/day/0102.js#L8
  console.time('Search Time');

  // we start with the frequency at 0
  let frequencies = [0];

  // we'll use this Boolean as a flag to let our while loop below know that we've
  // found the repeated frequency and should stop iterating
  let foundFrequency = false;

  // this function will be called until we've found our repeated frequency
  // NOTE: this is not the most performant or efficient solution
  const iterateThroughFrequencies = (changes) => {
    // the Array.some() here allows us to iterate through every item
    // but we can still short circuite the loop when we find our repeated frequency
    changes.some((change) => {
      // get the previously generated frequency, as that's what we'll be making
      // our adjustment to
      const lastFrequency = frequencies[frequencies.length - 1];

      // parse the adjustment and add it to the previous frequency
      let frequency = lastFrequency + parseInt(change.trim(), 10);

      // if we have already generated this frequency
      if (frequencies.indexOf(frequency) !== -1) {
        // save the repeated frequency
        foundFrequency = frequency;

        // short circuit our Array.some()
        return true;
      // if this is a new frequency
      } else {
        // add it to the frequencies Array so we can use it for the next iteration
        frequencies.push(frequency);

        // continue execution of the Array.some()
        return false;
      }
    });
  };

  // keep checking until we find our repeated frequency
  while (!foundFrequency) {
    iterateThroughFrequencies(data);
  }

  console.log('FREQUENCY:', foundFrequency);

  console.timeEnd('Search Time');

  process.exit(0);
});
