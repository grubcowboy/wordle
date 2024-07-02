const guessInput = document.querySelector('#guess-input');


let guesses = 0;
let winner = false;
// TODO: attach subsequent response to corresponding rows
let row;

guessInput.addEventListener("submit", e => {
    e.preventDefault();
    const input = document.querySelector('#input');
    // TODO: check to see if it is a valid word from dictionary
    if (input.value.match(/[\d_\W]/)) alert('Please enter a valid word');
    else {
        guesses++;
        console.log(guesses);
        console.log(input.value);
        if (guesses < 6) {
            isMatch(input.value, guesses);
        }
    }
    guessInput.reset();
});

function isMatch(guess, attempt) {
    // TODO: random word for answer
    const answer = 'world';

    const guessChars = guess.split('');
    console.log('getRow: ', getRow(attempt));
    const letters = document.getElementsByClassName(getRow(attempt));

    if (guess === answer) {
        for (let i = 0; i < letters.length; i++) {
            letters[i].style.backgroundColor = '#39ff14';
            letters[i].innerHTML = guessChars[i].toUpperCase();
        };
    } else {
        console.log('letters: ', letters);
        for (let i = 0; i < letters.length; i++) {
            const char = guessChars[i];
            letters[i].style.backgroundColor = isLetterMatch(answer, char, i);
            letters[i].innerHTML = guessChars[i].toUpperCase();
        };
    };


}

// isMatch('otter');

function isLetterMatch(answerString, guessChar, index) {
    const answerChars = [...answerString];
    const answerMap = {};
    answerChars.forEach(char => {
        if (answerMap[char]) {
            answerMap[char]++;
        } else {
            answerMap[char] = 1;
        }
    });
    if (answerMap[guessChar]) {
        answerMap[guessChar] -= 1;
        if (answerChars[index] === guessChar) {
            return '#39ff14';
        } else {
            return '#ffff33';
        }
    }
    return '';
};

function getRow(row) {

    let rowName = '';
    switch (row) {
        case 1:
            rowName = 'one';
            break;
        case 2:
            rowName = 'two';
            break;
        case 3:
            rowName = 'three';
            break;
        case 4:
            rowName = 'four';
            break;
        case 5:
            rowName = 'five';
            break;
    }

    return rowName;
};

