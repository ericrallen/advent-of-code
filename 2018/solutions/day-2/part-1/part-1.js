const fs = require('fs');
const path = require('path');
const readline = require('readline');

const INPUT_DATA_PATH = path.resolve(__dirname, '../../../inputs/day-2.dat');

const containerIds = [];

const idsWithTwoRepeats = [];
const idsWithThreeRepeats = [];

function addIdToArray(id) {
  containerIds.push(id);
}

function getCharacterCounts() {
  return containerIds.map((id) => {
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

function displayResult() {
  const result = idsWithTwoRepeats.length * idsWithThreeRepeats.length;

  const displayCheckSumMath = `${idsWithTwoRepeats.length} * ${idsWithThreeRepeats.length} = ${result}`;

  console.log('CHECKSUM:', displayCheckSumMath);
}

function processIds() {
  const idsWithCharacterCounts = getCharacterCounts();

  idsWithCharacterCounts.forEach(({ id, counts }) => {
    const hasTwoRepeats = Object.entries(counts).filter(([character, count]) => count === 2).length >= 1;
    const hasThreeRepeats = Object.entries(counts).filter(([character, count]) => count === 3).length >= 1;

    if (hasTwoRepeats) {
      idsWithTwoRepeats.push(id);
    }

    if (hasThreeRepeats) {
      idsWithThreeRepeats.push(id);
    }
  });

  displayResult();

  process.exit(0);
}

function readIds() {
  const read = readline.createInterface({
    input: fs.createReadStream(INPUT_DATA_PATH),
  });

  read
    .on('line', addIdToArray)
    .on('close', processIds)
  ;
}

readIds();
