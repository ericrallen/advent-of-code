use crate::PART_TWO_INDICATOR;

fn check_duplicates<'a>(item: &'a str, pocket: &str) -> Vec<&'a str> {
  let test: Vec<&str> = pocket.matches(item).collect();

  log!("{:?}", test);

  return test;
}

fn find_duplicates<'a>(pocket_one: &'a str, pocket_two: &str) -> Vec<&'a str> {
  let duplicate_items: Vec<_> = pocket_one.split("").map(|x| check_duplicates(x, pocket_two)).flatten().collect();

  log!("{:?}", duplicate_item);

  return duplicate_items;
}

fn convert_to_priority(item: &str) -> i32 {
  log!("{}", item);

  return 0;
}

fn part_one(input: String) -> String {
  let packs: Vec<&str> = input.split_whitespace().collect();

  log!("{:?}", packs);

  let pockets: Vec<(&str, &str)> = packs.iter().map(|x| x.split_at(x.len() / 2)).collect();

  log!("{:?}", pockets);

  // TODO: figure out why this doesn't cooperate
  let duplicates: Vec<&str> = pockets.iter().map(|(x, y)| find_duplicates(x, y)).collect();

  log!("{:?}", duplicates);

  let priorities: Vec<i32> = duplicates.iter().map(|x| convert_to_priority(x)).collect();

  let total_priority: i32 = priorities.iter().sum();

  log!("{:?}", total_priority);

  return format!("{}", total_priority);
}


fn part_two(_input: String) -> String {
  return format!("PART TWO");
}


pub fn main(input: String, part: &str) -> String {
  match part {
    PART_TWO_INDICATOR => return part_two(input),
    _ => return part_one(input)
  }
}
