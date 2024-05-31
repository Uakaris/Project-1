// I want to create a function that iterates through the cats array at random
// I want to have a play button
// The play button will call the function that iterates over the cats array
// I want a function that 

/*-------------------------------- Constants --------------------------------*/
// const gamePlayOptions = 

/*---------------------------- Variables (state) ----------------------------*/
let main;
let gameOver;
/*------------------------ Cached Element References ------------------------*/
const lilCatsElement = document.querySelectorAll('.cats');
const resultDisplayElement = document.querySelector('#message');
const mainElement = document.querySelector('.main');
const resetButtonElement = document.querySelector('#reset');
/*-------------------------------- Functions --------------------------------*/

function init() {
    // gamePlay();
}

function render() {
    
}

function handleClick(event) {
    // console.log('clicked!');
}

function gamePlay() {
    lilCatsElement.forEach(cat => {
        console.log(cat.id);
    });
}

function reset() {
    // console.log('clicked!');
    init();
}

// function updateMessage() {
//     if (winner === false) {
//         resultDisplayElement.textContent = 'Play?';
//     }
// }
/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('DOMContentLoaded', init);

mainElement.addEventListener('click', handleClick);

resetButtonElement.addEventListener('click', reset);
