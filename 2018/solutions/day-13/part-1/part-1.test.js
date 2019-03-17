const solvePuzzle = require('./part-1');

const exampleData = [
'/->-\\        ',
'|   |  /----\\',
'| /-+--+-\\  |',
'| | |  | v  |',
'\\-+-/  \\-+--/',
'  \\------/   ',
];

const exampleData2 = [
  '/---\\        ',
  '|   |  /---<\\',
  '| /-+>-+-\  |',
  '| | |  | |  |',
  '\\-+-/  \\-+--/',
  '  \\------/   ',
];

const exampleSolution = '7,3';

test('Solve Day 13 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData)).toBe(exampleSolution);
});