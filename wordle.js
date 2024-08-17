const form = document.querySelector('#guess-input');
const btn = document.querySelector('#btn');
const table = document.querySelector('#attempts');
const tbody = document.querySelector('#attempts').querySelector('tbody');
const keys = document.querySelectorAll('p');
const input = document.createElement('input');


class Wordle {
    constructor(words) {
        this.words = words;
        this.reset();
    }

    newWord() {
        let rand = Math.floor(Math.random() * this.words.length);
        this.answer = this.words[rand];
        console.log(this.answer);
    }

    reset() {
        resetGame();
        this.guesses = 0;
        this.finished = false;
        this.newWord();
    }

    isMatch(guess) {
        const answerChars = [...this.answer];
        const guessChars = guess.split('');
        const letters = document.getElementsByClassName(getRow(this.guesses));

        // Correct answer
        if (guess === this.answer) {
            for (let i = 0; i < letters.length; i++) {
                letters[i].style.backgroundColor = 'var(--green)';
                letters[i].innerHTML = guessChars[i].toUpperCase();
            };

            guessChars.forEach(char => {
                const keyboard = document.querySelector(`#${char}`);
                keyboard.style.backgroundColor = 'var(--green)';
            });

            return true;
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

            return false;
        };
    }

}

const fetchWords = async () => {
    try {
        const res = await fetch('https://grubcowboy.github.io/wordle/wordList.json');
        const data = await res.json();
        return data.words;
    } catch (err) {
        console.log(err);
        return [];
    }
};

const init = async () => {
    const words = await fetchWords();

    const game = new Wordle(words);

    form.addEventListener("submit", e => {
        e.preventDefault();

        if (game.finished) {
            game.reset();
            return;
        };

        if (!input.value.match(/[\d_\W]/) && words.filter(word => word === input.value).length !== 0) {
            game.guesses++;
            if (game.guesses < 7) {
                if (game.isMatch(input.value)) {
                    game.finished = true;
                }

                if (game.guesses === 6) {
                    game.finished = true;
                }

                if (game.finished) {
                    input.remove();
                    btn.innerHTML = 'REPLAY';
                }
            }
        }
        form.reset();
    });
};

init();



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
        case 6:
            rowName = 'six';
            break;
    }

    return rowName;
};

function addRows() {
    for (let x = 0; x < 6; x++) {
        var row = tbody.insertRow();
        for (let i = 0; i < 5; i++) {
            const cell = row.insertCell();
            cell.setAttribute('class', `${getRow(x + 1)}`);
        }
    }

}

function resetGame() {
    let rowCount = table.rows.length;
    for (let x = 0; x < rowCount; x++) {
        table.deleteRow(0);
    }
    keys.forEach(key => {
        key.innerHTML = key.textContent.toUpperCase();
        key.style.backgroundColor = 'white';
    });
    input.setAttribute('id', 'input');
    input.setAttribute('autocomplete', 'off');
    form.insertBefore(input, form.childNodes[0]);
    form.reset();
    btn.innerHTML = 'CHECK';
    addRows();
}