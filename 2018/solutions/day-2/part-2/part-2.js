const Solution = require('../../../utils/solution.class');

const day = 2;

const dayTwoPartTwo = new Solution({ day });

dayTwoPartTwo.data.then((data) => {
  const foundIds = [];

  console.log('Processing data...');

  data.some((firstId) => {
    return data.some((secondId) => {
      if (firstId !== secondId) {
        const firstIdArray = firstId.split('');
        const secondIdArray = secondId.split('');

        let mismatches = 0;

        firstIdArray.forEach((character, index) => {
          if (character !== secondIdArray[index]) {
            mismatches++;
          }

          return true;
        });

        if (mismatches === 1) {
          foundIds.push(firstId, secondId);

          return true;
        }
      }

      return false;
    });
  });

  const secondIdArray = foundIds[1].split('');

  const matching = foundIds[0].split('').filter((character, index) => secondIdArray[index] === character).join('');

  console.log('MATCHING CHARACTERS:', matching);

  process.exit(0);
});
