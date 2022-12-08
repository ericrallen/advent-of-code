use crate::PART_TWO_INDICATOR;

const PACKET_MARKER_LENGTH: usize = 4;
const MESSAGE_BUFFER_LENGTH: usize = 14;

fn check_for_unique_sequence(sequence: &str, size: usize) -> bool {
  let mut sequence_array: Vec<char> = sequence.chars().collect();

  log!("{:?}", sequence_array);

  sequence_array.sort();
  sequence_array.dedup();

  sequence_array.len() == size
}

fn get_sequence(stream: &String, start: usize, end: usize) -> Option<&str> {
  stream.get(start..end)
}

fn find_end_of_sequence(stream: &String, length: usize) -> usize {
  let first_sequence = get_sequence(stream, 0, length).unwrap();

  let mut sequence_end_index: usize = 0;

  if check_for_unique_sequence(first_sequence, length) {
    return length;
  } else {
    for (index, _) in stream.chars().enumerate() {
      // skip first character since we already checked the first sequence
      if index > 0 {
        let test_sequence = get_sequence(stream, index, index + length).unwrap();

        if check_for_unique_sequence(test_sequence, length) {
          sequence_end_index = index + length;

          break;
        }
      }
    }
  }

  return sequence_end_index;
}

fn part_one(input: String) -> String {
  let marker_end = find_end_of_sequence(&input, PACKET_MARKER_LENGTH);

  return format!("{marker_end}");
}


fn part_two(input: String) -> String {
  let marker_end = find_end_of_sequence(&input, MESSAGE_BUFFER_LENGTH);

  return format!("{marker_end}");
}


pub fn main(input: String, part: &str) -> String {
  match part {
    PART_TWO_INDICATOR => return part_two(input),
    _ => return part_one(input)
  }
}

#[cfg(test)]
mod test {
  use crate::{read_input, read_solution, days};

  #[test]
  fn day_six_part_one() {
    let input = read_input("6", true);
    let output = read_solution("6", "1");

    let result = days::day_six::part_one(input);

    assert_eq!(result, output)
  }

  #[test]
  fn day_six_part_one_extra() {
    let inputs = ["bvwbjplbgvbhsrlpgdmjqwftvncz", "nppdvjthqldpwncqszvftbrmjlhg", "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"];
    let outputs = ["5", "6", "10", "11"];

    for (index, input) in inputs.iter().enumerate() {
      let result = days::day_six::part_one(input.to_string());

      assert_eq!(result, outputs[index]);
    }
  }

  #[test]
  fn day_six_part_two() {
    let inputs = ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", "bvwbjplbgvbhsrlpgdmjqwftvncz", "nppdvjthqldpwncqszvftbrmjlhg", "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"];
    let outputs = ["19", "23", "23", "29", "26"];

    for (index, input) in inputs.iter().enumerate() {
      let result = days::day_six::part_two(input.to_string());

      assert_eq!(result, outputs[index]);
    }
  }
}
