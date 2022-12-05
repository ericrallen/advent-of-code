use crate::{PART_TWO_INDICATOR, file};

fn part_one(input: String) -> String {
  let pairs = file::split_input_on_newline(&input, false);

  let mut number_of_complete_overlaps = 0;

  for sections in pairs {
    let section_notation: Vec<&str> = sections.split(",").collect();

    let section_one_ends: Vec<&str> = section_notation[0].split("-").collect();

    let section_one_start = section_one_ends.get(0).unwrap().parse().unwrap_or(0);

    let section_one_end = section_one_ends.get(section_one_ends.len() - 1).unwrap().parse().unwrap_or(0);

    let section_two_ends: Vec<&str> = section_notation[1].split("-").collect();

    let section_two_start = section_two_ends.get(0).unwrap().parse().unwrap_or(0);

    let section_two_end = section_two_ends.get(section_two_ends.len() - 1).unwrap().parse().unwrap_or(0);

    let section_one_values = (section_one_start..=section_one_end).collect::<Vec<i32>>();
    let section_two_values = (section_two_start..=section_two_end).collect::<Vec<i32> >();

    log!("{:?}", section_one_values);
    log!("{:?}", section_two_values);

    let section_two_contains_section_one = section_one_values.iter().all(|item| section_two_values.contains(item));

    let section_one_contains_section_two = section_two_values.iter().all(|item| section_one_values.contains(item));

    if section_one_contains_section_two || section_two_contains_section_one {
      number_of_complete_overlaps += 1;
    }
  }

  return format!("{}", number_of_complete_overlaps);
}

// TODO: abstract most of this logic as it is shared by both days and only the `.all()` and `.any()` are really different
fn part_two(input: String) -> String {
  let pairs = file::split_input_on_newline(&input, false);

  let mut number_of_partial_overlaps = 0;

  for sections in pairs {
    let section_notation: Vec<&str> = sections.split(",").collect();

    let section_one_ends: Vec<&str> = section_notation[0].split("-").collect();

    let section_one_start = section_one_ends.get(0).unwrap().parse().unwrap_or(0);

    let section_one_end = section_one_ends.get(section_one_ends.len() - 1).unwrap().parse().unwrap_or(0);

    let section_two_ends: Vec<&str> = section_notation[1].split("-").collect();

    let section_two_start = section_two_ends.get(0).unwrap().parse().unwrap_or(0);

    let section_two_end = section_two_ends.get(section_two_ends.len() - 1).unwrap().parse().unwrap_or(0);

    let section_one_values = (section_one_start..=section_one_end).collect::<Vec<i32>>();
    let section_two_values = (section_two_start..=section_two_end).collect::<Vec<i32> >();

    log!("{:?}", section_one_values);
    log!("{:?}", section_two_values);

    let section_two_contains_section_one = section_one_values.iter().any(|item| section_two_values.contains(item));

    let section_one_contains_section_two = section_two_values.iter().any(|item| section_one_values.contains(item));

    if section_one_contains_section_two || section_two_contains_section_one {
      number_of_partial_overlaps += 1;
    }
  }

  return format!("{}", number_of_partial_overlaps);
}


pub fn main(input: String, part: &str) -> String {
  match part {
    PART_TWO_INDICATOR => return part_two(input),
    _ => return part_one(input)
  }
}
