// this is gross, and slow, and sad and I hate it, but it works and I haven't had
// time for refactoring

function solvePuzzle(serialNumber) {
  const subGridPowerLevels = {};

  const calculatePowerLevel = (x, y) => {
    const rackId = x + 10;
    const initialPowerLevel = rackId * y;
    const increasedPowerLevel = initialPowerLevel + serialNumber;
    const newPowerLevel = increasedPowerLevel * rackId;
    const stringPowerLevel = newPowerLevel.toString();
    const hundredsDigit = stringPowerLevel[stringPowerLevel.length - 3] || '0';

    let keptPower = parseInt(hundredsDigit, 10);

    if (isNaN(keptPower)) {
      keptPower = 0;
    }

    const realPowerLevel = keptPower - 5;

    return realPowerLevel;
  };

  const generateGrid = () => {
    const cells = 300;

    let grid = [];

    for (let y = 0; y < cells; y++) {
      grid[y] = [];

      for (let x = 0; x < cells; x++) {
        grid[y].push(calculatePowerLevel(x, y));
      }
    }
  
    return grid;
  }

  const findHighPoweredGrid = (powerGrid) => {
    const minCellsToCheck = 1;
    const maxCellsToCheck = 25; // making some assumptions about the size of the grid

    for (let cellsToCheck = minCellsToCheck; cellsToCheck < maxCellsToCheck; cellsToCheck++) {
      for (let startY = 0; startY < powerGrid.length - cellsToCheck; startY++) {
        for (let startX = 0; startX < powerGrid.length - cellsToCheck; startX++) {
          const subGrid = [];

          for (let y = startY; y < startY + cellsToCheck && y < powerGrid.length; y++) {
            for (let x = startX; x < startX + cellsToCheck && x < powerGrid.length; x++) {
              subGrid.push(powerGrid[y][x]);
            }
          }

          subGridPowerLevels[`${startX},${startY},${cellsToCheck}`] = subGrid.reduce((subGridPowerTotal, subGridPowerLevel) => subGridPowerTotal + subGridPowerLevel, 0);
        }
      }
    }
  };

  const grid = generateGrid();

  findHighPoweredGrid(grid);

  return Object.entries(subGridPowerLevels).sort((a, b) => b[1] - a[1]).shift()[0];
}

module.exports = solvePuzzle;
