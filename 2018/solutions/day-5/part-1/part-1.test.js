const Solution = require('../../../utils/solution.class');

const solvePuzzle = require('./part-1.js');

const exampleData = ['dabAcCaCBAcCcaDA'];
const exampleSolution = 'dabCBAcaDA'.length;

test('it solves the example input', () => {
  expect(solvePuzzle(exampleData)).toBe(exampleSolution);
});