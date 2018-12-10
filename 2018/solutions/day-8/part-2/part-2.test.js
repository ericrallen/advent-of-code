const solvePuzzle = require('./part-2');

const exampleData = ['2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'];

const exampleSolution = 66;

test('Solve Day 8 Part 2 with Example Data', () => {
  expect(solvePuzzle(exampleData)).toBe(exampleSolution);
});