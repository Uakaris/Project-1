// I need to turn the cats into an array...
// I want to create a function that iterates through the cats array at random
// I want to have a play button
// The play button will call the function that iterates over the cats array
// I want a function that iterates over the cat array, starting with just one and increasing by one each time (a for() loop could be used here)


/*-------------------------------- Constants --------------------------------*/
// const gamePlayOptions = 
const catIds = [
    ['cat1'], 
    ['cat2'], 
    ['cat3'], 
    ['cat4']
];
/*---------------------------- Variables (state) ----------------------------*/
let main = [catIds]; 
const elementCatsArray = catIds.map(id => document.getElementById(id));
let gameStart;
let gameOver;
/*------------------------ Cached Element References ------------------------*/
const lilCatsElement = document.querySelectorAll('.cats');
const resultDisplayElement = document.querySelector('#message');
const mainElement = document.querySelector('.main');
const resetButtonElement = document.querySelector('#reset');
/*-------------------------------- Functions --------------------------------*/

function init() {
    gameStart = true;
    updateMessage();
}

function render() {
    updateMessage();
}

// function handleClick(event) {
//     const catIndex= event.target.id; // Which cat id from HTML triggered click event.
//     const catValue = elementCatsArray[catIndex];
//     // const catValue = main[catIndex];
//     gamePlay();
// }

function handleClick(event) {
    const clickedCatIndex = elementCatsArray.indexOf(event.target);
    const clickedCatId = catIds[clickedCatIndex];
    gamePlay();
}

function gamePlay() {
    lilCatsElement.forEach(cat => {
        console.log(cat.id);
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
