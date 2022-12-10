use std::env;
use std::fs;

// verbose logging borrowed from:
//  - https://stackoverflow.com/a/57955092/656011
//  - https://stackoverflow.com/a/38150040/656011

// Disable warnings
#[allow(unused_macros)]

// The debug version
#[cfg(feature = "verbose")]
macro_rules! log {
  ($( $args:expr ),*) => { println!( $( $args ),* ) }
}

// Non-debug version
#[cfg(not(feature = "verbose"))]
macro_rules! log {
  ($( $args:expr ),*) => {()}
}

#[path = "./days/days.rs"] mod days;
#[path = "./utils/file.rs"] mod file;


static DEFAULT_DAY: &str = "1";
static DEFAULT_PART: &str = "1";

const PART_TWO_INDICATOR: &str = "2";

#[cfg(feature = "test")]
const TEST_FLAG: bool = true;

#[cfg(not(feature = "test"))]
const TEST_FLAG: bool = false;

fn main() {
  let args: Vec<String> = env::args().collect();

  let actual_args = &args[1..args.len()];

  log!("Arguments:\n{:?}", actual_args);

  log!("Testing: {}", TEST_FLAG);

  let day = if !actual_args.is_empty() {
    &actual_args[0]
  } else {
    DEFAULT_DAY
  };

  let part = if actual_args.len() > 1 {
    &actual_args[1]
  } else {
    DEFAULT_PART
  };

  log!("Day: {}\nPart: {}", day, part);

  let input: String = read_input(day, TEST_FLAG);

  let answer = days::main(day, part, input);

  // test against the example input and example solution
  if TEST_FLAG {
    let solution = read_solution(day, part);

    log!("Computed Solution: {}", answer);
    log!("Example Solution: {}", solution);

    assert!(answer == solution, "Solution for day {} does not match example.", day);

    println!("Solution for day {} seems to be correct.", day);
  } else {
    println!("{}", answer);
  }
}

fn read_input(day: &str, is_test: bool) -> String {
  let file_directory = match is_test {
    true => "tests",
    _ => "inputs"
  };

  let file_extension = match is_test {
    true => "test.dat",
    _ => "dat"
  };

  let file_path = format!("../{}/day-{}.{}", file_directory, day, file_extension);

  log!("In file {}", file_path);

  // borrowed from: https://doc.rust-lang.org/book/ch12-02-reading-a-file.html
  let contents = fs::read_to_string(file_path)
    .expect("Should have been able to read the file").trim().to_string();

  contents
}

fn read_solution(day: &str, part: &str) -> String {
  let file_path = format!("../tests/day-{}-part-{}.solution", day, part);

  log!("In file {}", file_path);

  let contents = fs::read_to_string(file_path)
    .expect("Should have been able to read the file").trim().to_string();

  contents
}
