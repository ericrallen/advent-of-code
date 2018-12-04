const { DateTime } = require('luxon');

const Solution = require('../../../utils/solution.class');

const day = 4;
const part = 2;

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

  const findSleepiestGuardForMinute = (sleepData) => {
    const guardSleepByMinute = Object.entries(sleepData).reduce((minutesAsleep, [ date, guards ]) => {
      const minutesByGuard = Object.entries(guards).reduce((guardSleep, [ guardId, { schedule }]) => {
        schedule.forEach((asleep, minute) => {
          if (asleep) {
            guardSleep[guardId] = guardSleep[guardId] || {};
            guardSleep[guardId][minute] = (guardSleep[guardId][minute]) ? guardSleep[guardId][minute] + 1 : 1;
          }
        });

        return guardSleep;
      }, minutesAsleep);

      return minutesByGuard;
    }, {});

    const sleepiestGuardMinutes = Object.entries(guardSleepByMinute).reduce((sleepiestMinuteForAllGuards, [guardId, schedule]) => {
      const sleepiestMinuteForThisGuard = Object.keys(schedule).sort(
        (minuteA, minuteB) => schedule[minuteB] - schedule[minuteA]
      )[0];

      sleepiestMinuteForAllGuards[guardId] = {
        minute: sleepiestMinuteForThisGuard,
        timesAsleep: schedule[sleepiestMinuteForThisGuard]
      };

      return sleepiestMinuteForAllGuards;
    }, {});

    return Object.entries(sleepiestGuardMinutes).reduce((sleepiestGuardAndMinute, [ guardId, { minute, timesAsleep } ]) => {
      if (sleepiestGuardAndMinute.timesAsleep) {
        if (timesAsleep > sleepiestGuardAndMinute.timesAsleep) {
          sleepiestGuardAndMinute = { guardId, minute, timesAsleep };
        }
      } else {
        sleepiestGuardAndMinute = { guardId, minute, timesAsleep };
      }

      return sleepiestGuardAndMinute;
    }, {});
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

  const { guardId, minute } = findSleepiestGuardForMinute(formattedSleepSchedules);

  const result = guardId * minute;

  const display = `${guardId} * ${minute} = ${result}`;

  console.log('SLEEPY GUARD:', display);
});