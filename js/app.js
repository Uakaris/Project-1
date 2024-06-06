/*-------------------------------- Constants --------------------------------*/

const emojis = ['🫠', '🫠', '🐓', '🐓', '🦄', '🦄', '🌵', '🌵', '💩', '💩', '😾', '😾', '👾', '👾', '🦦', '🦦'];

/*---------------------------- Variables (state) ----------------------------*/

const matchingComboSound = new Audio('./Sounds/matching-combo-clap.wav');

const nonMatchSound = new Audio('./Sounds/non-match.wav');

const winnerSound = new Audio('./Sounds/winner-sound.mp3');

const soundresetElement = document.querySelector('#reset');

let squareClicked = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",];

let board;

let selectedEmojis = [];

let matchingCombos = [];

let winner;

let gameStart;

let count;

let choosingSquare = false;

let gameTimer

/*------------------------ Cached Element References ------------------------*/

const soundSquareElement = document.querySelectorAll('.sqr');

const squareElement = document.querySelectorAll('.sqr');

const resultDisplayElement = document.querySelector('#message');

const timerElement = document.querySelector('#timer');

const boardElement = document.querySelector('.board');

const resetButtonElement = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/

function init(levelTimer) {
    enableBoard();
    count = levelTimer;
    timerElement.textContent = `Timer: ${count}`;
    resultDisplayElement.textContent = 'Quick! Click a square';
    gameStart = true;
    gameOver = false;
    winner = false;
    board = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",];
    shuffle();
    // Below code block is from original reset function. This was added to the init function to make the code more readable.
    updateMessage();
    squareElement.forEach((square, index) => {
        square.textContent = '';
    });
    matchingCombos = [];
    squareClicked = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    // #####################################################################################################################
}

function timer() {
    if (count > 0) {
        count--;
        timerElement.textContent = `Timer: ${count}`;
    }

    if (count === 0) {
        resultDisplayElement.textContent = 'Game Over';
        clearInterval(gameTimer);
        disableBoard()
    }
}

function shuffle() {
    for (let i = emojis.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [emojis[i], emojis[randomIndex]] = [emojis[randomIndex], emojis[i]];
    }
    // Fisher-Yates shuffle algorithm to shuffle the order of emojis
}

function handleClick(event) {

    checkForWinner();
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
                checkForWinner();
                selectedEmojis = [];
                matchingComboSound.volume = 0.40;
                matchingComboSound.play();
            } else {
                choosingSquare = true; // Set choosingSquare to true when it is required
                nonMatchSound.volume = 0.30;
                nonMatchSound.play();
                setTimeout(() => {
                    hideSquares(selectedEmojis[0].index, selectedEmojis[1].index);
                    choosingSquare = false; // Reset choosingSquare to false after hiding squares so the game can continue
                    selectedEmojis = [];
                }, 1000);
            }
        }
    }
}

function hideSquares(index0, index1) {
    const emoji1 = emojis[index0];
    const emoji2 = emojis[index1];
    const square1 = document.getElementById(index0);
    const square2 = document.getElementById(index1);
    square1.textContent = '';
    square2.textContent = '';
    squareClicked[index0] = false;
    squareClicked[index1] = false;
}

function disableBoard() { //disables the board when called. Used when the timer runs out.
    squareElement.forEach((square) => {
        square.disabled = true
    });
}

function enableBoard() {
    squareElement.forEach((square) => {
        square.disabled = false
    });
}

function checkForWinner() {
    if (matchingCombos.length === emojis.length) {
        resultDisplayElement.textContent = 'Winner!';
        clearInterval(gameTimer);
        winnerSound.volume = 0.50;
        winnerSound.play();
        winner = true;
    }
}

function updateBoard() {
    emojis.forEach((emoji, index) => {
        const squareElement = document.getElementById(index);
        if (!squareClicked[index]) {
            emojis.textContent = '';
        }
    });
}

function updateMessage() {
    if (squareClicked.includes("") && gameStart === true) {
        resultDisplayElement.textContent = "Quick! Click a square!";
        gameStart = false;
    } else {
        resultDisplayElement.textContent = "";
    }
}

function reset() {
    clearInterval(gameTimer);
    init(0);
}

/*----------------------------- Event Listeners -----------------------------*/

// document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', () => {
    // Game level selection
    const easyLevelButton = document.getElementById("easy")
    const mediumLevelButton = document.getElementById("medium")
    const hardLevelButton = document.getElementById("hard")

    easyLevelButton.addEventListener("click", () => {
        reset()
        init(90)
        gameTimer = setInterval(timer, 1000);
    })

    mediumLevelButton.addEventListener("click", () => {
        reset()
        init(60)
        gameTimer = setInterval(timer, 1000);
    })

    hardLevelButton.addEventListener("click", () => {
        reset()
        init(30)
        gameTimer = setInterval(timer, 1000);
    })
});

boardElement.addEventListener('click', handleClick);

soundSquareElement.forEach(square => {
    square.addEventListener('click', (event) => {
        const sqrSound = new Audio('./Sounds/click-audio.wav');
        sqrSound.volume = 0.40;
        sqrSound.play();
    });
});

soundresetElement.addEventListener('click', (event) => {
    const sqrSound = new Audio('./Sounds/game-start-sound.wav');
    sqrSound.volume = 0.40;
    sqrSound.play();
});

boardElement.classList.add('animate__animated', 'animate__rotateIn');

resetButtonElement.addEventListener('click', reset);
