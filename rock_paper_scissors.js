const choices = ['rock', 'paper', 'scissors'];
let userChoice = '';
let computerChoice = '';
let gameResult = '';

const choiceButtons = document.querySelectorAll('.rps-button'); // Assuming buttons have this class
const userChoiceElement = document.getElementById('user-choice');
const computerChoiceElement = document.getElementById('computer-choice');
const resultElement = document.getElementById('game-result'); // Assuming an element with this ID
const rockPaperScissorsBackButton = document.getElementById('rock-paper-scissors-back-button');


console.log("rock_paper_scissors.js loaded"); // Log script load

function generateComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    computerChoice = choices[randomIndex];
    console.log("Computer choice:", computerChoice); // Log computer choice
}

function determineWinner(user, computer) {
    if (user === computer) {
        return 'It\'s a tie!';
    } else if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'You lose!';
    }
}

function displayResult() {
    if (userChoiceElement) {
        userChoiceElement.innerText = `Your choice: ${userChoice}`;
        console.log("Displayed user choice:", userChoice);
    } else {
        console.error("Error: userChoiceElement not found.");
    }

    if (computerChoiceElement) {
        computerChoiceElement.innerText = `Computer choice: ${computerChoice}`;
        console.log("Displayed computer choice:", computerChoice);
    } else {
        console.error("Error: computerChoiceElement not found.");
    }

    if (resultElement) {
        gameResult = determineWinner(userChoice, computerChoice);
        resultElement.innerText = `${gameResult} Thanks for playing!`; // Added thank you message
        console.log("Displayed game result:", gameResult);

         // Adjust color based on result
         if (gameResult.includes('win')) {
             resultElement.style.color = 'green';
         } else if (gameResult.includes('lose')) {
             resultElement.style.color = 'red';
         } else {
             resultElement.style.color = 'orange'; // Tie color
         }

    } else {
        console.error("Error: resultElement not found.");
    }

     // Show back button after a result is displayed (game round ends)
     if (rockPaperScissorsBackButton) {
        rockPaperScissorsBackButton.style.display = 'block';
     } else {
        console.error("Error: rockPaperScissorsBackButton not found (displayResult).");
     }

}

function handleChoice(choice) {
    console.log("handleChoice called with:", choice); // Log user choice
    userChoice = choice;
    generateComputerChoice();
    displayResult();

    // Optionally disable choice buttons after a selection
     if (choiceButtons) {
         choiceButtons.forEach(button => button.disabled = true);
         console.log("Choice buttons disabled.");
     } else {
         console.error("Error: choiceButtons not found in handleChoice.");
     }
}


function initializeRockPaperScissorsGame() {
    console.log("initializeRockPaperScissorsGame called."); // Log function call
    userChoice = '';
    computerChoice = '';
    gameResult = '';

    // Clear previous results
    if (userChoiceElement) {
        userChoiceElement.innerText = '';
    } else {
        console.error("Error: userChoiceElement not found (initialize).");
    }
    if (computerChoiceElement) {
        computerChoiceElement.innerText = '';
    } else {
        console.error("Error: computerChoiceElement not found (initialize).");
    }
    if (resultElement) {
        resultElement.innerText = '';
         resultElement.style.color = 'black'; // Reset color
    } else {
        console.error("Error: resultElement not found (initialize).");
    }

    // Enable choice buttons and hide back button
    if (choiceButtons) {
        choiceButtons.forEach(button => {
             button.disabled = false;
             // Remove existing event listeners to prevent duplicates
             button.removeEventListener('click', handleChoiceEvent);
             // Add new event listeners
             button.addEventListener('click', handleChoiceEvent);
        });
        console.log("Choice buttons enabled and listeners updated.");
    } else {
         console.error("Error: choiceButtons not found (initialize).");
    }


    if (rockPaperScissorsBackButton) {
         rockPaperScissorsBackButton.style.display = 'none'; // Hide back button initially
    } else {
         console.error("Error: rockPaperScissorsBackButton not found (initialize).");
    }

}

// Helper function to handle click event object and pass just the choice string
function handleChoiceEvent(event) {
    const choice = event.target.dataset.choice; // Assuming data-choice attribute on buttons
    handleChoice(choice);
}


// Add event listeners to the choice buttons (Rock, Paper, Scissors)
// This should be done after the elements are available in the DOM,
// but adding them here ensures they are attached when the script loads.
// They are removed and re-added in initializeRockPaperScissorsGame to prevent duplicates.
if (choiceButtons) {
     choiceButtons.forEach(button => {
         button.addEventListener('click', handleChoiceEvent);
     });
     console.log("Initial choice button event listeners added.");
} else {
    console.error("Error: choiceButtons not found when adding initial event listeners.");
}


// Add event listener for the back button
if (rockPaperScissorsBackButton) {
    rockPaperScissorsBackButton.addEventListener('click', () => {
        // Add any necessary cleanup for Rock Paper Scissors before going back
        // (e.g., clear results, disable buttons, though initialize handles this)
        initializeRockPaperScissorsGame(); // Reset game state
        // The showGameMenu function is handled in index.html
    });
     console.log("Back button event listener added.");
} else {
    console.error("Error: rockPaperScissorsBackButton not found when adding event listener.");
}


// initializeRockPaperScissorsGame will be called from index.html
