const { DateTime } = require('luxon');

const Solution = require('../../../utils/solution.class');

const day = 4;
const part = 1;

const puzzle = new Solution({ day, part });

puzzle.data.then((data) => {
  const dateRegEx = /\[(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})\]\s(.*)/;

  const dateFormat = 'yyyy-MM-dd HH:mm';

  let currentGuardId = 0;

  const getGuardIdFromStatus = (status) => {
    const guardIdRegEx = /Guard #(\d+)/;

    const findId = guardIdRegEx.exec(status);

    let id = currentGuardId;

    if (findId) {
      id = findId[1];

      currentGuardId = id;
    }

    return id;
  }

  const isAsleep = (status) => {
    return (status === 'falls asleep'); 
  }

  const test = data
    .map((entry) => {
      const [ match, timestamp, status ] = dateRegEx.exec(entry);

      const date = DateTime.fromFormat(timestamp, dateFormat);

      return {
        date,
        status
      };
    })
    .sort((entryA, entryB) => {
      if (entryA.date < entryB.date) {
        return -1;
      }

      if (entryA.date > entryB.date) {
        return 1;
      }

      return 0;
    })
    .map(({ date, status }) => {
      const id = getGuardIdFromStatus(status);
      const asleep = isAsleep(status);

      return {
        id,
        date,
        status,
        asleep,
      };
    })
  ;

  // TODO: figure out when guards are most likely to be asleep based on which minutes
  // each day they are asleep

  console.log('DATA:', test);
});