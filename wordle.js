const guessInput = document.querySelector('#guess-input');

// TODO: random word for answer
const answer = 'world';
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
            isMatch(answer, input.value, guesses);
        }
    }
    guessInput.reset();
});

function isMatch(answer, guess, attempt) {

    const answerChars = [...answer];

    const guessChars = guess.split('');
    console.log('getRow: ', getRow(attempt));
    const letters = document.getElementsByClassName(getRow(attempt));

    if (guess === answer) {
        for (let i = 0; i < letters.length; i++) {
            letters[i].style.backgroundColor = '#39ff14';
            letters[i].innerHTML = guessChars[i].toUpperCase();
        };
    } else {
        const answerMap = {};
        answerChars.forEach(char => {
            if (answerMap[char]) {
                answerMap[char]++;
            } else {
                answerMap[char] = 1;
            }
        });
        isGreen(answerChars, guessChars, answerMap, letters);
        isYellow(answerChars, guessChars, answerMap, letters);
    };


}

function isGreen(answerChars, guessChars, answerMap, letters) {

    for (let i = 0; i < letters.length; i++) {
        letters[i].innerHTML = guessChars[i].toUpperCase();
        console.log(`AnswerMap[${answerChars[i]}] BEFORE: ${answerMap[answerChars[i]]}`)
        if (answerChars[i] === guessChars[i]) {
            letters[i].style.backgroundColor = '#39ff14';
            answerMap[answerChars[i]]--;
            console.log(`AnswerMap[${answerChars[i]}] AFTER: ${answerMap[answerChars[i]]}`)
        }
    };
}

function isYellow(answerChars, guessChars, answerMap, letters) {
    for (let i = 0; i < letters.length; i++) {
        console.log(`answerMap[${guessChars[i]}]: ${answerMap[guessChars[i]]}`);
        if (answerMap[guessChars[i]] > 0) {
            answerMap[guessChars[i]]--;
            letters[i].style.backgroundColor = '#ffff33';
        }
    }
}

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

