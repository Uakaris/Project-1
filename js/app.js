console.log('LessssGooooo!');

/*-------------------------------- Constants --------------------------------*/
const mainElement = document.querySelector('.main');
const resetButtonElement = document.querySelector('#reset');

/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*-------------------------------- Functions --------------------------------*/

function init() {

}

function render() {
    
}

function handleClick(event) {
    console.log('clicked!');
}

function reset() {
    console.log('clicked!');
    init();
}
/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('DOMContentLoaded', init);

mainElement.addEventListener('click', handleClick);

resetButtonElement.addEventListener('click', reset);
