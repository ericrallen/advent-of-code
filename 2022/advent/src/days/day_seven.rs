use std::{collections::HashMap, slice::SliceIndex};

use regex::{Regex, Captures};

use crate::{PART_TWO_INDICATOR, file};

const SIZE_THRESHOLD: usize = 10000;
const COMMAND_PREFIX: char = '$';
const CD_COMMAND: &str = "cd";
const LS_COMMAND: &str = "ls";
const PREV_DIRECTORY: &str = "..";

#[derive(Debug, Clone)]
struct Command {
  command: String,
  args: Vec<String>,
}

#[derive(Debug, Clone)]
struct FileSystemItem<'a> {
  name: String,
  size: Option<usize>,
  parent: Option<&'a String>,
  children: Option<Vec<FileSystemItem<'a>>>,
  extension: Option<String>,
}

impl PartialEq for FileSystemItem<'_> {
  fn eq(&self, other: &FileSystemItem) -> bool {
      self.name == other.name
        && self.size == other.size
        && self.extension == other.extension
        && self.parent == other.parent
        && self.children == other.children
  }
}

impl FileSystemItem<'_> {
  fn get_size(&self) -> usize {
    get_size(self)
  }

  fn set_size(&mut self, size: usize) {
    self.size = Some(size)
  }
}

fn get_size(item: &FileSystemItem) -> usize {
  // TODO: figure out why rust hates this
  let children = item.children.unwrap_or(vec!());

  if !children.is_empty() {
    children.iter().map(get_size).collect::<Vec<usize>>().iter().sum()
  } else {
    item.size.unwrap_or(0)
  }
}

fn parse_regex(line: &str, expression: Regex) -> Captures {
  expression.captures(line).unwrap()
}

fn extract_capture_from_regex(name: &str, captures: &Captures) -> String {
  match captures.name(name) {
    Some(name) => name.as_str().to_string(),
    None => "".to_string()
  }
}

fn read_command(command: &str) -> Command {
  let command_regex = Regex::new(r"^\$ (?P<command>\S+)\s?(?P<args>.+)?$").unwrap();

  let parsed_command = parse_regex(command, command_regex);

  Command {
    command: extract_capture_from_regex("command", &parsed_command),
    args: extract_capture_from_regex("args", &parsed_command).split_whitespace().map(|x| x.to_string()).collect(),
  }
}

fn read_file<'a>(file: &str, parent:&'a String) -> FileSystemItem<'a> {
  let file_regex = Regex::new(r"^(?P<filesize>\d+)\s(?P<filename>(?P<name>\S+).?(?P<extension>\S+)?)$").unwrap();

  let parsed_file = parse_regex(file, file_regex);

  let file_name = extract_capture_from_regex("filename", &parsed_file);
  let extension = extract_capture_from_regex("extension", &parsed_file);
  let file_size: usize = extract_capture_from_regex("filesize", &parsed_file).parse().unwrap();

  let file = FileSystemItem {
    name: file_name,
    size: Some(file_size),
    parent: Some(parent),
    children: Some(vec!()),
    extension: Some(extension),
  };

  file
}

fn read_dir<'a>(dir: &str, parent: &'a String) -> FileSystemItem<'a> {
  let directory_regex = Regex::new(r"^dir (?P<directory>\S+)$").unwrap();

  let parsed_dir = parse_regex(dir, directory_regex);

  let dir_name = extract_capture_from_regex("directory", &parsed_dir);

  FileSystemItem {
    name: dir_name,
    size: Some(0),
    parent: Some(parent),
    children: Some(vec!()),
    extension: Some("/".to_string()),
  }
}

fn part_one(input: String) -> String {
  let root_dir_name = "root".to_string();
  let empty_parent_string = "".to_string();

  let mut directory_map: HashMap<String, FileSystemItem> = HashMap::new();

  let mut current_directory: &String = &root_dir_name;

  let mut root_directory = FileSystemItem {
    name: root_dir_name.to_string(),
    size: Some(0),
    parent: Some(&empty_parent_string),
    children: Some(vec!()),
    extension: Some("/".to_string()),
  };

  directory_map.insert(root_directory.name.to_string(), root_directory);

  let lines = file::split_input_on_newline(&input, false);

  for line in lines {
    if line.starts_with('$') {
      let command = read_command(line);

      let args = command.args;

      if command.command.eq(CD_COMMAND) {
        if args.get(0).unwrap().to_owned() != PREV_DIRECTORY {
          let directory_name = args.get(0).unwrap();

          current_directory = directory_name;

          log!("moving into directory {:?}", current_directory);

          if !directory_map.contains_key(current_directory) {
            let directory = FileSystemItem {
              name: current_directory.to_string(),
              size: Some(0),
              parent: Some(&current_directory),
              children: Some(vec!()),
              extension: Some("/".to_string()),
            };

            directory_map.insert(current_directory.to_string(), directory);
          }
        } else {
          let directory = directory_map.get(current_directory).unwrap_or(&root_directory);

          let parent = directory.parent.unwrap_or(&"root".to_string());

          current_directory = parent;
        }
      } else {
        log!("executing {:?} in {:?}", command.command, current_directory);
      }
    } else if line.get(0..=2).unwrap() == "dir" {
      let dir = read_dir(line, &current_directory);

      if !directory_map.contains_key(&dir.name) {
        let parent_dir: &FileSystemItem = *directory_map.get(current_directory).as_mut().unwrap();

        // TODO: figure out why rust hates this
        parent_dir.children.unwrap().push(dir);

        // TODO: figure out why rust hates this
        directory_map.insert(dir.name, dir);
      }
    } else if line.chars().next().unwrap().is_numeric() {
      let file = read_file(line, &current_directory);

      let parent_dir = directory_map.get(current_directory).unwrap();

      // TODO: figure out why rust hates this
      parent_dir.children.unwrap().push(file);
    }
  }

  log!("{:?}", directories);

  format!("PART ONE")
}

fn part_two(_input: String) -> String {
  format!("PART TWO")
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
  fn day_seven_part_one() {
    let input = read_input("7", true);
    let output = read_solution("7", "1");

    let result = days::day_seven::part_one(input);

    assert_eq!(result, output)
  }
}
