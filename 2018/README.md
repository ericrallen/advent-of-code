# Advent of Code 2018

This directory contains solutions for the [2018 Advent of Code](https://adventofcode.com/2018).

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