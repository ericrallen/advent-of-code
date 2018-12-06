function solvePuzzle(data) {
  let minimumX;
  let minimumY;
  let maximumX;
  let maximumY;

  const checkMaxandMin = (x, y) => {
    if (typeof minimumX === 'undefined' || minimumX > x) {
      minimumX = x;
    }

    if (typeof minimumY === 'undefined' || minimumY > y) {
      minimumY = y;
    }

    if (typeof maximumX === 'undefined' || maximumX < x) {
      maximumX = x;
    }

    if (typeof maximumY === 'undefined' || maximumY < y) {
      maximumY = y;
    }
  };

  const calculateDistanceBetweenCoordinates = (pointA, pointB) => {
    return Math.abs(pointA.x - pointB.x) + Math.abs(pointA.y - pointB.y)
  };

  const coordinates = data.reduce((coordinateMap, point, id) => {
    const [x, y] = point.split(', ');

    const intX = parseInt(x, 10);
    const intY = parseInt(y, 10);

    checkMaxandMin(intX, intY);

    coordinateMap[id] = {
      x: intX,
      y: intY,
    };

    return coordinateMap;
  }, {});

  const grid = {};

  for (let x = minimumX; x < maximumX; x++) {
    for (let y = minimumY; y < maximumY; y++) {
      const distances = Object.entries(coordinates).map(([id, position ]) => {
        const distance = calculateDistanceBetweenCoordinates({ x, y }, position);

        return {
          id,
          distance,
        };
      });

      const sortedDistances = distances.sort((a, b) => a.distance - b.distance);

      grid[`${x},${y}`] = (sortedDistances[0].distance === sortedDistances[1].distance) ? null : sortedDistances[0].id;
    }
  }

  const cellCounts = Object.entries(grid).reduce((cellCountObject, [ cellId, coordinateId ]) => {
    if (coordinateId !== null) {
      cellCountObject[coordinateId] = (cellCountObject[coordinateId] || 0) + 1; 
    }

    return cellCountObject;
  }, {});

  const cellWithMostSpace = Object.keys(cellCounts).sort((a, b) => cellCounts[b] - cellCounts[a])[0];

  return cellCounts[cellWithMostSpace];
}

module.exports = solvePuzzle;
