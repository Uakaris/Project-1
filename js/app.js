/*-------------------------------- Constants --------------------------------*/
const emojis = ['🫠','🫠', '🐓', '🐓', '🦄', '🦄', '🌵', '🌵', '💩', '💩', '😾', '😾', '👾', '👾', '🦦', '🦦'];
/*---------------------------- Variables (state) ----------------------------*/
const elementemojiArray = emojis.map(id => document.getElementById(id));

const matchingComboSound = new Audio('./Sounds/matching-combo-clap.wav');

let squareClicked = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",];

let board;

let selectedEmojis = [];

let matchingCombos = [];

let winner;

let gameStart;

let gameOver;

let choosingSquare = false;
/*------------------------ Cached Element References ------------------------*/
const soundSquareElement = document.querySelectorAll('.sqr');

const soundresetElement = document.querySelector('#reset');

const squareElement = document.querySelectorAll('.sqr');

const resultDisplayElement = document.querySelector('#message');

const boardElement = document.querySelector('.board');

const resetButtonElement = document.querySelector('#reset');
/*-------------------------------- Functions --------------------------------*/
function init() {
    resultDisplayElement.textContent = 'Click any square to begin';
    gameStart = true;
    winner = false;
    board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",];
    shuffle();
    render();
}

function render() {
    // updateMessage();
    updateBoard();
}

function shuffle() {
    for (let i = emojis.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [emojis[i], emojis[randomIndex]] = [emojis[randomIndex], emojis[i]];
    }
    // Fisher-Yates shuffle algorithm to shuffle the order of emojis
}

function handleClick(event) {

    winner = checkForWinner();
    // gameStart = !winner;
    updateMessage();

    const square = event.target;
    const index = parseInt(square.id);

    if (!squareClicked[index] && !choosingSquare) { // Check if the square has not been clicked yet and not checking for a pair
        square.textContent = emojis[index]; // Display the emoji once clicked.
        squareClicked[index] = true; // Update the state to indicate the square has been clicked
        selectedEmojis.push({ emoji: emojis[index], index: index });

        if (selectedEmojis.length === 2) {
            if (selectedEmojis[0].emoji === selectedEmojis[1].emoji) {
                matchingCombos.push(selectedEmojis[0].emoji);
                matchingCombos.push(selectedEmojis[1].emoji);
                selectedEmojis = [];
                matchingComboSound.volume = 0.40;
                matchingComboSound.play();
            } else {
                choosingSquare = true; // Set choosingSquare to true when it is required
                setTimeout(() => {
                    hideSquares(selectedEmojis[0].index, selectedEmojis[1].index);
                    choosingSquare = false; // Reset choosingSquare to false after hiding squares so the game can continue
                    selectedEmojis = [];
                }, 1000);
            }
        }
        // winner = checkForWinner();
        // gameStart = !winner;
        // updateMessage();
    }
}

function hideSquares(index0, index1) {
    const emoji1 = emojis[index0];
    const emoji2 = emojis[index1];

    // if (emoji1 === emoji2) {
    //     // If the emojis match, return without hiding
    //     return;
    // }

    const square1 = document.getElementById(index0);
    const square2 = document.getElementById(index1);
    square1.textContent = '';
    square2.textContent = '';
    squareClicked[index0] = false;
    squareClicked[index1] = false;
}

function checkForWinner() {
    if (!squareClicked.includes("")) return true; 
        // gameStart = false
}

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
    if (squareClicked.includes("") && gameStart === true) {
        resultDisplayElement.textContent = "";
        gameStart = false;
    }
    else if (winner === true && gameStart === false) { 
        resultDisplayElement.textContent = 'Winner!';
    }
}

function reset() {
    init();
    updateMessage();
    squareClicked = new Array(emojis.length).fill(false);
    squareElement.forEach((square, index) => {
        square.textContent = '';
    });
}
    // winner = checkForWinner();
    // updateMessage();
    // // squareClicked.fill(false);
    // squareClicked = new Array(emojis.length).fill(false);
    // squareElement.forEach((square, index) => {
    //     square.textContent = '';
    // });
    // updateBoard();
    // shuffle();
    
    // resultDisplayElement.textContent = 'Click any square to begin';

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('DOMContentLoaded', init);

boardElement.addEventListener('click', handleClick);

soundSquareElement.forEach(square => {
    square.addEventListener('click', (event) => {
        const sqrSound = new Audio('./Sounds/click-audio.wav');
        sqrSound.volume = 0.40;
        sqrSound.play();
    });
});

soundresetElement.addEventListener('click', (event) => {
    const sqrSound = new Audio('./Sounds/reset-audio.mp3');
    sqrSound.volume = 0.30;
    sqrSound.play();
});

resetButtonElement.addEventListener('click', reset);