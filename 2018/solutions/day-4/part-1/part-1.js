const { DateTime } = require('luxon');

const Solution = require('../../../utils/solution.class');

const day = 4;
const part = 1;

const puzzle = new Solution({ day, part });

puzzle.data.then((data) => {
  const dateRegEx = /\[(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})\]\s(.*)/;

  const dateFormat = 'yyyy-MM-dd HH:mm';

  let currentGuardId = 0;

  let guardTracker = {};

  const getGuardIdFromStatus = (status) => {
    const guardIdRegEx = /Guard #(\d+)/;

    const findId = guardIdRegEx.exec(status);

    let id = currentGuardId;

    if (findId) {
      id = findId[1];

      currentGuardId = id;
    }

    return id;
  };

  const isAsleep = (status) => {
    return (status === 'falls asleep'); 
  };

  const findSleepiestGuard = (sleepData) => {
    const scoreBoard = Object.entries(sleepData).reduce((accumulatedSleep, [ date, guards ]) => {
      Object.entries(guards).forEach(([ guardId, { total }]) => {
        accumulatedSleep[guardId] = (accumulatedSleep[guardId] || 0) + total;
      });

      return accumulatedSleep;
    }, {});

    return Object.keys(scoreBoard).sort(
      (guardA, guardB) => scoreBoard[guardB] - scoreBoard[guardA]
    ) [0];
  };

  const findBestMinute = (guardId, sleepData) => {
    const minutesAsleepFrequencies = Object.entries(sleepData).reduce((minutesAsleep, [ date, guards ]) => {
      if (guards[guardId]) {
        guards[guardId].schedule.forEach((asleep, minute) => {
          if (asleep) {
            minutesAsleep[minute] = (minutesAsleep[minute]) ? minutesAsleep[minute] + 1 : 1;
          }
        });
      }

      return minutesAsleep;
    }, {});

    return Object.keys(minutesAsleepFrequencies).sort(
      (frequencyA, frequencyB) => minutesAsleepFrequencies[frequencyB] - minutesAsleepFrequencies[frequencyA]
    )[0];
  };

  const formattedAndSortedEntries = data
    // get the date and the status of each entry
    .map((entry) => {
      const [ match, timestamp, status ] = dateRegEx.exec(entry);

      const date = DateTime.fromFormat(timestamp, dateFormat);

      return {
        date,
        status
      };
    })
    // sort entries by date and time
    .sort((entryA, entryB) => {
      if (entryA.date < entryB.date) {
        return -1;
      }

      if (entryA.date > entryB.date) {
        return 1;
      }

      return 0;
    })
    // get the guard and sleep status of each entry
    .map(({ date, status }) => {
      const id = getGuardIdFromStatus(status);
      const asleep = isAsleep(status);

      return {
        id,
        date,
        asleep,
      };
    })
  ;

  formattedAndSortedEntries.forEach((entry) => {
    const { date, asleep, id } = entry;

    const dateKey = date.toFormat('MM/dd');
    const hour = date.toFormat('HH');
    const minute = date.toFormat('mm');

    guardTracker[dateKey] = guardTracker[dateKey] || {};
    guardTracker[dateKey][id] = guardTracker[dateKey][id] || {};
    guardTracker[dateKey][id][hour] = guardTracker[dateKey][id][hour] || new Map();
    guardTracker[dateKey][id][hour].set(minute, asleep);
  });

  let formattedSleepSchedules = Object.keys(guardTracker).reduce((trackingObject, dateKey) => {
    const guardDataForDate = guardTracker[dateKey];

    const guardSleepSchedule = Object.keys(guardDataForDate).reduce((guardObject, guardId) => {
      const sleepEventMinutes = guardTracker[dateKey][guardId];

      const sleepSchedule = [];

      const midnightHour = sleepEventMinutes['00'];

      if (midnightHour) {
        const midnightHourSleepEvents = Array.from(midnightHour.keys());

        let status = false;

        for (let minute = 0; minute < 60; minute++) {
          const minuteString = (minute < 10) ? `0${minute}` : minute.toString();

          if (midnightHourSleepEvents.includes(minuteString)) {
            status = midnightHour.get(minuteString);
          }

          sleepSchedule.push(status);
        }
      }

      guardObject[guardId] = {
        schedule: sleepSchedule,
        total: sleepSchedule.filter(minute => minute).length,
      };

      return guardObject;
    }, {});

    trackingObject[dateKey] = guardSleepSchedule;

    return trackingObject;
  }, {});

  const guard = findSleepiestGuard(formattedSleepSchedules);

  const minute = findBestMinute(guard, formattedSleepSchedules);

  const result = guard * minute;

  const display = `${guard} * ${minute} = ${result}`;

  console.log('SLEEPY GUARD:', display);
});