const DEBUG = false; // set this to true to see the generated grid for each tick

const cartUp = '^';
const cartDown = 'v';
const cartLeft = '<';
const cartRight = '>';

const trackHorizontal = '-';
const trackVertical = '|';

const turnTopLeftBottomRight = '/';
const turnTopRightBottomLeft = '\\';

const trackIntersection = '+';

const cartSymbols = [cartUp, cartDown, cartLeft, cartRight];
const turnSymbols = [turnTopLeftBottomRight, turnTopRightBottomLeft];

const intersectionTurnOrder = ['left', 'straight', 'right'];

function solvePuzzle(data) {
  const carts = [];

  let crashSite;

  class Cart {
    constructor(xPosition, yPosition, direction) {
      this.x = xPosition;
      this.y = yPosition;
      this.intersectionAction = 0;
      this.direction = direction;
    }

    adjustPosition() {
      const cell = grid[this.y][this.x];

      if (cell === trackIntersection) {
        this.useIntersection();
      } else if (turnSymbols.includes(cell)) {
        this.takeTurn(cell);
      } else {
        this.forward();
      }
    }

    useIntersection() {
      const action = intersectionTurnOrder[this.intersectionAction];

      if (action === 'straight') {
        this.forward();
      } else {
        let direction;

        if (this.direction === cartUp || this.direction === cartRight) {
          direction = (action === 'left') ? turnTopLeftBottomRight : turnTopRightBottomLeft;
        } else if (this.direction === cartDown || this.direction === cartLeft) {
          direction = (action === 'left') ? turnTopRightBottomLeft : turnTopLeftBottomRight;
        }

        this.takeTurn(direction);
      }

      this.adjustIntersectionActionId();
    }

    takeTurn(turn) {
      switch (this.direction) {
        case cartUp:
          this.x = (turn === turnTopRightBottomLeft) ? this.x - 1 : this.x + 1;
          this.direction = (turn === turnTopRightBottomLeft) ? cartLeft : cartRight;

          break;
        case cartDown:
          this.x = (turn === turnTopRightBottomLeft) ? this.x + 1 : this.x - 1;
          this.direction = (turn === turnTopRightBottomLeft) ? cartRight : cartLeft;

          break;
        case cartLeft:
          this.y = (turn === turnTopRightBottomLeft) ? this.y - 1 : this.y + 1;
          this.direction = (turn === turnTopRightBottomLeft) ? cartUp : cartDown;

          break;
        case cartRight:
          this.y = (turn === turnTopRightBottomLeft) ? this.y + 1 : this.y - 1;
          this.direction = (turn === turnTopRightBottomLeft) ? cartDown : cartUp;

          break;
        default:
          break;
      }
    }

    forward() {
      switch (this.direction) {
        case cartUp:
          this.y = this.y - 1;

          break;
        case cartDown:
          this.y = this.y + 1;

          break;
        case cartLeft:
          this.x = this.x - 1;

          break;
        case cartRight:
          this.x = this.x + 1;

          break;
        default:
          break;
      }
    }

    adjustIntersectionActionId() {
      this.intersectionAction++;

      if (this.intersectionAction >= intersectionTurnOrder.length) {
        this.intersectionAction = 0;
      }
    }
  }

  const grid = data.map((line, yPosition) => {
    const cells = line.split('');

    cells.forEach((cell, xPosition) => {
      if (cartSymbols.includes(cell)) {
        carts.push(new Cart(xPosition, yPosition, cell));

        cells[xPosition] = (cell === cartRight || cell === cartLeft) ? trackHorizontal : trackVertical;
      }
    });

    return cells;
  });

  const crashedCarts = (sortedCarts) => {
    return sortedCarts.some((cart1, cart1Id) => {
      let cartsHaveCrashed = sortedCarts.some((cart2, cart2Id) => {
        if (cart1Id !== cart2Id) {
          return (cart1.x === cart2.x && cart1.y === cart2.y);
        }
      });

      if (cartsHaveCrashed) {
        crashSite = `${cart1.x},${cart1.y}`;
      }

      return cartsHaveCrashed;
    });
  }

  const mapCartsToGrid = () => {
    return grid.map((row, y) => {
      return row.map((cell, x) => {
        let hasCart = false;

        carts.forEach((cart) => {
          if (cart.x === x && cart.y === y) {
            hasCart = (hasCart) ? 'X' : cart.direction;

            return true;
          }

          return false;
        });

        return (hasCart) ? hasCart : cell;
      }).join('');
    }).join('\n');
  }

  if (DEBUG) {
    console.log(mapCartsToGrid());
  }

  while(!crashSite) {
    carts
      .slice()
      .sort((cartA, cartB) => {
        const yDifference = cartA.y - cartB.y;

        if (!yDifference) {
          return cartA.x - cartB.x;
        }

        return yDifference;
      })
      .some((cart, index, sortedCarts) => {
        cart.adjustPosition();

        const resortedCarts = sortedCarts.slice().sort((cartA, cartB) => {
          const yDifference = cartA.y - cartB.y;
  
          if (!yDifference) {
            return cartA.x - cartB.x;
          }
  
          return yDifference;
        });

        return crashedCarts(resortedCarts);
      })
    ;

    if (DEBUG) {
      console.log(mapCartsToGrid());
    }
  }

  return crashSite;
}

module.exports = solvePuzzle;
