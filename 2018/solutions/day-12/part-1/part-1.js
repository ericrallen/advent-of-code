const plantsOnEitherSideOfZero = 500;

class Plant {
  constructor(id = 0, state = '.', alive = false, previous = null, next = null) {
    this.id = id;
    this._previous = previous;
    this._next = next;
    this.state = state;
    this.alive = alive;
  }

  get previous() {
    return this._previous;
  }

  get next() {
    return this._next;
  }

  set previous(plant) {
    this._previous = plant;
  }

  set next(plant) {
    this._next = plant;
  }
}

class Plants {
  constructor() {
    this.plants = [];
  }

  get size() {
    return this.plants.length;
  }

  getIndex(plant) {
    return this.plants.indexOf(plant);
  }

  get(index) {
    return this.plants[index];
  }

  add(state = '.') {
    const id = this.plants.length - plantsOnEitherSideOfZero - 1;

    const previous = this.plants[this.plants.length - 1] || null;

    const alive = state === '#';

    const plant = new Plant(id, state, alive, previous);

    if (previous) {
      previous.next = plant;
    }

    this.plants.push(plant);
  }
}

function solvePuzzle(data) {
  const generationsToMap = 20;

  const initialStateRegEx = /^initial state: ([#.]+)$/;

  const ruleRegex = /^([#.]{5}) => ([#.])$/;

  const initialStateData = data[0];

  const [ match, initialStateString ] = initialStateRegEx.exec(initialStateData);

  const initialState = initialStateString.split('');

  const rules = data.slice(2);

  const ruleMap = rules.reduce((map, rule) => {
    const [ match, ruleString, result ] = ruleRegex.exec(rule);

    map[ruleString] = result;

    return map;
  }, {});

  const generations = [];

  for (let generationNumber = 0; generationNumber <= generationsToMap; generationNumber++) {
    const generation = new Plants();

    if (generationNumber === 0) {
      // pad the front with our -3, -2, and -1 plant
      for (let negativePlants = 0; negativePlants <= plantsOnEitherSideOfZero; negativePlants++) {
        generation.add();
      }

      initialState.forEach((startingPlant) => {
        generation.add(startingPlant);
      });

      // pad the end to give us +30 on th right side of the 0 plant
      for (let positivePlants = 0; positivePlants <= plantsOnEitherSideOfZero - initialState.length; positivePlants++) {
        generation.add();
      }
    } else {
      const lastGeneration = generations[generationNumber - 1];

      lastGeneration.plants.forEach((plant) => {
        let previousPrevious;
        let nextNext;

        let previous = plant.previous;
        let next = plant.next;

        if (!previous) {
          previous = {
            state: '.',
          };
        }

        if (!next) {
          next = {
            state: '.',
          };
        }

        if (previous && previous.previous) {
          previousPrevious = previous.previous;
        } else {
          previousPrevious = {
            state: '.',
          };
        }

        if (next && next.next) {
          nextNext = next.next;
        } else {
          nextNext = {
            state: '.',
          };
        }

        const test = `${previousPrevious.state}${previous.state}${plant.state}${next.state}${nextNext.state}`;

        generation.add((ruleMap[test]) ? ruleMap[test] : '.');
      });
    }

    generations.push(generation);
  }

  const lastGeneration = generations[generations.length - 1];

  const sumOfPlantIds = lastGeneration.plants.reduce((totalIds, plant) => {
    if (plant.alive) {
      totalIds += plant.id;
    }

    return totalIds;
  }, 0);

  return sumOfPlantIds;
}

module.exports = solvePuzzle;
