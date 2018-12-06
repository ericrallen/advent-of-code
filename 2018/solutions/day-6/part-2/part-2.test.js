const solvePuzzle = require('./part-2');

const exampleData = ['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'];
const exampleSolution = 16;
const exampleMaximumDistanceToRegions = 32;

test('Solve Day 6 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData, exampleMaximumDistanceToRegions)).toBe(exampleSolution);
});