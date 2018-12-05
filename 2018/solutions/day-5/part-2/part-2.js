function solvePuzzle(data, unitToRemove) {
  // we know this puzzle only has one long polymer chain, so it's our first
  // and only element in the data Array
  let polymer = data[0];

  let noMoreReactions = false;

  let charactersToRemove = [];
  const startCharacterCode = 65;
  const endCharacterCode = 90;


  const isSameLetterDifferentCase = (letterA, letterB) => {
    return (letterA.toLowerCase() === letterB.toLowerCase() && letterA !== letterB);
  };

  const resolvePolymerReactions = (reactingPolymer) => {
    noMoreReactions = reactingPolymer.every((unit, position) => {
      const nextLetter = reactingPolymer[position + 1];
      const lastLetter = reactingPolymer[position - 1];

      let onlyNext = false;
      let onlyLast = false;
  
      //check to make sure we aren't at the beginning of our polymer
      if (position === 0) {
        onlyNext = true;
      }
  
      // check to see if we are at the end of our polymer
      if (position === reactingPolymer.length - 1) {
        onlyLast = true;
      }
  
      // only check the next position
      if (!onlyLast && isSameLetterDifferentCase(unit, nextLetter)) {
        reactingPolymer.splice(position, 2);
  
        return false;
      }
  
      if (!onlyNext && isSameLetterDifferentCase(unit, lastLetter)) {
        reactingPolymer.splice(position - 1, 2);
  
        return false;
      }
  
      return true;
    });

    return reactingPolymer.join('');
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
      noMoreReactions = false;

      let alteredPolymer = polymer.replace(new RegExp(character, 'ig'), '');

      while(!noMoreReactions) {
        alteredPolymer = resolvePolymerReactions(alteredPolymer.split(''));
      }

      return alteredPolymer.length;
    })
    .sort((a, b) => a - b)
    [0]
  ;
}

module.exports = solvePuzzle;