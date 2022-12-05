use std::fs;

// TODO: figure out if using something like this might make more sense

#[cfg(feature = "verbose")]
macro_rules! log {
    ($( $args:expr ),*) => { println!( $( $args ),* ); }
}

// Non-debug version
#[cfg(not(feature = "verbose"))]
macro_rules! log {
    ($( $args:expr ),*) => {()}
}

type Puzzle = (i32, i32);

pub trait DayOne {
  fn solve(&self, input: &String);
}

pub trait DayTwo {
  fn solve(&self, input: &String);
}

pub struct Solution {
  // day and part
  puzzle: Puzzle,
  input: String,
  solution: String,
}

impl Solution {
  pub fn init(&mut self, (day, part): Puzzle) {
    self.puzzle = (day, part);

    self.input = self.read_input(day);

    self.solution = self.solve(&self.input);
  }

  fn read_input(&mut self, day: i32) -> String {
    let file_directory = "tests";

    let file_extension = "test.dat";

    let file_path = format!("../{}/day-{}.{}", file_directory, day, file_extension);

    log!("In file {}", file_path);

    // borrowed from: https://doc.rust-lang.org/book/ch12-02-reading-a-file.html
    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");


    return contents;
  }

  fn solve(&self, _input: &String) -> String {
    let (day, part) = self.puzzle;
    return format!("Implement solution for day {} part {}", day, part)
  }
}
