use crate::PART_TWO_INDICATOR;

const PACKET_MARKER_LENGTH: usize = 4;
const MESSAGE_BUFFER_LENGTH: usize = 14;

fn check_for_unique_sequence(sequence: &str, size: usize) -> bool {
  let mut sequence_array: Vec<char> = sequence.chars().collect();

  log!("{:?}", sequence_array.join());

  // `.dedup()` only removes consecutive duplicates
  // so it needs a sorted Vector for our use case
  sequence_array.sort();
  sequence_array.dedup();

  sequence_array.len() == size
}

fn get_sequence(stream: &String, start: usize, end: usize) -> Option<&str> {
  // this could have just been a regular `.get()` call in the code below
  // but having the index math in the Range was hard to read
  stream.get(start..end)
}

fn find_end_of_sequence(stream: &String, length: usize) -> usize {
  // check the first N characters before we start iterating
  let first_sequence = get_sequence(stream, 0, length).unwrap();

  if check_for_unique_sequence(first_sequence, length) {
    length
  } else {
    // we'll update this once we find the right ending index
    // TODO: find a pattern that can make this `panic!()` if we
    // never find a unique sequence
    let mut sequence_end_index: usize = 0;

    for (index, _) in stream.chars().enumerate() {
      // skip first character since we already checked the first sequence
      if index > 0 {
        // get the next sequence to check
        let test_sequence = get_sequence(stream, index, index + length).unwrap();

        if check_for_unique_sequence(test_sequence, length) {
          sequence_end_index = index + length;

          break;
        }
      }
    }

    sequence_end_index
  }
}

fn part_one(input: String) -> String {
  let marker_end = find_end_of_sequence(&input, PACKET_MARKER_LENGTH);

  format!("{marker_end}")
}


fn part_two(input: String) -> String {
  let marker_end = find_end_of_sequence(&input, MESSAGE_BUFFER_LENGTH);

  format!("{marker_end}")
}


pub fn main(input: String, part: &str) -> String {
  match part {
    PART_TWO_INDICATOR => part_two(input),
    _ => part_one(input)
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
    let inputs = [
      "bvwbjplbgvbhsrlpgdmjqwftvncz",
      "nppdvjthqldpwncqszvftbrmjlhg",
      "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
      "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"
    ];

    let outputs = ["5", "6", "10", "11"];

    for (index, input) in inputs.iter().enumerate() {
      let result = days::day_six::part_one(input.to_string());

      assert_eq!(result, outputs[index]);
    }
  }

  #[test]
  fn day_six_part_two() {
    let inputs = [
      "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
      "bvwbjplbgvbhsrlpgdmjqwftvncz",
      "nppdvjthqldpwncqszvftbrmjlhg",
      "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
      "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"
    ];

    let outputs = ["19", "23", "23", "29", "26"];

    for (index, input) in inputs.iter().enumerate() {
      let result = days::day_six::part_two(input.to_string());

      assert_eq!(result, outputs[index]);
    }
  }
}
