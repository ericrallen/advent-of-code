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

To run the solution with the example data and `assert!()` that it matches the example solution, you can enable the `test` feature:

```sh
# this will test the Day 1 Part 2 solution with the example input
cargo run --features test 1 2
```

**Note**: This feature makes use of the `/inputs/day-{N}.test` files for problem inputs and the `/tests/day-{N}-part-{N}.solutions` files for expected solution values.

### Logging

To run the solution with verbose logging you can enable the `verbose` feature:

```sh
# this will run the Day 1 Part 2 solution with verbose logging enabled
cargo run --features verbose 1 2
```

**Note**: This can be useful for debugging purposes.

## Input Data

The `inputs` directory contains static `.dat` files with the actual puzzle input for each day, named like `day-{N}.dat` where `N` is the day. It also contains `.test` files with the example input from the description for that day to allow easy checking of the logic with the example input and solution before applying it to the real data.


