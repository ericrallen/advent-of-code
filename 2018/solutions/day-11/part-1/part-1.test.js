const solvePuzzle = require('./part-1');

const exampleData = [
  18,
  42,
];

const exampleSolution = [
  '33,45',
  '21,61',
];

test('Solve Day 10 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData[0])).toBe(exampleSolution[0]);
  expect(solvePuzzle(exampleData[1])).toBe(exampleSolution[1]);
});