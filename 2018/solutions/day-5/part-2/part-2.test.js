const solvePuzzle = require('./part-2.js');

const exampleData = ['dabAcCaCBAcCcaDA'];
const exampleSolution = 'daDA'.length;

test('Day 5 Part 2: Get Correct Polymer Length: Removing Unit A', () => {
  expect(solvePuzzle(exampleData, 'A')).toBe('dbCBcD'.length);
});

test('Day 5 Part 2: Get Correct Polymer Length: Removing Unit B', () => {
  expect(solvePuzzle(exampleData, 'B')).toBe('daCAcaDA'.length);
});

test('Day 5 Part 2: Get Correct Polymer Length: Removing Unit C', () => {
  expect(solvePuzzle(exampleData, 'C')).toBe('daDA'.length);
});

test('Day 5 Part 2: Get Correct Polymer Length: Removing Unit D', () => {
  expect(solvePuzzle(exampleData, 'D')).toBe('abCBAc'.length);
});

test('Solve Day 5 Part 2 with Example Data', () => {
  expect(solvePuzzle(exampleData)).toBe(exampleSolution);
});