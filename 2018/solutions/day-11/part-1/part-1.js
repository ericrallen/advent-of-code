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
    const cellsToCheck = 3;

    for (let startY = 0; startY < powerGrid.length - cellsToCheck; startY++) {
      for (let startX = 0; startX < powerGrid.length - cellsToCheck; startX++) {
        const subGrid = [];

        for (let y = startY; y < startY + cellsToCheck && y < powerGrid.length; y++) {
          for (let x = startX; x < startX + cellsToCheck && x < powerGrid.length; x++) {
            subGrid.push(powerGrid[y][x]);
          }
        }

        subGridPowerLevels[`${startX},${startY}`] = subGrid.reduce((subGridPowerTotal, subGridPowerLevel) => subGridPowerTotal + subGridPowerLevel, 0);
      }
    }
  };

  const grid = generateGrid();

  findHighPoweredGrid(grid);

  return Object.entries(subGridPowerLevels).sort((a, b) => b[1] - a[1]).shift()[0];
}

module.exports = solvePuzzle;
