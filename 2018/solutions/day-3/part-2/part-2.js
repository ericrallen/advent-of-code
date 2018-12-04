const Solution = require('../../../utils/solution.class');

const day = 3;
const part = 2;

const puzzle = new Solution({ day, part });

// resolve the Promise our Solution class has for it's `data` getter function
puzzle.data.then((data) => {
  // our "claims" are in the following format `#1 @ 1,1 1x1`
  const claimRegEx = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/;

  // check to see if rectangles overlap
  const doesOverlap = (rectangleA, rectangleB) => {
    const {
      start: {
        x: aStartX,
        y: aStartY,
      },
      end: {
        x: aEndX,
        y: aEndY,
      },
    } = rectangleA;
    
    const {
      start: {
        x: bStartX,
        y: bStartY,
      },
      end: {
        x: bEndX,
        y: bEndY,
      },
    } = rectangleB;

    const xOverlap = Math.max(0, Math.min(aEndX, bEndX) - Math.max(aStartX, bStartX));
    const yOverlap = Math.max(0, Math.min(aEndY, bEndY) - Math.max(aStartY, bStartY));

    return xOverlap && yOverlap;
  };

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

  // this will store all the IDs we've found with overlaps
  const idsWithOverlaps = [];

  // iterate through our rectangles
  formattedClaims.forEach((firstClaim, firstIndex) => {
    // get the id from our current claim
    const { id: firstId } = firstClaim;

    // if we've already found that this item has an overlap, we won't test it again
    if (!idsWithOverlaps.includes(firstId)) {
      // check for doesOverlap against other claims and find the one that doesn't
      formattedClaims.forEach((secondClaim, secondIndex) => {
        // make sure we aren't comparing claims against each other
        if (firstIndex !== secondIndex) {
          // get the id from our second claim
          const { id: secondId } = secondClaim;

          // check to see if these claims overlap
          if (doesOverlap(firstClaim, secondClaim)) {
            // if they do go ahead and stash both in our "already checked this one" Array
            idsWithOverlaps.push(firstId);
            idsWithOverlaps.push(secondId);
          }
        }
      });
    }
  });

  // get the only claim without any overlaps
  const orphanClaim = formattedClaims
    .map(({ id }) => id)
    .filter((id) => !idsWithOverlaps.includes(id))
  ;

  console.log('NO OVERLAPS:', orphanClaim);

  process.exit(0);
});
