const words = ["python", "javascript", "html", "css", "developer", "coding", "challenge"];
let currentWord = "";
let scrambledWord = "";
let score = 0;

const scrambleWordElement = document.getElementById('scrambled-word');
const guessInput = document.getElementById('guess-input');
const submitGuessButton = document.getElementById('submit-guess');
const scrambleStatusElement = document.getElementById('scramble-status');
const scrambleScoreElement = document.getElementById('scramble-score');
const scrambleBackButton = document.getElementById('scramble-back-button');

console.log("scramble_words.js loaded"); // Log script load

function shuffleWord(word) {
    const array = word.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array.join('');
}

function displayWord() {
    if (scrambleWordElement) {
        scrambleWordElement.innerText = scrambledWord;
        console.log("Displayed scrambled word:", scrambledWord);
    } else {
        console.error("Error: scrambleWordElement not found.");
    }
    if (guessInput) {
        guessInput.value = ''; // Clear input field
        guessInput.disabled = false;
    } else {
        console.error("Error: guessInput not found.");
    }
    if (submitGuessButton) {
        submitGuessButton.disabled = false;
    } else {
         console.error("Error: submitGuessButton not found.");
    }
    if (scrambleStatusElement) {
         scrambleStatusElement.innerText = ''; // Clear previous status
         scrambleStatusElement.style.color = 'black';
    } else {
         console.error("Error: scrambleStatusElement not found.");
    }
}

function checkGuess() {
    console.log("checkGuess called.");
    const userGuess = guessInput ? guessInput.value.toLowerCase() : '';
    console.log("User guess:", userGuess);
    console.log("Correct word:", currentWord);

    if (userGuess === currentWord) {
        score++;
        if (scrambleStatusElement) {
            scrambleStatusElement.innerText = "Correct!";
            scrambleStatusElement.style.color = 'green';
        } else {
            console.error("Error: scrambleStatusElement not found (correct guess).");
        }

        if (scrambleScoreElement) {
            scrambleScoreElement.innerText = `Score: ${score}`;
            console.log("Score updated:", score);
        } else {
            console.error("Error: scrambleScoreElement not found.");
        }

        // Move to the next word after a short delay
        setTimeout(nextWord, 1000);

    } else {
        if (scrambleStatusElement) {
            scrambleStatusElement.innerText = "Incorrect, try again!";
            scrambleStatusElement.style.color = 'red';
        } else {
            console.error("Error: scrambleStatusElement not found (incorrect guess).");
        }
    }
}

function nextWord() {
    console.log("nextWord called.");
    if (words.length === 0) {
        endGame();
        return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words.splice(randomIndex, 1)[0]; // Select and remove word
    scrambledWord = shuffleWord(currentWord);
    displayWord();
}

function endGame() {
    console.log("Scramble game ended.");
    if (scrambleWordElement) {
        scrambleWordElement.innerText = "Game Over!";
    } else {
         console.error("Error: scrambleWordElement not found (end game).");
    }
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
    if (scrambleStatusElement) {
         scrambleStatusElement.innerText = `Final Score: ${score}`;
         scrambleStatusElement.style.color = 'black';
    } else {
        console.error("Error: scrambleStatusElement not found (end game status).");
    }
     if (scrambleBackButton) {
        scrambleBackButton.style.display = 'block'; // Show back button after game end
     } else {
        console.error("Error: scrambleBackButton not found (end game).");
     }
}


function initializeScrambleGame() {
    console.log("initializeScrambleGame called.");
    // Reset game state
    currentWord = "";
    scrambledWord = "";
    score = 0;
    // Reinitialize words array for new game
    words.length = 0; // Clear existing words
    words.push("python", "javascript", "html", "css", "developer", "coding", "challenge"); // Add words back

    if (scrambleScoreElement) {
        scrambleScoreElement.innerText = 'Score: 0';
    } else {
         console.error("Error: scrambleScoreElement not found (initialize).");
    }

    if (dinoGameOverElement) { // Assuming dinoGameOverElement was causing issues, let's ensure it's not referenced
        # This check was likely a copy-paste error from Dino game. Remove it.
    }

     if (scrambleBackButton) {
         scrambleBackButton.style.display = 'none'; // Hide back button initially
     } else {
         console.error("Error: scrambleBackButton not found (initialize).");
     }


    nextWord(); // Start the first word
}

// Add event listener to the submit button
if (submitGuessButton) {
    submitGuessButton.addEventListener('click', checkGuess);
     console.log("Submit button event listener added.");
} else {
    console.error("Error: submitGuessButton not found when adding event listener.");
}

// Add event listener for 'Enter' key in the input field
if (guessInput) {
    guessInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            checkGuess();
        }
    });
     console.log("Guess input keypress listener added.");
} else {
     console.error("Error: guessInput not found when adding keypress listener.");
}


// initializeScrambleGame will be called from index.html
