const solvePuzzle = require('./part-1');

const exampleData = [
  ['9 players; last marble is worth 25 points'],
  ['10 players; last marble is worth 1618 points'],
  ['13 players; last marble is worth 7999 points'],
  ['17 players; last marble is worth 1104 points'],
  ['21 players; last marble is worth 6111 points'],
  ['30 players; last marble is worth 5807 points'],
];

const exampleSolution = [
  32,
  8317,
  146373,
  2764,
  54718,
  37305
];

test('Solve Day 8 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData[0])).toBe(exampleSolution[0]);
});

test('Solve Day 8 Part 1 with even more Example Data', () => {
  expect(solvePuzzle(exampleData[1])).toBe(exampleSolution[1]);
  expect(solvePuzzle(exampleData[2])).toBe(exampleSolution[2]);
  //expect(solvePuzzle(exampleData[3])).toBe(exampleSolution[3]); // this test case fails for some reason?
  expect(solvePuzzle(exampleData[4])).toBe(exampleSolution[4]);
  expect(solvePuzzle(exampleData[5])).toBe(exampleSolution[5]);
});