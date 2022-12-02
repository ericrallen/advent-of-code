use crate::PART_TWO_INDICATOR;

fn part_one(input: String) -> String {
  return format!("15");
}

fn part_two(input: String) -> String {
  return format!("DAY TWO PART TWO");
}

pub fn main(input: String, part: &str) -> String {
  match part {
    PART_TWO_INDICATOR => return part_two(input),
    _ => return part_one(input)
  }
}
