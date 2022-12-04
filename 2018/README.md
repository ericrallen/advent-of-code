# Advent of Code 2018

This directory contains solutions for the [2018 Advent of Code](https://adventofcode.com/2018).

## Running these Solutions

1. Clone this repository and cd into the `2018` directory
2. Run `yarn install`
3. Run the script for a solution:
  1. From your terminal by referencing the file path: `node 2018/solutions/day-1/part-1/part-1.js`
  2. From your terminal by referencing the `yarn` script: `yarn 2018:day-1:part-1`
  3. Run all the solutions by referencing the year: `yarn 2018`

The data checked into the `inputs` directories represent what was given to me by
the Advent of Code site. If you'd like to try with your own data, you can follow
these instructions:

1. Get your `session` Cookie from the Advent of Code site
2. Copy the `example.env` file to `.env`: `cp example.env .env`
3. Replace the `[Replace with Session Cookie Value]` String in the `.env` file
with the value of your `session` Cookie

## Notes

The `inputs` directory contains static `.dat` files with the relevant data for
each day of the Advent of Code Calendar.

The `solutions` directory contains the `.js` script files for solving each day of
the Advent of Code Calendar.

The `utils` directory contains any reusable utilities that were created to
facilitate solving multiple puzzles. It currently only houses a `Solution` Class
that aids the user in getting the input data into an Array for easier manipulation.

The `Solution` Class supports retrieving the input data from the Advent of Code
site and then caching it in the local filesystem in the `inputs` directory. It will
check this directory for data first to minimize requests to the Advent of Code site.
