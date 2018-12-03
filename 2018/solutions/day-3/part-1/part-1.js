const Solution = require('../../../utils/solution.class');

const day = 3;
const part = 1;

const puzzle = new Solution({ day, part });

// resolve the Promise our Solution class has for it's `data` getter function
puzzle.data.then((data) => {
  console.log(data);

  process.exit(0);
});
