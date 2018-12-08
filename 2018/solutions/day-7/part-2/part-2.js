function solvePuzzle(data, workers = 5, timeToCompleteStep = 60) {
  let solution = [];

  const workerArrays = {};

  for (let workerId = 0; workerId < workers; workerId++) {
    workerArrays[workerId] = [];
  }

  const timeMap = {};

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

  const alphabet = [];

  for (let charCode = aCharacterCode; charCode <= zCharacterCode; charCode++) {
    const letter = String.fromCharCode(charCode).toUpperCase();

    alphabet.push(letter);

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

  const getStepTime = (step) => alphabet.indexOf(step) + 1 + timeToCompleteStep;

  const prereqsResolved = (prerequisites, test) => {
    const unresolved = prerequisites.filter((step) => !test.includes(step));

    return unresolved.length === 0;
  };

  const isWorkerFree = (workerId, tick) => {
    const workArray = workerArrays[workerId];

    const totalWork = workArray.reduce((totalTime, step) => totalTime + getStepTime(step), 0);

    return tick >= totalWork;
  }

  const isStepResolved = (step, tick) => tick - timeMap[step] >= getStepTime(step);

  const isStepActive = (step) => Object.keys(workerArrays).some((workerId) => workerArrays[workerId].includes(step));

  let done = false;

  let tick = 0;

  while(!done) {
    Object.keys(workerArrays).forEach((workerId) => {
      workerArrays[workerId].forEach((step) => {
        if (isStepResolved(step, tick) && !solution.includes(step)) {
          solution.push(step);

          elapsedTime = tick;

          if (solution.length === prerequisiteObject.size) {
            done = true;
          }
        }
      })
    });

    if (!done) {

      let nextSteps = [];

      Array.from(prerequisiteObject).forEach(([ nextStep, prereqs ]) => {
        if (!solution.includes(nextStep) && prereqsResolved(prereqs, solution) && !isStepActive(nextStep)) {
          nextSteps.push(nextStep);
        }
      });

      const sortedNextSteps = nextSteps.sort();

      Object.keys(workerArrays).forEach((workerId) => {
        if (isWorkerFree(workerId, tick)) {
          const workersNextStep = sortedNextSteps.shift();

          if (workersNextStep && !isStepActive(workersNextStep)) {
            workerArrays[workerId].push(workersNextStep);

            timeMap[workersNextStep] = tick;

            if (firstSteps.includes(workersNextStep)) {
              firstSteps.splice(firstSteps.indexOf(workersNextStep), 1);
            }

            if (lastSteps.includes(workersNextStep)) {
              lastSteps.splice(lastSteps.indexOf(workersNextStep), 1);
            }
          }
        }
      });

      tick++;
    }
  }

  return tick;
}

module.exports = solvePuzzle;
