use regex::Regex;

use crate::{PART_TWO_INDICATOR, file};

const EMPTY_SPOT: char = '_';

fn parse_instruction(instruction: &str) -> (i32, i32, i32) {
  // RegExr example: https://regexr.com/743ir
  let parser: Regex = Regex::new(r"^move (?P<number_of_crates>\d+) from (?P<from_stack>\d+) to (?P<to_stack>\d+)$").unwrap();

  let caps = parser.captures(&instruction).unwrap();

  return (caps["number_of_crates"].parse().unwrap(), caps["from_stack"].parse().unwrap(), caps["to_stack"].parse().unwrap());
}

fn part_one(input: String) -> String {
  let mut puzzle: Vec<&str> = input.split("\n\n").collect();

  let instruction_list = puzzle.pop().unwrap().to_string();

  let instructions = file::split_input_on_newline(&instruction_list, false);

  let mut starting_stacks: Vec<&str> = puzzle.pop().unwrap().split("\n").collect();

  let column_numbers = starting_stacks.pop().unwrap();

  let mut modified_stacks: Vec<String> = starting_stacks
    .iter()
    .map(|layer| {
      layer
        .replace("[", "")
        .replace("]", "")
        .replace("    ", "_")
        .replace(" ", "")
    })
    .collect()
  ;

  let mut columns: Vec<i32> = file::split_on_whitespace_and_filter_empty(column_numbers).iter().map(|x| x.parse().unwrap()).collect();

  modified_stacks.reverse();

  let mut stacks: Vec<Vec<char>> = vec!();

  for _ in 0..columns.len() {
    stacks.push(vec!())
  }

  for row in modified_stacks.to_owned().iter() {
    let crates = row.chars().collect::<Vec<char>>();

    for (stack_number, single_crate) in crates.iter().enumerate() {
      // ignore our fake crates from earlier
      if single_crate.ne(&EMPTY_SPOT) {
        stacks[stack_number].push(single_crate.to_owned())
      }
    }
  }

  log!("{:?}", stacks);

  // add an exmpty starting column so that we don't have to translate indexes later on
  columns.insert(0, 0);
  stacks.insert(0, vec!(EMPTY_SPOT));

  for instruction in instructions {
    let (number_of_crates, from_stack_index, to_stack_index) = parse_instruction(instruction);

    log!("moving {} crates from stack {} to stack {}", number_of_crates, from_stack_index, to_stack_index);

    for _ in 0..number_of_crates {
      let moving_crate = stacks[from_stack_index as usize].pop().unwrap();

      stacks[to_stack_index as usize].push(moving_crate);
    }

    log!("{:?}", stacks);
  }

  let top_crates: Vec<String> = stacks.iter().map(|x| {
    x
      .get(x.len() - 1)
      .unwrap()
      .to_string()
  })
  .filter(|x| x.ne(&EMPTY_SPOT.to_string()))
  .collect();

  return format!("{}", top_crates.join(""));
}


fn part_two(input: String) -> String {
  let mut puzzle: Vec<&str> = input.split("\n\n").collect();

  let instruction_list = puzzle.pop().unwrap().to_string();

  let instructions = file::split_input_on_newline(&instruction_list, false);

  let mut starting_stacks: Vec<&str> = puzzle.pop().unwrap().split("\n").collect();

  let column_numbers = starting_stacks.pop().unwrap();

  let mut modified_stacks: Vec<String> = starting_stacks
    .iter()
    .map(|layer| {
      layer
        .replace("[", "")
        .replace("]", "")
        .replace("    ", "_")
        .replace(" ", "")
    })
    .collect()
  ;

  let mut columns: Vec<i32> = file::split_on_whitespace_and_filter_empty(column_numbers).iter().map(|x| x.parse().unwrap()).collect();

  modified_stacks.reverse();

  let mut stacks: Vec<Vec<char>> = vec!();

  for _ in 0..columns.len() {
    stacks.push(vec!())
  }

  for row in modified_stacks.to_owned().iter() {
    let crates = row.chars().collect::<Vec<char>>();

    for (stack_number, single_crate) in crates.iter().enumerate() {
      // ignore our fake crates from earlier
      if single_crate.ne(&EMPTY_SPOT) {
        stacks[stack_number].push(single_crate.to_owned())
      }
    }
  }

  log!("{:?}", stacks);

  // add an exmpty starting column so that we don't have to translate indexes later on
  columns.insert(0, 0);
  stacks.insert(0, vec!(EMPTY_SPOT));

  for instruction in instructions {
    let (number_of_crates, from_stack_index, to_stack_index) = parse_instruction(instruction);

    log!("moving {} crates from stack {} to stack {}", number_of_crates, from_stack_index, to_stack_index);

    let from_stack_start_index = stacks[from_stack_index as usize].len() - (number_of_crates as usize);
    let to_stack_start_index = stacks[to_stack_index as usize].len();

    let moving_crates: Vec<char> = stacks[from_stack_index as usize]
      .splice(
        from_stack_start_index..,
        []
      )
      .collect()
    ;

    stacks[to_stack_index as usize].splice(
      to_stack_start_index..,
      moving_crates
    );

    log!("{:?}", stacks);
  }

  let top_crates: Vec<String> = stacks.iter().map(|x| {
    x
      .get(x.len() - 1)
      .unwrap()
      .to_string()
  })
  .filter(|x| x.ne(&EMPTY_SPOT.to_string()))
  .collect();

  return format!("{}", top_crates.join(""));
}


pub fn main(input: String, part: &str) -> String {
  match part {
    PART_TWO_INDICATOR => return part_two(input),
    _ => return part_one(input)
  }
}
