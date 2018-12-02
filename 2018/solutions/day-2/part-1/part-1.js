const Solution = require('../../../utils/solution.class');

const day = 2;

const dayTwoPartOne = new Solution({ day });

function getCharacterCounts(ids) {
  return ids.map((id) => {
    const characterArray = id.split('');

    const counts = characterArray.reduce((countObject, character) => {
      if (countObject[character]) {
        countObject[character] = countObject[character] + 1;
      } else {
        countObject[character] = 1;
      }

      return countObject;
    }, {});

    return {
      id,
      counts
    };
  });
}

dayTwoPartOne.data.then((data) => {
  const idsWithTwoRepeats = [];
  const idsWithThreeRepeats = [];

  console.log('Processing data...');

  getCharacterCounts(data).forEach(({ id, counts }) => {
    const hasTwoRepeats = Object.entries(counts).filter(([character, count]) => count === 2).length >= 1;
    const hasThreeRepeats = Object.entries(counts).filter(([character, count]) => count === 3).length >= 1;

    if (hasTwoRepeats) {
      idsWithTwoRepeats.push(id);
    }

    if (hasThreeRepeats) {
      idsWithThreeRepeats.push(id);
    }
  });

  const result = idsWithTwoRepeats.length * idsWithThreeRepeats.length;
  
  const displayCheckSumMath = `${idsWithTwoRepeats.length} * ${idsWithThreeRepeats.length} = ${result}`;

  console.log('CHECKSUM:', displayCheckSumMath);

  process.exit(0);
});
