const Solution = require('../../../utils/solution.class');

const day = 3;
const part = 1;

const puzzle = new Solution({ day, part });

// resolve the Promise our Solution class has for it's `data` getter function
puzzle.data.then((data) => {
  const foundOverlaps = [];

  const claimRegEx = /#(\d+)\s@\s(\d+,\d+):\s(\d+x\d+)/;

  const doesOverlap = (rectangleA, rectangleB, calculate = false) => {
    const [ aId, aStartX, aStartY, aEndX, aEndY ] = rectangleA;
    const [ bId, bStartX, bStartY, bEndX, bEndY ] = rectangleB;

    const xOverlap = Math.max(0, Math.min(aEndX, bEndX) - Math.max(aStartX, bStartX));
    const yOverlap = Math.max(0, Math.min(aEndY, bEndY) - Math.max(aStartY, bStartY));

    if (calculate) {
      foundOverlaps.push(`#${aId}|${bId}`);

      return xOverlap * yOverlap;
    }

    return xOverlap && yOverlap;
  };

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

  const overlappingArea = formattedClaims
    .reduce((totalArea, claim) => {
      // FIXME: need to account for multiple overlaps, probably need an entirely new approach
      totalArea += formattedClaims.reduce((area, testClaim) => {
        const checkForPreviouslyFoundOverlap = `#${testClaim[0]}|${claim[0]}`;

        if (claim[0] !== testClaim[0] && doesOverlap(claim, testClaim) && foundOverlaps.indexOf(checkForPreviouslyFoundOverlap) === -1) {
          area = area + doesOverlap(claim, testClaim, true);
        }

        return area;
      }, 0);

      return totalArea;
    }, 0)
  ;

  console.log('OVERLAPPING AREA:', overlappingArea);

  process.exit(0);
});
