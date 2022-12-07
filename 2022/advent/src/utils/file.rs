pub fn split_input_on_newline(input: &String, keep_empty_entries: bool) -> Vec<&str> {
  let mut input_vec: Vec<&str> = input.split("\n").collect();

  if !keep_empty_entries {
    input_vec.retain(|&x| x != "");
  }

  input_vec
}

pub fn split_on_whitespace_and_filter_empty(input: &str) -> Vec<&str> {
  let mut input_vec: Vec<&str> = input.split_whitespace().collect();

  input_vec.retain(|&x| x != "");

  input_vec
}
