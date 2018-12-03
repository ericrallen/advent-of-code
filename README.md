# Advent of Code

Advent of Code solutions and whatnot.

## Solutions

Solutions can be found in the folder for their respective year of Advent of Code.
For example, the solutions for 2018 are in the `2018` directory.

## Resources

[2018 Advent of Code](https://adventofcode.com/2018)

## Running these Solutions

1. Clone this repository
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