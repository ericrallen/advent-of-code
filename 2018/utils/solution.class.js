const fs = require('fs');
const path = require('path');
const readline = require('readline');
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
   */
  constructor({ inputPath = '../inputs', day = 0 }) {
    this.inputArray = [];

    if (day) {
      this.day = day;

      this.inputDataUrl = `${process.env.DOMAIN}/day/${day}/input`;

      this.inputDataPath = path.resolve(__dirname, `${inputPath}/${day}.dat`);

      if (process.env.SESSION) {
        this.inputArray = this.requestInputData();
      } else {
        this.inputArray = this.readInputData();
      }
    }
  }

  /**
   * Getter for end-user to get the actual input values
   * @readonly
   * @memberof Solution
   */
  get data () {
    return new Promise((resolve) => {
      resolve(this.inputArray);
    });
  }

  /**
   * Retrieve input data from Advent of Code site
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

        return this.readInputData();
      })
    ;
  }

  /**
   * Retrieve input data from local filesystem
   */
  readInputData() {
    return fs.readFileSync(this.inputDataPath, 'utf-8').split('\n');
  }
}

module.exports = Solution;
