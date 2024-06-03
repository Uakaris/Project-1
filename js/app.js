// I need to turn the cats into an array...
// I want to create a function that iterates through the cats array at random
// I want to have a play button
// The play button will call the function that iterates over the cats array
// I want a function that iterates over the cat array, starting with just one and increasing by one each time (a for() loop could be used here)


/*-------------------------------- Constants --------------------------------*/
// const gamePlayOptions = 
const emojis = ['🫠','🫠', '🐓', '🐓', '🦭', '🦭', '🌵', '🌵', '💩', '💩', '😾', '😾', '👾', '👾', '🥚', '🥚'];
/*---------------------------- Variables (state) ----------------------------*/
const elementemojiArray = emojis.map(id => document.getElementById(id));
let board;
let gameStart;
let gameOver;
/*------------------------ Cached Element References ------------------------*/
const squareElement = document.querySelectorAll('.sqr');
const resultDisplayElement = document.querySelector('#message');
const boardElement = document.querySelector('.board');
const resetButtonElement = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

function init() {
    shuffle();
    board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',];
    // gameStart = true;


    render();
}

function render() {
    updateMessage();
    updateBoard();
}

function shuffle() {
    for (let i = emojis.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
    }
}

// function handleClick(event) {
//     const catIndex= event.target.id; // Which cat id from HTML triggered click event.
//     const catValue = elementCatsArray[catIndex];
//     // const catValue = main[catIndex];
//     gamePlay();
// }


function handleClick(event) {
    const square = event.target;
    const index = parseInt(square.id);
    if (!square.textContent.trim()) {
        square.textContent = emojis[index];
    }
}

// function gamePlay() {
//     squareElement.forEach(sqr => {
//         console.log(sqr.id);
//     });
// }

function updateBoard() {
    emojis.forEach((emoji, index) => {
    // console.log(index);
    const squareElement = document.getElementById(index);
    squareElement.textContent = emoji;
    });
    }

function updateMessage() {
    if (gameStart === false) {
        return;
    }
    else if (gameStart === true) {
        resultDisplayElement.textContent = 'Click play to begin';
    }
}

function reset() {
    
    init();
}

// function updateMessage() {
//     if (winner === false) {
//         resultDisplayElement.textContent = 'Play?';
//     }
// }
/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('DOMContentLoaded', init);

boardElement.addEventListener('click', handleClick);

resetButtonElement.addEventListener('click', reset);
