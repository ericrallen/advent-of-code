const solvePuzzle = require('./part-2');

const exampleData = [
  'Step F must be finished before step E can begin.',
  'Step C must be finished before step A can begin.',
  'Step C must be finished before step F can begin.',
  'Step A must be finished before step D can begin.',
  'Step B must be finished before step E can begin.',
  'Step D must be finished before step E can begin.',
  'Step A must be finished before step B can begin.',
];

const exampleSolution = 15;

test('Solve Day 7 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData, 2, 0)).toBe(exampleSolution);
});