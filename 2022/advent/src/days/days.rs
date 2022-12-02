#[path = "./day_one.rs"] mod day_one;
#[path = "./day_two.rs"] mod day_two;

static ERROR_MESSAGE: &'static str = "No Solution Found for Day";

const DAY_ONE: &'static str = "1";
const DAY_TWO: &'static str = "2";

pub fn main(day: &str, part: &str, input: String) -> String {
  match day {
    DAY_ONE => return day_one::main(input, part),
    DAY_TWO => return day_two::main(input, part),
    _ => return format!("{} {}", ERROR_MESSAGE, day)
  }
}
