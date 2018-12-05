const { DateTime } = require('luxon');

const Solution = require('../../../utils/solution.class');

const day = 4;
const part = 1;

const puzzle = new Solution({ day, part });

// resolve the Promise our Solution class has for it's `data` getter function
puzzle.data.then((data) => {
  // the data points we are given are in the following format `[YYYY-MM-DD HH:MM] Some text here`
  const dataRegEx = /\[(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})\]\s(.*)/;

  // we'll use this to tell luxon what format our dates are in since this isn't ISO
  const dateFormat = 'yyyy-MM-dd HH:mm';

  // we're going to use this to preserve the value of the Guard's ID while we
  // iterate through all the statuses and assign them to a guard
  // this is necessary because the statuses are out of order and the Guard's
  // ID only shows up in the first status for that day
  let currentGuardId = 0;

  // we're going to use this to store a map of the dates, Guards, and sleep statuses
  let guardTracker = {};

  // this method will give us the ID of the curreng Guard whose statuses we are parsing
  const getGuardIdFromStatus = (status) => {
    // every guard is mentioned as `Guard #0`
    const guardIdRegEx = /Guard #(\d+)/;

    // check to see if a Guard ID exists in this status
    const findId = guardIdRegEx.exec(status);

    // start with the assumption that we're using the last Guard ID we found
    let id = currentGuardId;

    // if we found an ID
    if (findId) {
      // use the matched ID instead
      id = findId[1];

      // set our global Guard ID tracker to the new Guard ID
      currentGuardId = id;
    }

    return id;
  };

  // parse a status to see if the Guard is asleep or not
  const isAsleep = (status) => {
    return (status === 'falls asleep'); 
  };

  // iterate through our formatted data and figure out which guard sleeps the most often
  const findSleepiestGuard = (sleepData) => {
    // format an Object with key/value pairs that are guardId: totalMinutesSlept
    const scoreBoard = Object.entries(sleepData).reduce((accumulatedSleep, [ date, guards ]) => {
      Object.entries(guards).forEach(([ guardId, { total }]) => {
        accumulatedSleep[guardId] = (accumulatedSleep[guardId] || 0) + total;
      });

      return accumulatedSleep;
    }, {});

    // sort our Guards in descending order by minutes slept and grab the first score
    return Object.keys(scoreBoard).sort(
      (guardA, guardB) => scoreBoard[guardB] - scoreBoard[guardA]
    )[0];
  };

  // iterate through our formatted data with our sleepiest Guard's ID and figure out
  // which minute of the midnight shift they are most often asleep
  const findBestMinute = (guardId, sleepData) => {
    // format a new object with every minute and how often the sleep Guard is
    // asleep during that minute
    const minutesAsleepFrequencies = Object.entries(sleepData).reduce((minutesAsleep, [ date, guards ]) => {
      // make sure we're only tracking data for the sleepy Guard
      if (guards[guardId]) {
        // iterate through the sleepy Guard's schedule
        guards[guardId].schedule.forEach((asleep, minute) => {
          // if our Guard is asleep
          if (asleep) {
            // increment our count for how often the Guard is asleep during this minute of the shift
            minutesAsleep[minute] = (minutesAsleep[minute]) ? minutesAsleep[minute] + 1 : 1;
          }
        });
      }

      return minutesAsleep;
    }, {});

    // sort our sleepy Guard's sleep frequencies in descending order and
    // grab the first frequency
    return Object.keys(minutesAsleepFrequencies).sort(
      (frequencyA, frequencyB) => minutesAsleepFrequencies[frequencyB] - minutesAsleepFrequencies[frequencyA]
    )[0];
  };

  // parse, reformat, and sort our guard status entries
  const formattedAndSortedEntries = data
    // get the date and the status of each entry
    .map((entry) => {
      // get the timestamp and status text for this status entry
      const [ match, timestamp, status ] = dataRegEx.exec(entry);

      // turn this silly date format into something we can really use
      const date = DateTime.fromFormat(timestamp, dateFormat);

      // return an Object with our normalized date and the original status text
      return {
        date,
        status
      };
    })
    // sort entries by date and time
    // this part is a bit wonky because we're comparing dates and can't just do
    // simple subtraction for sorting; though we could probably do some conversion
    // to a standard representation of time as seconds and do the math that way
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
    // we need to sort them first because the Guard's ID only shows up in
    // the first status when they start their shift
    .map(({ date, status }) => {
      const id = getGuardIdFromStatus(status);
      const asleep = isAsleep(status);

      // we don't really need the status text anymore, since all we needed to do
      // with it was find the Guard's ID and decide if they were asleep or awake
      return {
        id,
        date,
        asleep,
      };
    })
  ;

  // now that we've got the relevant data in the relevant order
  // let's iterate through it and update our general Guard tracking Object
  // it will be broken down by date, then guard ID, then hour, and then each minute
  formattedAndSortedEntries.forEach((entry) => {
    const { date, asleep, id } = entry;

    const dateKey = date.toFormat('MM/dd');
    const hour = date.toFormat('HH');
    const minute = date.toFormat('mm');

    // we're going to use a Map to preserve the order in which we add our changes in status
    guardTracker[dateKey] = guardTracker[dateKey] || {};
    guardTracker[dateKey][id] = guardTracker[dateKey][id] || {};
    guardTracker[dateKey][id][hour] = guardTracker[dateKey][id][hour] || new Map();
    guardTracker[dateKey][id][hour].set(minute, asleep);
  });

  // we're going to generate an Object that maps a Guard ID to the total number
  // of minutes slept and then a breakdown of each minute slept for the midnight shift
  let formattedSleepSchedules = Object.keys(guardTracker).reduce((trackingObject, dateKey) => {
    const guardDataForDate = guardTracker[dateKey];

    const guardSleepSchedule = Object.keys(guardDataForDate).reduce((guardObject, guardId) => {
      const sleepEventMinutes = guardTracker[dateKey][guardId];

      const sleepSchedule = [];

      // some Guards start their shift early, so let's only focus on the events
      // that occur during the midnight shift
      const midnightHour = sleepEventMinutes['00'];

      if (midnightHour) {
        const midnightHourSleepEvents = Array.from(midnightHour.keys());

        // assume the Guard isn't asleep until we're told otherwise
        let status = false;

        // generate a quick Array reprsenting every minute of the hour and whether
        // the Guard is asleep or awake; we're going to just use Array indexes between
        // 0 and 59 for mapping our minutes
        for (let minute = 0; minute < 60; minute++) {
          // leftpad our single digit minutes and turn the minutes into a String
          // so we can use them as a lookup in our Map of defined status changes
          const minuteString = (minute < 10) ? `0${minute}` : minute.toString();

          // check to see if this minutes is associated with a change in status
          if (midnightHourSleepEvents.includes(minuteString)) {
            // store the new status
            status = midnightHour.get(minuteString);
          }

          // store the status for this minute
          sleepSchedule.push(status);
        }
      }

      guardObject[guardId] = {
        schedule: sleepSchedule,
        // get the total number of minutes slept by removing any non-sleeping minutes
        // and getting the total number of minutes left in the Array
        total: sleepSchedule.filter(minute => minute).length,
      };

      return guardObject;
    }, {});

    trackingObject[dateKey] = guardSleepSchedule;

    return trackingObject;
  }, {});

  // find our sleepiest Guard
  const guard = findSleepiestGuard(formattedSleepSchedules);

  // find the minute he is most often asleep
  const minute = findBestMinute(guard, formattedSleepSchedules);

  // generate the puzzle solution
  const result = guard * minute;

  // display the solution as the product of the guard id and minute
  const display = `${guard} * ${minute} = ${result}`;

  console.log('SLEEPY GUARD:', display);
});