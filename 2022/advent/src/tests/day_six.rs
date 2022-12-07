
#[cfg(test)]
mod test {
  use crate::{read_input, read_solution, days};

  #[test]
  fn day_six_part_one() {
    let input = read_input("6", true);
    let output = read_solution("6", "1");

    let result = days::day_six::main(input, "1");

    assert_eq!(result, output)
  }
}
