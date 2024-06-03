/*-------------------------------- Constants --------------------------------*/
// const gamePlayOptions = 
const emojis = ['🫠','🫠', '🐓', '🐓', '🦭', '🦭', '🌵', '🌵', '💩', '💩', '😾', '😾', '👾', '👾', '🥚', '🥚'];
/*---------------------------- Variables (state) ----------------------------*/
const elementemojiArray = emojis.map(id => document.getElementById(id));
let squareClicked = new Array(16).fill(false);
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
    // Fisher-Yates shuffle algorithm
}

function handleClick(event) {
    const square = event.target;
    const index = parseInt(square.id);

    if (!squareClicked[index]) { // Check if the square has not been clicked yet
        square.textContent = emojis[index]; // Display the emoji once clicked.
        squareClicked[index] = true; // Update the state to indicate the square has been clicked
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
    if (!squareClicked[index]) {
        emojis.textContent = '';
         }
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
    updateBoard();
    shuffle();
    squareClicked.fill(false);
    init();
}


/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('DOMContentLoaded', init);

boardElement.addEventListener('click', handleClick);

resetButtonElement.addEventListener('click', reset);
 