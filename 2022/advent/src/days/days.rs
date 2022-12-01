#[path = "./day_one.rs"] mod day_one;

static ERROR_MESSAGE: &str = "No Solution Found for Day";

const DAY_ONE: &str = "1";

pub fn main(day: &str, part: &str, input: String) -> String {
  match day {
    DAY_ONE => return day_one::main(input, part),
    _ => return format!("{} {}", ERROR_MESSAGE, day)
  }
}
