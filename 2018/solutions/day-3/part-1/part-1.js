const Solution = require('../../../utils/solution.class');

const day = 3;
const part = 1;

const puzzle = new Solution({ day, part });

// resolve the Promise our Solution class has for it's `data` getter function
puzzle.data.then((data) => {
  // our "claims" are in the following format `#1 @ 1,1 1x1`
  const claimRegEx = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/;

  // we'll use this to keep track of what coordinates already hit
  const overlapMap = {};

  // first let's take that awful data and put it in a format we can work with
  const formattedClaims = data.map((claim) => {
    // get the bits from our claim string by using our RegEx above
    const [ originalClaim, id, xString, yString, widthString, heightString ] = claimRegEx.exec(claim);

    // all the data we're reading in are Strings, so let's make them Integers real quick
    const x = parseInt(xString, 10);
    const y = parseInt(yString, 10);
    const width = parseInt(widthString, 10);
    const height = parseInt(heightString, 10);

    return {
      id,
      start: {
        x,
        y,
      },
      end: {
        x: x + width,
        y: y + height
      }
    };
  });

  // iterate through our rectangles
  formattedClaims.forEach((claim) => {
    const {
      start: {
        x: startX,
        y: startY,
      },
      end: {
        x: endX,
        y: endY,
      },
    } = claim;

    // move through each set of x,y coordinates in this rectangle
    for (let x = startX; x < endX; x++) {
      for( let y = startY; y < endY; y++) {
        // we're going to use `x,y` as our keys for keeping track of coordinate hits
        const key = `${x},${y}`;

        // keep track of how many times we've hit these coordinates
        let hits = overlapMap[key] || 0;

        // increment out hit count for these coordinates
        overlapMap[key] = hits + 1;
      }
    }
  });

  //remove any coordinates that we've only hit once and then we're left with the
  const overlaps = Object.values(overlapMap).filter(hits => hits > 1).length;

  console.log('OVERLAPPING AREA:', overlaps);

  process.exit(0);
});
