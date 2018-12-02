const fs = require('fs');
const path = require('path');
const readline = require('readline');

const STARTING_FREQUENCY = 0;

const INPUT_DATA_PATH = path.resolve(__dirname, '../../data/puzzle-1.dat');

let frequencies = [STARTING_FREQUENCY];

function processFrequencyChange(change) {
  const changeAmount = parseInt(change.trim(), 10);

  const lastFrequency = frequencies[frequencies.length - 1];

  let frequency = lastFrequency + changeAmount;

  if (frequencies.indexOf(frequency) !== -1) { 
    frequencies.push(frequency);

    finishProcess(true);
  } else {
    frequencies.push(frequency);
  }
}

function getFinalFrequency() {
  return frequencies[frequencies.length - 1];
}

function displayFinalFrequency() {
  console.log('FREQUENCY:', getFinalFrequency());
}

function finishProcess(duplicateFound = false) {
  if (duplicateFound) {
    displayFinalFrequency();

    process.exit(0);
  } else {
    round++;

    readFrequency();
  }
}

function readFrequency() {
  const read = readline.createInterface({
    input: fs.createReadStream(INPUT_DATA_PATH),
  });

  read
    .on('line', processFrequencyChange)
    .on('close', finishProcess)
  ;
}

console.log('Processing data...');

readFrequency();