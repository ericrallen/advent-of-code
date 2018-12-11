const log = require('single-line-log').stdout;

function solvePuzzle(data, useThreshold = true, iterations = 20000) {
  console.log(iterations);
  const beaconRegEx = /^position=<\s?(-?\d+,\s+-?\d+)>\s+velocity=<\s?(-?\d+,\s+-?\d+)>$/;

  const beacons = data.map((beacon) => {
    const [ match, positionString, velocityString ] = beaconRegEx.exec(beacon);

    const [ xStart, yStart ] = positionString.split(',').map(position => parseInt(position.trim(), 10));

    const [ xVelocity, yVelocity ] = velocityString.split(',').map(velocity => parseInt(velocity.trim(), 10));

    return {
      position: {
        x: xStart,
        y: yStart,
      },
      velocity: {
        x: xVelocity,
        y: yVelocity,
      },
    };
  });

  const grid = [];
  const maxCount = iterations;
  const maxLoops = 5;
  let count = 0;
  let loops = 0;
  let startCount = 0;

  const visualization = (timeout = 1) => {
    setTimeout(() => {
      let minX = 0;
      let minY = 0;
      let maxX = 0;
      let maxY = 0;

      const currentBeacons = beacons.map((beacon) => {
        const newX = beacon.position.x + beacon.velocity.x * count;
        const newY = beacon.position.y + beacon.velocity.y * count;

        if (minX > newX) {
          minX = newX;
        }

        if (maxX < newX) {
          maxX = newX;
        }

        if (minY > newY) {
          minY = newY;
        }

        if (maxY < newY) {
          maxY = newY;
        }

        return `${newX}, ${newY}`;
      });

      const xDifference = maxX - minX;
      const yDifference = maxY - minY;

      if (useThreshold && xDifference <= 300 && yDifference <= 200 || !useThreshold) {
        startCount = count;
        timeout = 250

        for(let y = minY; y < maxY; y++) {
          grid[y] = [];

          for(let x = minX; x < maxX; x++) {
            let display = '_';

            if (currentBeacons.indexOf(`${x}, ${y}`) !== -1) {
              display = '#';
            }

            grid[y].push(display);
          }

          grid[y] = grid[y].join('');
        }

        log.clear();

        log(grid.join('\n'));
      } else {
        timeout = 1;
      }

      if (count > maxCount) {
        count = startCount;
        loops++;
      }

      if (loops < maxLoops) {
        log.clear();
        visualization(timeout)
      }

      count++;
    }, timeout);

    log.clear();
  };

  visualization();

  log.clear();

  return true;
}

module.exports = solvePuzzle;
