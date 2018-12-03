const Solution = require('../../../utils/solution.class');

const day = 3;
const part = 1;

const puzzle = new Solution({ day, part });

// resolve the Promise our Solution class has for it's `data` getter function
puzzle.data.then((data) => {
  const claimRegEx = /#(\d+)\s@\s(\d+,\d+):\s(\d+x\d+)/;

  const inRange = (value, min, max) => {
    return (value >= min && value <= max);
  }

  const doesOverlap = (rectangleA, rectangleB) => {
    const xOverlap = inRange(rectangleB[1], rectangleA[1], rectangleA[3]);
    const yOverlap = inRange(rectangleB[2], rectangleA[2], rectangleA[4]);

    if (xOverlap && yOverlap) {
      return true;
    }

    return false;
  }

  const formattedClaims = data
    .map((claim) => {
      const [ originalClaim, id, startingCoordinates, dimensions ] = claimRegEx.exec(claim);

      const [ xString, yString ] = startingCoordinates.split(',');

      const [ widthString, heightString ] = dimensions.split('x');

      const x = parseInt(xString, 10);
      const y = parseInt(yString, 10);
      const width = parseInt(widthString, 10);
      const height = parseInt(heightString, 10);

      return [id, x, y, x + width, y + height];
    })
  ;

  const test = formattedClaims
    .map((claim) => {
      const overlaps = [];

      formattedClaims.forEach((testClaim) => {
        if (claim[0] !== testClaim[0]) {
          if (doesOverlap(claim, testClaim)) {
            overlaps.push(claim, testClaim);
          }
        }
      });

      return overlaps;
    })
    .filter(overlaps => overlaps.length)
    // TODO: get difference between overlaps B.start and A.end for x and y
    //        then multiply the x overlap by the y overlap to get the square
    //        inches of overlap and then add all the overlapping square inches
  ;

  console.log('OVERLAPS:', test);

  process.exit(0);
});
