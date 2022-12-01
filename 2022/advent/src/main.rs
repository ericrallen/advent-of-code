use std::env;
use std::fs;

#[path = "./days/days.rs"] mod days;

static DEBUGGING: bool = true;

static DEFAULT_DAY: &'static str = "1";
static DEFAULT_PART: &'static str = "1";

const PART_TWO_INDICATOR: &'static str = "2";

const TEST_FLAG: &'static str = "test";

fn main() {
    let args: Vec<String> = env::args().collect();

    let actual_args = &args[1..args.len()];

    if DEBUGGING {
        println!("Arguments:\n{:?}", actual_args);
    }

    let is_test: bool = actual_args[0] == TEST_FLAG;

    if DEBUGGING {
        println!("Testing: {}", is_test);
    }

    let day = if actual_args.len() > 2 {
        &actual_args[1]
    } else if args.len() > 0 && !is_test {
        &actual_args[0]
    } else {
        DEFAULT_DAY
    };

    let part = if actual_args.len() > 2 {
        &actual_args[2]
    } else if actual_args.len() > 1 && !is_test {
        &actual_args[1]
    } else {
        DEFAULT_PART
    };

    if DEBUGGING {
        println!("Day: {}\nPart: {}", day, part);
    }

    let input: String = read_input(day, is_test);

    println!("{}", days::main(day, part, input));
}

fn read_input(day: &str, is_test: bool) -> String {
    let file_extension = match is_test {
        true => "test",
        _ => "dat"
    };

    let file_path = format!("../inputs/day-{}.{}", day, file_extension);

    if DEBUGGING {
        println!("In file {}", file_path);
    }

    // borrowed from: https://doc.rust-lang.org/book/ch12-02-reading-a-file.html
    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");

    return contents;
}
