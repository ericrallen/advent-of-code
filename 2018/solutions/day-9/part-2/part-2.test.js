const solvePuzzle = require('./part-2');

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
  expect(solvePuzzle(exampleData[0], true)).toBe(exampleSolution[0]);
});
