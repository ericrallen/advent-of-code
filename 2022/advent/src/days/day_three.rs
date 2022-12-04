use crate::PART_TWO_INDICATOR;

static EMPTY_STR: &str = "";
static CHARACTERS: &'static str = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
static ELVES_IN_GROUP: usize = 3;

fn check_duplicates<'a>(item: char, pocket: &str) -> Vec<&str> {
  let test: Vec<&str> = pocket.matches(item).collect();

  return test;
}

fn find_duplicates<'a>(pocket_one: &'a str, pocket_two: &'a str) -> Vec<&'a str> {
  let mut duplicate_items: Vec<&str> = pocket_one.chars().map(|x| check_duplicates(x, pocket_two)).flatten().filter(|&x| x != EMPTY_STR).collect();

  duplicate_items.dedup();

  log!("{:?}", duplicate_items);

  return duplicate_items;
}

fn convert_to_priority(item: char) -> i32 {
  let priority_value = CHARACTERS.find(item).unwrap_or(0) as i32;

  log!("ITEM: {}", priority_value);

  return priority_value;
}

fn find_group_badge<'a>(groups: &&[&'a str]) -> char {
  let group_one = groups.get(0).unwrap_or(&EMPTY_STR);
  let group_two = groups.get(1).unwrap_or(&EMPTY_STR);
  let group_three = groups.get(2).unwrap_or(&EMPTY_STR);

  log!("{:?}, {:?}, {:?}", group_one, group_two, group_three);

  let mut group_id: Vec<_> = group_one.chars().filter(|x| group_two.matches(*x).collect::<Vec<&str>>().len() > 0 && group_three.matches(*x).collect::<Vec<&str>>().len() > 0).collect();

  group_id.dedup();

  log!("{:?}", group_id);

  let group_badge = group_id.get(0).unwrap_or(&CHARACTERS.chars().nth(0).unwrap()).to_owned();

  log!("{:?}", group_badge);

  return group_badge;
}

fn part_one(input: String) -> String {
  let packs: Vec<&str> = input.split_whitespace().collect();

  log!("{:?}", packs);

  let pockets: Vec<(&str, &str)> = packs.iter().map(|x| x.split_at(x.len() / 2)).collect();

  log!("{:?}", pockets);

  let duplicates: Vec<&str> = pockets.iter().map(|(x, y)| find_duplicates(&x, &y)).flatten().collect();

  log!("{:?}", duplicates);

  let priorities: Vec<i32> = duplicates.join("").chars().map(|x| convert_to_priority(x)).collect();

  log!("{:?}", priorities);

  let total_priority: i32 = priorities.iter().sum();

  log!("{:?}", total_priority);

  return format!("{}", total_priority);
}

fn part_two(input: String) -> String {
  let packs: Vec<&str> = input.split_whitespace().collect();

  log!("{:?}", packs);

  let groups: Vec<&[&str]> = packs.chunks(ELVES_IN_GROUP).collect();

  log!("{:?}", groups);

  let badges: Vec<char> = groups.iter().map(|x| find_group_badge(x)).collect();

  log!("{:?}", badges);

  let priorities: Vec<i32> = badges.iter().map(|x| convert_to_priority(*x)).collect();

  log!("{:?}", priorities);

  let total_priority: i32 = priorities.iter().sum();

  log!("{:?}", total_priority);

  return format!("{}", total_priority);
}


pub fn main(input: String, part: &str) -> String {
  match part {
    PART_TWO_INDICATOR => return part_two(input),
    _ => return part_one(input)
  }
}
