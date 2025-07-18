console.log("Hello World!");

const _choices = ["rock", "paper", "scissors"];

/**
 * Returns a random integer between a minimum and maximum range.
 * @param {number} min Minimum range (inclusive).
 * @param {number} max Maximum range (exclusive).
 * @returns {number} An integer between [min,max).
 */
function randInt(min = 0, max = 1) {
    return Math.floor(Math.random() * max - min) + min;
}

/**
 * Queries a computers random choice in a rock, paper, scissors game.
 * @returns {string} "rock", "paper", or "scissors" with equal chance.
 */
function getComputerChoice() {
    let result = _choices[randInt(0, _choices.length)];
    console.log(`Computer Choice: ${result}`);
    return result;
}

/**
 * Prompts the player for their choice in a rock, paper, scissors game.
 * @returns {string} "rock", "paper", or "scissors"
 */
function getHumanChoice() {
    let result = "";
    while (!_choices.includes(result)) {
        result = prompt("ROCK! PAPER! SCISSORS!\n").trim().toLowerCase();
    }
    console.log(`Human Choice: ${result}`);
    return result;
}

let playerScore = 0;
let computerScore = 0;

function playRound(playerChoice, computerChoice) {
    let winner = "player"
    const player = playerChoice.trim()[0].toUpperCase() + playerChoice.trim().slice(1).toLowerCase();
    const computer = computerChoice.trim()[0].toUpperCase() + computerChoice.trim().slice(1).toLowerCase();
    let message = `It"s a tie! You both choose ${player}.`;

    // Human wins else if human loses else tie.
    if ((player === "Rock" && computer === "Scissors") ||
        (player === "Paper" && computer === "Rock") ||
        (player === "Scissors" && computer === "Paper")) {
        playerScore++;
        message = `You won! ${player} beats ${computer}.`
    } else if ((player === "Rock" && computer === "Paper") ||
        (player === "Paper" && computer === "Scissors") ||
        (player === "Scissors" && computer === "Rock")) {
        computerScore++;
        message = `You lost! ${computer} beats ${player}.`
    }
    showSubMessage(message);
}

/**
 * Play specified rounds of rock, paper, scissors.
 * @param {number} rounds 
 */
function playGame(rounds) {
    for (let i = 0; i < rounds; i++) {
        console.log(`Round ${i + 1}:`);
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection);
        console.log(`Current Score: ${humanScore} ${computerScore}`);
    }

    if (humanScore > computerScore) {
        console.log(`You Won! ${humanScore} ${computerScore}`);
    } else if (humanScore < computerScore) {
        console.log(`You Lost! ${humanScore} ${computerScore}`);
    } else {
        console.log(`You Tied! ${humanScore} ${computerScore}`);
    }
}

function getChoices(player) {
    const gameSpace = document.getElementById("gameSpace");
    return gameSpace.querySelector(`#${player}`).querySelectorAll(".choice");
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    const playerChoices = getChoices("player");
    playerChoices.forEach((btn) => btn.addEventListener("click", handleSelection));
});

function resetChoices() {
    const playerChoices = getChoices("player");
    playerChoices.forEach((btn) => btn.classList.remove("selected"));
    const computerChoices = getChoices("computer");
    computerChoices.forEach((btn) => btn.classList.remove("selected"));
}

function setChoice(player, choice) {
    const gameSpace = document.getElementById("gameSpace");
    const playerChoices = gameSpace.querySelector(`#${player}`);
    const choiceButton = playerChoices.querySelector(`.${choice}`);
    choiceButton.classList.add("selected");
}

const handleSelection = (event) => {
    // Disable click events while round playing out
    const playerChoices = getChoices("player");
    playerChoices.forEach((btn) => btn.removeEventListener("click", handleSelection));

    // Remove selection colors on new selection
    hideSubMessage();
    resetChoices();

    // Handle Player Selection
    const playerChoice = event.target.value;
    setChoice("player", playerChoice); // Show player choice button as selected

    // Play message
    showMessage("ROCK!");
    setTimeout(() => {
        showMessage("ROCK! PAPER!");
        setTimeout(() => {
            showMessage("ROCK! PAPER! SCISSORS!");
            // Handle computer selection
            const computerChoice = getComputerChoice();
            setChoice("computer", computerChoice); // Show computer choice as selected

            // Calculate winner
            playRound(playerChoice, computerChoice);

            // Re-enable click events after round ends
            playerChoices.forEach((btn) => btn.addEventListener("click", handleSelection));
        }, 1000);
    }, 1000);
}

function showMessage(text) {
    const message = document.querySelector(".message");
    message.textContent = text;
    message.classList.remove("hidden");
}

function hideMessage() {
    const message = document.querySelector(".message");
    message.classList.add("hidden");
}

function showSubMessage(text) {
    const submessage = document.querySelector(".submessage");
    submessage.textContent = text;
    submessage.classList.remove("hidden");
}

function hideSubMessage() {
    const submessage = document.querySelector(".submessage");
    submessage.classList.add("hidden");
}