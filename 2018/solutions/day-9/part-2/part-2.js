class Marble {
  constructor(value = 0, previous = null, next = null) {
    this.value = value;
    this._previous = previous;
    this._next = next;
  }

  get previous() {
    return this._previous;
  }

  get next() {
    return this._next;
  }

  set previous(marble) {
    this._previous = marble;
  }

  set next(marble) {
    this._next = marble;
  }
}

function solvePuzzle(data, isTest = false) {
  const parseRulesRegEx = /^(\d+) players; last marble is worth (\d+) points$/;

  const [ match, playerString, marbleString ] = parseRulesRegEx.exec(data[0]);

  const numberOfPlayers = parseInt(playerString, 10);

  let numberOfMarbles = parseInt(marbleString, 10);
  
  if (!isTest) {
    numberOfMarbles = numberOfMarbles * 100;
  }

  const players = [];

  for (let playerId = 0; playerId < numberOfPlayers; playerId++) {
    players.push(0);
  }

  let currentMarble = new Marble();

  for (let marble = 0; marble < numberOfMarbles; marble++) {
    if (marble) {
      if (marble && marble % 23 === 0) {
        const marbleToRemove = currentMarble.previous.previous.previous.previous.previous.previous.previous;

        players[marble % numberOfPlayers] += marble + marbleToRemove.value;

        marbleToRemove.previous.next = marbleToRemove.next;
        marbleToRemove.next.previous = marbleToRemove.previous;

        currentMarble = marbleToRemove.next;
      } else {
        const newMarble = new Marble(marble);

        if (currentMarble.value === 0) {
          newMarble.next = currentMarble;
          newMarble.previous = currentMarble;

          currentMarble.next = newMarble;
          currentMarble.previous = newMarble;
        } else {
          newMarble.next = currentMarble.next.next;
          newMarble.previous = currentMarble.next;

          currentMarble.next.next.previous = newMarble;
          currentMarble.next.next = newMarble;
        }

        currentMarble = newMarble;
      }
    }
  }

  return Math.max(...players);
}

module.exports = solvePuzzle;
