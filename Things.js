let level = 1;
let order = [];
let playerOrder = [];
const levelCount = document.querySelector('.level-count');
const simonButtons = document.querySelectorAll('.simon-btn')

function gameStart() {
    order = [];
    playerOrder = [];
    level = 1;

    levelCount.textContent = level;
    enableButtons(false);
    nextRound();
}

function nextRound(){
    playerOrder = [];
    order.push(Math.floor(Math.random()*4)+1);
    levelCount.textContent = level;

    playSequence();
}

function playSequence() {
    enableButtons(false);

    let i = 0;
    const interval = setInterval(() => {
        const color = order[i];
        flashButton(color);
        i++;

        if (i >= order.length) {
            clearInterval(interval);
            enableButtons(true);
        }
    }, 800);
}

function flashButton(colorNum) {
    const btn = document.querySelector(`[data-color="${colorNum}"]`);
    btn.classList.add("active");

    setTimeout(() => btn.classList.remove("active"), 400);
}

function enableButtons(state) {
    simonButtons.forEach(btn => btn.disabled = !state);
}

function gameOver(){
    levelCount.textContent = "X";

    enableButtons(false);

    alert("Wrong! Game Over.");

    order = [];
    playerOrder = [];
    level = 1;
}

function handleClick(btn) {
    const color = Number(btn.getAttribute("data-color"));
    playerOrder.push(color);

    flashButton(color);

    const currentStep = playerOrder.length - 1;

    if (playerOrder[currentStep] !== order[currentStep]) {
        gameOver();
        return;
    }

    if (playerOrder.length === order.length) {
        level++;
        enableButtons(false);
        setTimeout(() => nextRound(), 1000);
    }
}
