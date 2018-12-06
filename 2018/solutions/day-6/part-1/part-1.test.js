const solvePuzzle = require('./part-1');

const exampleData = ['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'];
const exampleSolution = 17;

test('Solve Day 6 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData)).toBe(exampleSolution);
});