function solvePuzzle(data, maximumDistanceToRegions = 10000) {
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

  const map = {};

  for (let x = minimumX; x < maximumX; x++) {
    for (let y = minimumY; y < maximumY; y++) {
      const distances = Object.entries(coordinates).map(([id, position ]) => {
        const distance = calculateDistanceBetweenCoordinates({ x, y }, position);

        return {
          id,
          distance,
        };
      });

      const totalDistanceToRegions = distances.reduce((totalDistance, { distance }) => {
        return totalDistance + distance;
      }, 0);

      map[`${x},${y}`] = (totalDistanceToRegions < maximumDistanceToRegions) ? totalDistanceToRegions : null;
    }
  }

  /*const mappedGrid = [];

  for(let y = minimumY; y < maximumY; y++) {
    const row = [];

    for (let x = minimumX; x < maximumX; x++) {
      row.push('X');
    }

    mappedGrid.push(row);
  }*/

  return Object.entries(map).reduce((sizeOfRegion, [ position, distanceToRegions ]) => {
    if (distanceToRegions !== null) {
      sizeOfRegion++;
    }

    return sizeOfRegion;
  }, 0);
}

module.exports = solvePuzzle;
