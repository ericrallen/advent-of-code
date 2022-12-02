use crate::PART_TWO_INDICATOR;

const ROCK: &'static str = "ROCK";
const PAPER: &'static str = "PAPER";
const SCISSORS: &'static str = "SCISSORS";

#[non_exhaustive]
struct Scores;

impl Scores {
  pub const WIN: i32 = 6;
  pub const DRAW: i32 = 3;
  pub const LOSE: i32 = 0;

  pub const ROCK: i32 = 1;
  pub const PAPER: i32 = 2;
  pub const SCISSORS: i32 = 3;
}

fn rock_paper_scissors(p1: &str, p2: &str) -> i32 {
  let p1_throw = decode_throw(p1);
  let p2_throw = decode_throw(p2);

  log!("{} vs {}", p1_throw, p2_throw);

  if p1_throw == p2_throw {
    return Scores::DRAW;
  } else {
    // check for rock, paper, scissors here
    if p1_throw == ROCK {
      if p2_throw == PAPER {
        return Scores::WIN;
      } else {
        return Scores::LOSE;
      }
    } else if p1_throw == PAPER {
      if p2_throw == SCISSORS {
        return Scores::WIN;
      } else {
        return Scores::LOSE;
      }
    } else {
      if p2_throw == ROCK {
        return Scores::WIN;
      } else {
        return Scores::LOSE;
      }
    }
  }
}

fn decode_throw(throw: &str) -> &str {
  return match throw {
    "A"|"X" => ROCK,
    "B"|"Y" => PAPER,
    "C"|"Z" => SCISSORS,
    _ => panic!("Must throw rock, paper, or scissors.")
  }
}

fn decode_end_state(throw: &str) -> i32 {
  return match throw {
    "X" => Scores::LOSE,
    "Y" => Scores::DRAW,
    "Z" => Scores::WIN,
    _ => panic!("Not a valid game state.")
  }
}

fn convert_throw_to_score(throw: &str) -> i32 {
  let actual_throw = match throw {
    ROCK|PAPER|SCISSORS => throw,
    _ => decode_throw(throw)
  };

  match actual_throw {
    ROCK => Scores::ROCK,
    PAPER => Scores::PAPER,
    SCISSORS => Scores::SCISSORS,
    _ => panic!("Must throw rock, paper, or scissors.")
  }
}

fn play_round(p1: &str, end_state: i32) -> &str {
  let p1_throw = decode_throw(p1);

  if p1_throw == ROCK {
    if end_state == Scores::WIN {
      return PAPER;
    } else {
      return SCISSORS;
    }
  } else if p1_throw == PAPER {
    if end_state == Scores::WIN {
      return SCISSORS;
    } else {
      return ROCK;
    }
  } else {
    if end_state == Scores::WIN {
      return ROCK;
    } else {
      return PAPER;
    }
  }

}

fn find_correct_throw(p1: &str, end_state: i32) -> i32 {
  match end_state {
    Scores::DRAW => return convert_throw_to_score(decode_throw(p1)),
    Scores::WIN|Scores::LOSE => return convert_throw_to_score(play_round(p1, end_state)),
    _ => panic!("Not a valid game state")
  }
}

fn decode_round(round: &str) -> i32 {
  let moves: Vec<&str> = round.split_whitespace().collect();

  log!("{:?}", moves);

  let p1_move = moves[0];

  let end_state = decode_end_state(moves[1]);

  let throw_points = find_correct_throw(p1_move, end_state);

  log!("{} + {}", end_state, throw_points);

  let total_points = end_state + throw_points;

  return total_points;
}

fn score_round(round: &str) -> i32 {
  let moves: Vec<&str> = round.split_whitespace().collect();

  log!("{:?}", moves);

  let p1_move = moves[0];

  let p2_move = moves[1];

  let game_outcome = rock_paper_scissors(p1_move, p2_move);

  let throw_points = convert_throw_to_score(p2_move);

  log!("{} + {}", game_outcome, throw_points);

  let total_points = game_outcome + throw_points;

  return total_points;
}

fn part_one(input: String) -> String {
  let mut rounds: Vec<&str> = input.split("\n").collect();

  rounds.retain(|&x| x != "");

  log!("{:?}", rounds);

  let scores: Vec<i32> = rounds.iter().map(|x| score_round(x)).collect();

  let final_score: i32 = scores.iter().sum();

  return format!("{}", final_score);
}

fn part_two(input: String) -> String {
  let mut rounds: Vec<&str> = input.split("\n").collect();

  rounds.retain(|&x| x != "");

  log!("{:?}", rounds);

  let scores: Vec<i32> = rounds.iter().map(|x| decode_round(x)).collect();

  let final_score: i32 = scores.iter().sum();

  return format!("{}", final_score);
}

pub fn main(input: String, part: &str) -> String {
  match part {
    PART_TWO_INDICATOR => return part_two(input),
    _ => return part_one(input)
  }
}
