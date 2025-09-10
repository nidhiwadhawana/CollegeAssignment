const quizQuestions = [
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        answer: 2 // Index of the correct option
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: 3
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "NaCl"],
        answer: 1
    },
    {
        question: "What is the highest mountain in Africa?",
        options: ["Mount Kilimanjaro", "Mount Kenya", "Mount Stanley", "Mount Meru"],
        answer: 0
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        answer: 1
    }
];

function startQuiz() {
    const quizContainer = document.getElementById("gameContainer"); // Use gameContainer from index.html
    quizContainer.innerHTML = "<h2>Quiz Game</h2>";

    quizQuestions.forEach((q, index) => {
        const questionElement = document.createElement("p");
        questionElement.textContent = q.question;
        quizContainer.appendChild(questionElement);

        const optionsContainer = document.createElement("div");
        q.options.forEach((option, optionIndex) => {
            const radioInput = document.createElement("input");
            radioInput.type = "radio";
            radioInput.name = `question${index}`;
            radioInput.value = optionIndex;
            optionsContainer.appendChild(radioInput);

            const label = document.createElement("label");
            label.textContent = option;
            optionsContainer.appendChild(label);

            optionsContainer.appendChild(document.createElement("br"));
        });
        quizContainer.appendChild(optionsContainer);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Quiz";
    submitButton.onclick = submitQuiz;
    quizContainer.appendChild(submitButton);

    const resultElement = document.createElement("p");
    resultElement.id = "quizResult";
    quizContainer.appendChild(resultElement);

    const backButton = document.createElement("button");
    backButton.textContent = "Back to Menu";
    backButton.onclick = backToMainMenu; // Assuming backToMainMenu is available globally or in a shared script
    quizContainer.appendChild(backButton);
}

function submitQuiz() {
    let score = 0;
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            if (parseInt(selectedOption.value) === q.answer) {
                score++;
            }
        }
    });

    document.getElementById("quizResult").textContent = `You scored ${score} out of ${quizQuestions.length}.`;
}

// Initial setup for the menu is handled in maze.js to avoid duplication
// document.addEventListener("DOMContentLoaded", () => {
//     const menuContainer = document.getElementById("gameContainer");
//     menuContainer.innerHTML = `
//         <h2>Welcome to the Game Hub!</h2>
//         <p>Select a game from the menu.</p>
//         <button onclick="startMaze('easy1')">Start Maze Game</button>
//         <button onclick="startQuiz()">Start Quiz Game</button>
//     `;
// });

// Assuming backToMainMenu and maze game related functions are in maze.js or a shared script.
// These functions are needed for the "Back to Menu" button in the quiz.
// Example placeholder if not in maze.js:
// function backToMainMenu() {
//     const gameContainer = document.getElementById("gameContainer");
//     gameContainer.innerHTML = `
//         <h2>Welcome to the Game Hub!</h2>
//         <p>Select a game from the menu.</p>
//         <button onclick="startMaze('easy1')">Start Maze Game</button>
//         <button onclick="startQuiz()">Start Quiz Game</button>
//     `;
// }

// Assuming startMaze and maze game button creation functions are in maze.js
