function generateStupidRegEx() {
  const characterPairsToRemove = [];
  const startCharacterCode = 65;
  const endCharacterCode = 90;

  for (let characterCode = startCharacterCode; characterCode <= endCharacterCode; characterCode++) {
    const character = String.fromCharCode(characterCode);

    characterPairsToRemove.push(`${character}${character.toLowerCase()}`);
    characterPairsToRemove.push(`${character.toLocaleLowerCase()}${character}`);
  }

  return new RegExp(characterPairsToRemove.join('|'), 'g');
}

function solvePuzzle(data) {
  // we know this puzzle only has one long polymer chain, so it's our first
  // and only element in the data Array
  let polymer = data[0];

  const stupidRegex = generateStupidRegEx();

  const resolvePolymerReactions = (reactingPolymer) => {
    return reactingPolymer.replace(stupidRegex, '');
  };

  while(stupidRegex.test(polymer)) {
    polymer = resolvePolymerReactions(polymer);
  }

  return polymer.length;
}

module.exports = solvePuzzle;
