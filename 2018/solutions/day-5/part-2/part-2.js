const startCharacterCode = 65;
const endCharacterCode = 90;

function generateStupidRegEx() {
  const characterPairsToRemove = [];

  for (let characterCode = startCharacterCode; characterCode <= endCharacterCode; characterCode++) {
    const character = String.fromCharCode(characterCode);

    characterPairsToRemove.push(`${character}${character.toLowerCase()}`);
    characterPairsToRemove.push(`${character.toLocaleLowerCase()}${character}`);
  }

  return new RegExp(characterPairsToRemove.join('|'), 'g');
}

function solvePuzzle(data, unitToRemove) {
  // we know this puzzle only has one long polymer chain, so it's our first
  // and only element in the data Array
  let polymer = data[0];

  let charactersToRemove = [];

  const stupidRegex = generateStupidRegEx();

  const resolvePolymerReactions = (reactingPolymer) => {
    return reactingPolymer.replace(stupidRegex, '');
  };

  if (unitToRemove) {
    charactersToRemove.push(unitToRemove);
  } else {
    for (let characterCode = startCharacterCode; characterCode <= endCharacterCode; characterCode++) {
      charactersToRemove.push(String.fromCharCode(characterCode));
    }
  }

  return charactersToRemove
    .map((character) => {
      let alteredPolymer = polymer.replace(new RegExp(character, 'ig'), '');

      while(stupidRegex.test(alteredPolymer)) {
        alteredPolymer = resolvePolymerReactions(alteredPolymer);
      }

      return alteredPolymer.length;
    })
    .sort((a, b) => a - b)
    [0]
  ;
}

module.exports = solvePuzzle;