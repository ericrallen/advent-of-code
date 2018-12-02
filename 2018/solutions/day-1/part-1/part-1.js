const fs = require('fs');
const path = require('path');
const readline = require('readline');

const STARTING_FREQUENCY = 0;

const INPUT_DATA_PATH = path.resolve(__dirname, '../../inputs/day-1.dat');

const read = readline.createInterface({
  input: fs.createReadStream(INPUT_DATA_PATH),
});

let frequency = STARTING_FREQUENCY;

function processFrequencyChange(change) {
  const changeAmount = parseInt(change.trim(), 10);

  frequency = frequency + changeAmount;
}

function getFinalFrequency() {
  return frequency;
}

function displayFinalFrequency() {
  console.log('FREQUENCY:', getFinalFrequency());
}

function finishProcess() {
  displayFinalFrequency();

  process.exit(0);
}

read
  .on('line', processFrequencyChange)
  .on('close', finishProcess)
;