function solvePuzzle(data) {
  const parseRulesRegEx = /^(\d+) players; last marble is worth (\d+) points$/;

  const [ match, playerString, marbleString ] = parseRulesRegEx.exec(data[0]);

  const numberOfPlayers = parseInt(playerString, 10);

  const numberOfMarbles = parseInt(marbleString, 10) * 100; // This is clearly a bad idea to brute force

  const players = [];
  const marbles = [];

  let currentMarble = 0;
  let currentPlayer = 0;

  for (let playerId = 0; playerId < numberOfPlayers; playerId++) {
    players.push(0);
  }

  for (let marble = 0; marble < numberOfMarbles; marble++) {
    if (marble && marble % 23 === 0) {
      let removedMarbleIndex = currentMarble - 7;

      if (removedMarbleIndex < 0) {
        removedMarbleIndex = marbles.length + removedMarbleIndex;
      }

      if (removedMarbleIndex > marbles.length) {
        removedMarbleIndex = removedMarbleIndex - marbles.length;
      }

      const removedMarble = marbles[removedMarbleIndex];

      const newCurrentMarble = marbles[removedMarbleIndex + 1];

      marbles.splice(removedMarbleIndex, 1);

      players[currentPlayer] += marble + removedMarble;

      currentMarble = marbles.indexOf(newCurrentMarble);
    } else {
      let newMarbleIndex = currentMarble + 2;

      if (newMarbleIndex > marbles.length) {
        newMarbleIndex = newMarbleIndex - marbles.length;
      }

      if (newMarbleIndex === 0) {
        newMarbleIndex = 1;
      }

      marbles.splice(newMarbleIndex, 0, marble);

      currentMarble = marbles.indexOf(marble);
    }

    currentPlayer++;

    if (currentPlayer === players.length) {
      currentPlayer = 0;
    }
  }

  const highScore = players.sort((a, b) => b - a)[0];

  return highScore;
}

module.exports = solvePuzzle;
