const fs = require('fs');
const path = require('path');
const readline = require('readline');

const INPUT_DATA_PATH = path.resolve(__dirname, '../../../inputs/day-2.dat');

const containerIds = [];
const foundIds = [];

function addIdToArray(id) {
  containerIds.push(id);
}

function displayResult() {
  const secondIdArray = foundIds[1].split('');

  const matching = foundIds[0].split('').filter((character, index) => secondIdArray[index] === character).join('');

  console.log('MATCHING CHARACTERS:', matching);
}

function processIds() {
  containerIds.some((firstId) => {
    return containerIds.some((secondId) => {
      if (firstId !== secondId) {
        const firstIdArray = firstId.split('');
        const secondIdArray = secondId.split('');

        let mismatches = 0;
        let match = false;

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
