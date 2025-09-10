let secretNumber = 0;
let guessesLeft = 10; // Default number of guesses
const minNumber = 1;
const maxNumber = 100; // Default range

const guessInput = document.getElementById('guess-input');
const submitGuessButton = document.getElementById('submit-guess');
const guessStatusElement = document.getElementById('guess-status');
const guessNumberBackButton = document.getElementById('guess-number-back-button');
const guessesLeftElement = document.getElementById('guesses-left'); // Element to display guesses left
const minNumberElement = document.getElementById('min-number'); // Element to display min number
const maxNumberElement = document.getElementById('max-number'); // Element to display max number


console.log("guess_number.js loaded"); // Log script load

function generateSecretNumber() {
    secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    console.log("Secret number generated:", secretNumber); // Log the generated number (for debugging)
}

function initializeGuessNumberGame() {
    console.log("initializeGuessNumberGame called"); // Log function call
    generateSecretNumber();
    guessesLeft = 10; // Reset guesses

    if (guessesLeftElement) {
        guessesLeftElement.innerText = `Guesses left: ${guessesLeft}`;
    } else {
        console.error("Error: guessesLeftElement not found.");
    }

    if (minNumberElement) {
        minNumberElement.innerText = minNumber;
    } else {
        console.error("Error: minNumberElement not found.");
    }

     if (maxNumberElement) {
        maxNumberElement.innerText = maxNumber;
    } else {
        console.error("Error: maxNumberElement not found.");
    }


    if (guessStatusElement) {
        guessStatusElement.innerText = ''; // Clear status
        guessStatusElement.style.color = 'black';
    } else {
        console.error("Error: guessStatusElement not found.");
    }


    if (guessInput) {
        guessInput.value = ''; // Clear input
        guessInput.disabled = false;
    } else {
        console.error("Error: guessInput not found.");
    }

    if (submitGuessButton) {
        submitGuessButton.disabled = false;
    } else {
        console.error("Error: submitGuessButton not found.");
    }

    if (guessNumberBackButton) {
         guessNumberBackButton.style.display = 'none'; // Hide back button initially
    } else {
         console.error("Error: guessNumberBackButton not found.");
    }

}

function handleGuess() {
    console.log("handleGuess called."); // Log function call
    const userGuess = parseInt(guessInput ? guessInput.value : '');
    console.log("User guess:", userGuess);

    if (isNaN(userGuess) || userGuess < minNumber || userGuess > maxNumber) {
        if (guessStatusElement) {
            guessStatusElement.innerText = `Please enter a number between ${minNumber} and ${maxNumber}.`;
            guessStatusElement.style.color = 'orange';
             console.log("Invalid input.");
        } else {
             console.error("Error: guessStatusElement not found (invalid input).");
        }
        if (guessInput) {
             guessInput.value = ''; // Clear invalid input
        }
        return;
    }

    guessesLeft--;
    if (guessesLeftElement) {
        guessesLeftElement.innerText = `Guesses left: ${guessesLeft}`;
         console.log("Guesses left:", guessesLeft);
    } else {
         console.error("Error: guessesLeftElement not found (update).");
    }


    if (userGuess === secretNumber) {
        if (guessStatusElement) {
            guessStatusElement.innerText = `Congratulations! You guessed the number ${secretNumber}! Thanks for playing!`; // Added thank you message
            guessStatusElement.style.color = 'green';
             console.log("Guess correct. Game won.");
        } else {
             console.error("Error: guessStatusElement not found (win).");
        }

        endGame();
    } else if (guessesLeft === 0) {
        if (guessStatusElement) {
            guessStatusElement.innerText = `Game Over! The number was ${secretNumber}. Thanks for playing!`; // Added thank you message
            guessStatusElement.style.color = 'red';
             console.log("Guesses exhausted. Game over.");
        } else {
             console.error("Error: guessStatusElement not found (game over).");
        }
        endGame();
    } else if (userGuess < secretNumber) {
         if (guessStatusElement) {
            guessStatusElement.innerText = "Too low! Try again.";
            guessStatusElement.style.color = 'orange';
             console.log("Guess too low.");
         } else {
             console.error("Error: guessStatusElement not found (too low).");
         }
    } else { // userGuess > secretNumber
         if (guessStatusElement) {
            guessStatusElement.innerText = "Too high! Try again.";
            guessStatusElement.style.color = 'orange';
             console.log("Guess too high.");
         } else {
             console.error("Error: guessStatusElement not found (too high).");
         }
    }

    if (guessInput) {
        guessInput.value = ''; // Clear input field after guess
    }
}

function endGame() {
    console.log("Guess the Number game ended.");
    if (guessInput) {
        guessInput.disabled = true;
    } else {
         console.error("Error: guessInput not found (end game).");
    }

    if (submitGuessButton) {
        submitGuessButton.disabled = true;
    } else {
         console.error("Error: submitGuessButton not found (end game).");
    }

     if (guessNumberBackButton) {
        guessNumberBackButton.style.display = 'block'; // Show back button after game end
     } else {
        console.error("Error: guessNumberBackButton not found (end game).");
     }
}

// Add event listener to the submit button
if (submitGuessButton) {
    submitGuessButton.addEventListener('click', handleGuess);
    console.log("Submit button event listener added.");
} else {
     console.error("Error: submitGuessButton not found when adding event listener.");
}


// Add event listener for 'Enter' key in the input field
if (guessInput) {
    guessInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            handleGuess();
        }
    });
    console.log("Guess input keypress listener added.");
} else {
     console.error("Error: guessInput not found when adding keypress listener.");
}


// initializeGuessNumberGame will be called from index.html
