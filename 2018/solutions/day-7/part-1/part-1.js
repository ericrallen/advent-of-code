function solvePuzzle(data) {
  let solution = [];

  const aCharacterCode = 65;
  const zCharacterCode = 90;

  const prerequisiteObject = new Map();

  const stepParsingRegex = /^Step (\w) must be finished before step (\w) can begin.$/;
  const stepsThatArePrerequisites = [];

  const stepOrders = data.map((instruction) => {
    const [ match, firstStep, secondStep ] = stepParsingRegex.exec(instruction);

    return [firstStep, secondStep];
  });

  const partOfProcess = (step, process) => process.some(([ step1, step2 ]) => step1 === step || step2 === step);

  for (let charCode = aCharacterCode; charCode <= zCharacterCode; charCode++) {
    const letter = String.fromCharCode(charCode).toUpperCase();

    if (partOfProcess(letter, stepOrders)) {
      const prereqs = [];

      stepOrders.forEach(([ before, after ]) => {
        if (!stepsThatArePrerequisites.includes(before)) {
          stepsThatArePrerequisites.push(before);
        }

        if (after === letter) {
          prereqs.push(before);
        }
      });

      prerequisiteObject.set(letter, prereqs.sort());
    }
  }

  const firstSteps = Array.from(prerequisiteObject)
    .filter(([ step, prereqs ]) => !prereqs.length)
    .map(([ step ]) => step)
    .sort()
  ;

  const lastSteps = Array.from(prerequisiteObject)
    .filter(([ step ]) => !stepsThatArePrerequisites.includes(step))
    .map(([ step ]) => step)
    .sort()
  ;

  solution.push(firstSteps.shift());

  const prereqsResolved = (prerequisites, test) => {
    const unresolved = prerequisites.filter((step) => !test.includes(step));

    return unresolved.length === 0;
  };

  let stepToCheck = 0;

  while(solution.length < prerequisiteObject.size) {
    const step = solution[stepToCheck];

    let nextSteps = [];

    Array.from(prerequisiteObject).forEach(([ nextStep, prereqs ]) => {
      if (step !== nextStep && !solution.includes(nextStep) && !firstSteps.includes(nextStep) && !lastSteps.includes(nextStep)) {
        if (prereqsResolved(prereqs, solution)) {
          nextSteps.push(nextStep);
        }
      }
    });

    if (firstSteps.length) {
      nextSteps.push(firstSteps.shift());
    }

    solution.splice(stepToCheck + 1, 0, nextSteps.sort().shift());

    stepToCheck++;
  }

  if (lastSteps.length) {
    solution.push(...lastSteps);
  }

  return solution.join('');
}

module.exports = solvePuzzle;
