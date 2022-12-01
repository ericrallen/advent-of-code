# Advent of Code 2022

This directory contains solutions for the [2022 Advent of Code](https://adventofcode.com/2022).

**Note**: This year I used the Advent of Code event as an excuse to learn about [Rust](https://www.rust-lang.org/).

## Solutions

The `advent` directory contains the actual code for solving each day's puzzle and can be run via:

```sh
# $day and $part are the integers that represent the day and part (1 or 2) that you would like to solve
cargo run -- $day $part
```

### Testing

To run the solution with the example data you can provide the test flag as the first parameter:

```sh
# this will test the Day 1 Part 2 solution with the example input
cargo run -- test 1 2
```

**TODO**: Integrate the testing better and have it use the [`assert!()` macro](https://doc.rust-lang.org/std/macro.assert.html) to test against the example solution.

## Input Data

The `inputs` directory contains static `.dat` files with the actual puzzle input for each day, named like `day-{N}.dat` where `N` is the day. It also contains `.test` files with the example input from the description for that day to allow easy checking of the logic with the example input and solution before applying it to the real data.


