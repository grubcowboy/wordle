

// TODO: check if word matches
function isMatch(guess) {
    // TODO: random word for answer
    const answer = 'world';
    // TODO: check to see if it is a valid word from dictionary
    if (guess.match(/[\d_\W]/)) alert('Please enter a valid word');
    else {
        const guessChars = guess.split('');
        const letters = document.getElementsByClassName('first');

        if (guess === answer) {
            for (let i = 0; i < letters.length; i++) {
                letters[i].style.backgroundColor = '#39ff14';
                letters[i].innerHTML = guessChars[i].toUpperCase();
            };
        } else {
            for (let i = 0; i < letters.length; i++) {
                const char = guessChars[i];
                letters[i].style.backgroundColor = isLetterMatch(answer, char, i);
                letters[i].innerHTML = guessChars[i].toUpperCase();
            };
        }
    }


}

isMatch('plane');

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
}



