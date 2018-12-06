const Solution = require('../../../utils/solution.class');
const solvePuzzle = require('./part-1');

const day = 5;
const part = 1;

const puzzle = new Solution({ day, part });

puzzle.solve(solvePuzzle);
