const solvePuzzle = require('./part-1.js');

const exampleData = ['dabAcCaCBAcCcaDA'];
const exampleSolution = 'dabCBAcaDA'.length;

test('Solve Day 5 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData)).toBe(exampleSolution);
});