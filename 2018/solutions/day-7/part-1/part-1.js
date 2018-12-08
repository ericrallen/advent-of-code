function solvePuzzle(data) {
  const solution = [];

  const stepParsingRegex = /^Step (\w) must be finished before step (\w) can begin.$/;
  const stepsThatArePrerequisites = [];

  const stepOrders = data.map((instruction) => {
    const [ match, firstStep, secondStep ] = stepParsingRegex.exec(instruction);

    return [firstStep, secondStep];
  });

  const stepsToComplete = new Map();

  const sequence = stepOrders.reduce((prerequisiteObject, [ subStep1, subStep2 ], id) => {
    if (!stepsToComplete.get(subStep1)) {
      stepsToComplete.set(subStep1, false);
    }

    if (!stepsThatArePrerequisites.includes(subStep1)) {
      stepsThatArePrerequisites.push(subStep1);
    }

    if (!stepsToComplete.get(subStep2)) {
      stepsToComplete.set(subStep2, false);
    }

    prerequisiteObject[subStep2] = prerequisiteObject[subStep2] || [];

    prerequisiteObject[subStep2].push(subStep1);

    prerequisiteObject[subStep2] = prerequisiteObject[subStep2].sort();

    return prerequisiteObject;
  }, {});

  // any step without a prerequisite is a first step
  const firstSteps = Array.from(stepsToComplete).map(([ step ]) => step).filter(step => !Object.keys(sequence).includes(step));

  // any step without any steps that have it as a prerequisite is a last step
  const lastSteps = Array.from(stepsToComplete).map(([ step ]) => step).filter(step => !stepsThatArePrerequisites.includes(step));

  // sort the first steps alphabetically
  solution.push(...(firstSteps.sort()));

  for(var stepIndex = 0; stepIndex < stepsToComplete.size; stepIndex++) {

    const step = solution[stepIndex];

    // TODO: Figure out why we're only getting a few steps in before we lose the other dozen or so steps

    const nextSteps = Object.entries(sequence).reduce((steps, [ nextStep, prerequisiteSteps ]) => {
      const prerequisitesComplete = prerequisiteSteps.filter(prerequisiteStep => !stepsToComplete.get(prerequisiteStep)).length === 0;

      if (((prerequisiteSteps.join('') === solution[stepIndex] || prerequisiteSteps.join('') === step) || prerequisitesComplete) && !lastSteps.includes(nextStep) && !firstSteps.includes(nextStep)) {
        steps.push(nextStep);
      }

      if (prerequisitesComplete) {
        stepsToComplete.set(nextStep, true);
      }

      return steps.sort();
    }, []);

    if (step) {
      stepsToComplete.set(step, true);
    }

    const newSteps = nextSteps.filter((stepToFilter) => !solution.includes(stepToFilter)).sort();

    solution.splice(stepIndex + 1, 0, ...newSteps);
  }

  // sort the final steps alphabetically
  solution.push(...(lastSteps.sort()));

  lastSteps.forEach((step) => {
    stepsToComplete.set(step, true);
  });

  return solution.join('');
}

module.exports = solvePuzzle;
