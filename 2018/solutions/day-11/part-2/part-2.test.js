const solvePuzzle = require('./part-2');

const exampleData = [
  18,
  42,
];

const exampleSolution = [
  '90,269,16',
  '232,251,12',
];

test('Solve Day 10 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData[0])).toBe(exampleSolution[0]);
  expect(solvePuzzle(exampleData[1])).toBe(exampleSolution[1]);
});