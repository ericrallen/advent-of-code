#[path = "./day_one.rs"] mod day_one;
#[path = "./day_two.rs"] mod day_two;
#[path = "./day_three.rs"] mod day_three;
#[path = "./day_four.rs"] mod day_four;
#[path = "./day_five.rs"] mod day_five;
#[path = "./day_six.rs"] mod day_six;
#[path = "./day_seven.rs"] mod day_seven;

static ERROR_MESSAGE: &str = "No Solution Found for Day";

const DAY_ONE: &str = "1";
const DAY_TWO: &str = "2";
const DAY_THREE: &str = "3";
const DAY_FOUR: &str = "4";
const DAY_FIVE: &str = "5";
const DAY_SIX: &str = "6";
const DAY_SEVEN: &str = "7";

pub fn main(day: &str, part: &str, input: String) -> String {
  match day {
    DAY_ONE => day_one::main(input, part),
    DAY_TWO => day_two::main(input, part),
    DAY_THREE => day_three::main(input, part),
    DAY_FOUR => day_four::main(input, part),
    DAY_FIVE => day_five::main(input, part),
    DAY_SIX => day_six::main(input, part),
    DAY_SEVEN => day_seven::main(input, part),
    _ => format!("{} {}", ERROR_MESSAGE, day)
  }
}
