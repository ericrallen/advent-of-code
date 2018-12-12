const solvePuzzle = require('./part-1');

const exampleData = [
'initial state: #..#.#..##......###...###',
'',
'...## => #',
'..#.. => #',
'.#... => #',
'.#.#. => #',
'.#.## => #',
'.##.. => #',
'.#### => #',
'#.#.# => #',
'#.### => #',
'##.#. => #',
'##.## => #',
'###.. => #',
'###.# => #',
'####. => #',
];

const exampleSolution = 325;

test('Solve Day 10 Part 1 with Example Data', () => {
  expect(solvePuzzle(exampleData)).toBe(exampleSolution);
});