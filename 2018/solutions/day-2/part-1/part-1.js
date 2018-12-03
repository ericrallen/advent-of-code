const Solution = require('../../../utils/solution.class');

const day = 2;
const part = 1;

const puzzle = new Solution({ day });

// resolve the Promise our Solution class has for it's `data` getter function
puzzle.data.then((data) => {
  console.log(`Advent of Code 2018 Day ${day}: Part ${part}`);
  console.log('Processing data...');

  // we'll store the IDs we find that have repeating characters in these Arrays
  // so that we can easily get the counts and multiply them to generate the
  // "checksum" that this puzzle calls for
  const idsWithTwoRepeats = [];
  const idsWithThreeRepeats = [];

  data
    // first let's iterate through and replace each ID with an Object that has
    // both the ID and an Object with each character and the number of times it
    // appears in the string
    .map((id) => {
      // we'll use this for generating our character count Object
      const characterArray = id.split('');

      // we're leveraging reduce here as a simple way to accumulate an Object
      // with the counts for each character
      const counts = characterArray.reduce((countObject, character) => {
        // if this character has already been counted
        if (countObject[character]) {
          // increment its count
          countObject[character] = countObject[character] + 1;
        // if this is a new character
        } else {
          // start counting
          countObject[character] = 1;
        }

        return countObject;
      }, {});

      return {
        id,
        counts
      };
    })
    // iterate over our new ID Array
    .forEach(({ id, counts }) => {
      // check to see if there are items with a character repeated two times
      const hasTwoRepeats = Object.entries(counts).some(([character, count]) => count === 2);

      // check to see if there are items with a character repeated three times
      const hasThreeRepeats = Object.entries(counts).some(([character, count]) => count === 3);

      // if we have repeats, insert those ids into the respective Array for the
      // number of repeats
      if (hasTwoRepeats) {
        idsWithTwoRepeats.push(id);
      }

      if (hasThreeRepeats) {
        idsWithThreeRepeats.push(id);
      }
    })
  ;

  // generate and display our checksum
  const checksum = idsWithTwoRepeats.length * idsWithThreeRepeats.length;

  const displayCheckSumMath = `${idsWithTwoRepeats.length} * ${idsWithThreeRepeats.length} = ${checksum}`;

  console.log('CHECKSUM:', displayCheckSumMath);

  process.exit(0);
});
