const Solution = require('../../../utils/solution.class');

const solvePuzzle = require('./part-2');

const day = 11;
const part = 2;

const puzzle = new Solution({ day, part, download: false });

// solve using the puzzle input provided by the Day 11 page
puzzle.solve(solvePuzzle, 4172);