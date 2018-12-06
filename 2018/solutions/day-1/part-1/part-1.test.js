const solvePuzzle = require('./part-1');

const exampleData = ['+1', '-2', '+3', '+1'];
const exampleSolution = 3;

test('Solve Day 1 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData)).toBe(exampleSolution);
});