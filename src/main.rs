use rand::{thread_rng, Rng};
use std::fs::File;
use std::io::{self, BufRead, BufReader};

const WORD_LENGTH: u8 = 5;

fn main() {
    let words = get_words(WORD_LENGTH);

    println!("words.len(): {}", words.len());

    let mut rng = thread_rng();
    let answer: usize = rng.gen_range(0..words.len());
    println!("{}", answer);

    let solution = &words[answer];
    println!("{}", solution);

    let mut attempt_count = 0;
    let max_guesses = 6;
    let mut correct = false;

    while attempt_count < max_guesses && !correct {
        println!("Type word to play: {}", attempt_count);

        let mut input = String::new();
        io::stdin().read_line(&mut input).unwrap(); // TODO: Handle err
        correct = check_answer(solution, input);

        attempt_count += 1;
    }

    if attempt_count >= max_guesses {
        println!("You lose :(");
    } else {
        println!("You win!");
    }

    // TODO:
    // * Don't hard code the word
    // * Add basic UI
}

fn get_words(length: u8) -> Vec<String> {
    let file = File::open("/usr/share/dict/words").unwrap();
    let reader = BufReader::new(file);
    let mut words = vec![];

    for line in reader.lines() {
        //println!("{}", line.unwrap());
        let word = line.unwrap();
        if word.trim().len() as u8 == length {
            words.push(word);
        }
    }

    // TODO: Finish
    words
}

fn check_answer(sol: &String, s: String) -> bool {
    let answer = sol.to_string();
    println!("{}", answer);
    let s = s.trim();

    answer == s
}
