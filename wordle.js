// TODO: Fix mobile version UI
// TODO: Add guess count logic/winning state
// TODO: Host on GHPages

const fetchWords = async () => {
    try {
        const res = await fetch('https://grubcowboy.github.io/wordList.json');
        const data = await res.json();
        let rand = Math.floor(Math.random() * data.words.length);
        let answer = data.words[rand];
        console.log(answer);

        const keys = document.querySelectorAll('p');
        keys.forEach(key => {
            key.innerHTML = key.textContent.toUpperCase();
        });

        const guessInput = document.querySelector('#guess-input');

        let guesses = 0;
        let winner = false;
        let row;

        guessInput.addEventListener("submit", e => {
            e.preventDefault();

            const input = document.querySelector('#input');
            // TODO: check to see if it is a valid word from dictionary
            if (input.value.match(/[\d_\W]/) || data.words.filter(word => word === input.value).length === 0) {
                alert('Please enter a valid word');
            } else {
                guesses++;
                if (guesses < 6) {
                    isMatch(answer, input.value, guesses);
                }
            }
            guessInput.reset();
        });
    } catch (err) {
        console.log(err);
    }
};
fetchWords();


function isMatch(answer, guess, attempt) {

    const answerChars = [...answer];

    const guessChars = guess.split('');
    const letters = document.getElementsByClassName(getRow(attempt));



    if (guess === answer) {
        for (let i = 0; i < letters.length; i++) {
            letters[i].style.backgroundColor = 'var(--green)';
            letters[i].innerHTML = guessChars[i].toUpperCase();
        };
        guessChars.forEach(char => {
            const letter = document.querySelector(`#${char}`);
            letter.style.backgroundColor = 'var(--green)';
            // letter.style.fontWeight = 'bold';
        });
    } else {
        const answerMap = {};
        answerChars.forEach(char => {
            if (answerMap[char]) {
                answerMap[char]++;
            } else {
                answerMap[char] = 1;
            }
        });
        guessChars.forEach(char => {
            const letter = document.querySelector(`#${char}`);
            letter.style.backgroundColor = 'var(--gray)';
        });
        isGreen(answerChars, guessChars, answerMap, letters);
        isYellow(answerChars, guessChars, answerMap, letters);
    };


}

function isGreen(answerChars, guessChars, answerMap, letters) {

    for (let i = 0; i < letters.length; i++) {
        letters[i].innerHTML = guessChars[i].toUpperCase();
        letters[i].style.backgroundColor = 'var(--gray)';
        if (answerChars[i] === guessChars[i]) {
            letters[i].style.backgroundColor = 'var(--green)';
            letters[i].className += ' green';
            answerMap[answerChars[i]]--;
            let letter = document.querySelector(`#${guessChars[i]}`);
            letter.style.backgroundColor = 'var(--green)';
        }
    };
}

function isYellow(answerChars, guessChars, answerMap, letters) {
    for (let i = 0; i < letters.length; i++) {
        if (answerMap[guessChars[i]] > 0 && !letters[i].classList.contains('green')) {
            answerMap[guessChars[i]]--;
            letters[i].style.backgroundColor = 'var(--yellow)';
            letters[i].className += " yellow";
            let letter = document.querySelector(`#${guessChars[i]}`);
            letter.style.backgroundColor = 'var(--yellow)';
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

