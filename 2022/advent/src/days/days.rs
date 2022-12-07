#[path = "./day_one.rs"] mod day_one;
#[path = "./day_two.rs"] mod day_two;
#[path = "./day_three.rs"] mod day_three;
#[path = "./day_four.rs"] mod day_four;
#[path = "./day_five.rs"] mod day_five;
#[path = "./day_six.rs"] mod day_six;

static ERROR_MESSAGE: &'static str = "No Solution Found for Day";

const DAY_ONE: &'static str = "1";
const DAY_TWO: &'static str = "2";
const DAY_THREE: &'static str = "3";
const DAY_FOUR: &'static str = "4";
const DAY_FIVE: &'static str = "5";
const DAY_SIX: &'static str = "6";

pub fn main(day: &str, part: &str, input: String) -> String {
  match day {
    DAY_ONE => return day_one::main(input, part),
    DAY_TWO => return day_two::main(input, part),
    DAY_THREE => return day_three::main(input, part),
    DAY_FOUR => return day_four::main(input, part),
    DAY_FIVE => return day_five::main(input, part),
    DAY_SIX => return day_six::main(input, part),
    _ => return format!("{} {}", ERROR_MESSAGE, day)
  }
}
