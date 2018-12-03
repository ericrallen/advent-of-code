const Solution = require('../../../utils/solution.class');

const day = 2;
const part = 2;

const puzzle = new Solution({ day, part });

puzzle.data.then((data) => {
  // we'll use this to store the IDs we find that only differ by one character
  let matchingCharacters = '';

  // we're using an Array.some() here so we can short circuit the loop as soon
  // as we find our nearly matched IDs
  data.some((firstId) => {
    // we're using another nested Array.some() to compare the first ID to the rest
    // of the IDs in the group
    return data.some((secondId) => {
      // reset our String of matching characters so we can start fresh
      matchingCharacters = '';

      // we'll want to ignore the ID we're already looking at, so let's make
      // sure they don't match
      if (firstId !== secondId) {
        // we'll use this to keep track of how many characters in the two
        // IDs do not match up
        let mismatches = 0;

        // iterate through the characters of the first ID
        firstId.split('').every((character, index) => {
          // if this character doesn't match the same character in the second ID
          if (character !== secondId[index]) {
            // increment our mismatches
            mismatches++;

            // if we've found more than 1 mismatch, short circuit the Array.every()
            if (mismatches > 1) {
              return false;
            }
          // if the characters match
          } else {
            // add the new character to our String of matching characters
            matchingCharacters += character;
          }

          // otherwise keep iterating until we find too many mismatches or
          // finish comparing the two IDs
          return true;
        });

        // if we have only found 1 mismatch
        if (mismatches === 1) {
          // short circuit our Array.some() because we've found our
          // nearly matching IDs and can stop iterating
          return true;
        }
      }

      // continue execution of our Array.some()
      return false;
    });
  });

  console.log('MATCHING CHARACTERS:', matchingCharacters);

  process.exit(0);
});
