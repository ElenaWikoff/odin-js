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
 * @returns {string} 'rock', 'paper', or 'scissors' with equal chance.
 */
function getComputerChoice() {
    let result = _choices[randInt(0, _choices.length)];
    console.log(`Computer Choice: ${result}`);
    return result;
}

/**
 * Prompts the player for their choice in a rock, paper, scissors game.
 * @returns {string} 'rock', 'paper', or 'scissors'
 */
function getHumanChoice() {
    let result = "";
    while (!_choices.includes(result)) {
        result = prompt("ROCK! PAPER! SCISSORS!\n").trim().toLowerCase();
    }
    console.log(`Human Choice: ${result}`);
    return result;
}

let humanScore = 0;
let computerScore = 0;

// const humanSelection = getHumanChoice();
// const computerSelection = getComputerChoice();

function playRound(humanChoice, computerChoice) {
    const human = humanChoice.trim()[0].toUpperCase() + humanChoice.trim().slice(1).toLowerCase();
    const computer = computerChoice.trim()[0].toUpperCase() + computerChoice.trim().slice(1).toLowerCase();
    let message = `It's a tie! You both choose ${human}.`;
    console.log(`${human} ${computer}`);

    // Human wins else if human loses else tie.
    if ((human === "Rock" && computer === "Scissors") ||
        (human === "Paper" && computer === "Rock") ||
        (human === "Scissors" && computer === "Paper")) {
            humanScore++;
            message = `You won! ${human} beats ${computer}.`
    } else if ((human === "Rock" && computer === "Paper") ||
        (human === "Paper" && computer === "Scissors") ||
        (human === "Scissors" && computer === "Rock")) {
            computerScore++;
            message = `You lost! ${computer} beats ${human}.`
    }
    console.log(message);
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

const gameSpace = document.getElementById("gameSpace");
const playerChoices = gameSpace.querySelector(".player");
const choiceButtons = playerChoices.querySelectorAll(".choice");

choiceButtons.forEach((btn) => btn.addEventListener);