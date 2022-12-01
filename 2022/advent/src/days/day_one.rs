use crate::PART_TWO_INDICATOR;

static NUMBER_OF_ELVES_TO_RETURN: usize = 3;

fn calculate_elf_calories(meals: Vec<&str>) -> i32 {
  return meals.iter().flat_map(|x| x.parse::<i32>()).sum()
}

fn part_one(input: String) -> String {
  let mut most_calories:i32 = 0;

  let elves: Vec<&str> = input.split("\n\n").collect();

  for elf in elves {
    let meals: Vec<&str> = elf.split_whitespace().collect();

    let total_calories: i32 = calculate_elf_calories(meals);

    if total_calories > most_calories {
      most_calories = total_calories
    }
  }

  return format!("The elf with the most calories has:\n{}", most_calories);
}


fn part_two(input: String) -> String {
  let elves: Vec<&str> = input.split("\n\n").collect();

  let mut total_calories: Vec<i32> = elves.iter().map(|x| calculate_elf_calories(x.split_whitespace().collect())).collect();

  total_calories.sort_by(|a, b| b.cmp(a));

  let top_calories: i32 = total_calories.iter().take(NUMBER_OF_ELVES_TO_RETURN).sum();

  return format!("The {} elves with the most calories have\n{:?}", NUMBER_OF_ELVES_TO_RETURN, top_calories);
}


pub fn main(input: String, part: &str) -> String {
  match part {
    PART_TWO_INDICATOR => return part_two(input),
    _ => return part_one(input)
  }
}
