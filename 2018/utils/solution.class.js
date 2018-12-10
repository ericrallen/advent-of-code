const fs = require('fs');
const path = require('path');
const axios = require('axios');

require('dotenv').config();

/**
 * Class for implementing a JS-based solution to Advent of Code Puzzles
 */
class Solution {
  /**
   * Generate a new instance of our Solution class
   * @param {Object} options configuration object used for instantiating our class
   * @param {String} options.inputPath relative path from the current script to where our input data lives
   * @param {Number} options.day which Advent of Code day is this puzzle for
   * @param {Number} options.part which part of the day's puzzle are we solving
   */
  constructor({ inputPath = '../inputs', day = 0, part = 0, year = 0 }) {
    this.inputArray = [];

    // if we don't know what day it is, we're not going to really have anything useful we can do
    if (day) {
      this.day = day;

      if (part) {
        this.part = part;
      }

      this.year = year || process.env.YEAR;

      const welcomeMessage = `Advent of Code ${this.year} Day ${day}${(part) ? `: Part ${part}` : ''}`;

      // let's generate the URL on the website where we can find our data
      this.inputDataUrl = `${process.env.DOMAIN}/${this.year}/day/${day}/input`;

      // let's also generate a fallback local path to the data that we've checked in
      this.inputDataPath = path.resolve(__dirname, `${inputPath}/${day}.dat`);

      if (fs.existsSync(this.inputDataPath)) {
        this.inputArray = this.readLocalInput();
      } else {
        // if we have our session cookie in the .env file
        if (process.env.SESSION) {
          this.inputArray = this.requestInputData();

          this.writeInputFile();
        }
      }

      console.log(welcomeMessage);
    }
  }

  /**
   * Getter for end-user to get the actual input values
   * 
   * @readonly
   * @memberof Solution
   */
  get data () {
    console.log('Processing data...');

    return this.inputArray;
  }

  /**
   * Return a Promise that resolves to our input data
   * 
   * @memberof Solution
   */
  readLocalInput() {
    // we'll be returning a Promise when we use the URL request method
    // so we're going to go ahead and return a Promise when we're reading
    // the local filesystem, too so that it's always the same API that is
    // exposed to our solutions
    return new Promise((resolve) => resolve(this.readInputData()));
  }

  /**
   * Retrieve input data from Advent of Code site
   * 
   * @memberof Solution
   */
  requestInputData() {
    return axios({
      method: 'get',
      url: this.inputDataUrl,
      headers: {
        'Cookie': `session=${process.env.SESSION}`,
      },
    })
      // retrieve data and split into Array
      .then(({ data }) => {
        return data.trim().split('\n');
      })
      // fallback to local filesystem on error
      .catch((error) => {
        console.error('CONNECTION ERROR:', error);
      })
    ;
  }

  /**
   * Retrieve input data from local filesystem
   * 
   * @memberof Solution
   */
  readInputData() {
    return fs.readFileSync(this.inputDataPath, 'utf-8').split('\n');
  }

  /**
   * Write retrieved input data to local filesystem
   * 
   * @memberof Solution
   */
  writeInputFile() {
    this.data.then((data) => {
      fs.writeFileSync(this.inputDataPath, data.join('\n'));
    });
  }

  /**
   * Solve the puzzle by applying the provided logic to this puzzle's data
   * @param {Function} solutionLogic function containing the actual logic for solving your puzzle
   * 
   * @memberof Solution
   */
  solve(solutionLogic, useThisData = null) {
    console.time('Calculating Solution');

    if (useThisData) {
      const solution = solutionLogic(useThisData);

      console.log('SOLUTION:', solution);
      console.timeEnd('Calculating Solution');
    } else {
      this.data.then((data) => {
        const solution = solutionLogic(data);

        console.log('SOLUTION:', solution);
        console.timeEnd('Calculating Solution');
      });
    }
  }
}

module.exports = Solution;
