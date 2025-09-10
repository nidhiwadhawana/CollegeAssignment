let mazeGrid, mazeRows, mazeCols, playerPos, endPos, currentMazeLevel;

const mazeLevels = {
    easy1: { rows: 11, cols: 11 },
    easy2: { rows: 13, cols: 13 },
    normal1: { rows: 17, cols: 17 },
    normal2: { rows: 19, cols: 19 }
};

const levelOrder = ['easy1', 'easy2', 'normal1', 'normal2'];

function startMaze(level) {
    currentMazeLevel = level;
    const levelConfig = mazeLevels[level];
    const mazeContainer = document.getElementById("gameContainer"); // Use gameContainer from index.html
    mazeContainer.innerHTML = ""; // Clear previous maze

    let rows = levelConfig.rows;
    let cols = levelConfig.cols;

    mazeRows = rows;
    mazeCols = cols;
    mazeGrid = generateMaze(rows, cols);
    drawMaze(mazeContainer); // Pass the container to drawMaze
    playerPos = { row: 1, col: 1 };
    endPos = { row: rows - 2, col: cols - 2 };
    updateMazeDisplay();
    const statusElement = document.createElement("p");
    statusElement.id = "mazeStatus";
    statusElement.textContent = `Maze Level: ${level}`;
    mazeContainer.appendChild(statusElement);

    document.removeEventListener("keydown", handleMazeMovement); // Remove previous listener
    document.addEventListener("keydown", handleMazeMovement);

     // Add level selection buttons
    const buttonContainer = document.createElement("div");
    levelOrder.forEach(levelKey => {
        const button = document.createElement("button");
        button.textContent = `Start ${levelKey.replace('normal', 'Normal').replace('easy', 'Easy')} Maze`;
        button.onclick = () => startMaze(levelKey);
        buttonContainer.appendChild(button);
    });

    const backButton = document.createElement("button");
    backButton.textContent = "Back to Menu";
    backButton.onclick = backToMainMenu;
    buttonContainer.appendChild(backButton);

    mazeContainer.appendChild(buttonContainer);
}

function generateMaze(rows, cols) {
    rows = rows % 2 === 0 ? rows + 1 : rows;
    cols = cols % 2 === 0 ? cols + 1 : cols;

    const grid = Array(rows).fill(null).map(() => Array(cols).fill('wall'));

    function carvePath(r, c) {
        const directions = [[-2, 0], [2, 0], [0, -2], [0, 2]];
        shuffleArray(directions);

        grid[r][c] = 'path';

        for (const [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && grid[nr][nc] === 'wall') {
                grid[r + dr / 2][c + dc / 2] = 'path';
                carvePath(nr, nc);
            }
        }
    }

    const startRow = 1 + Math.floor(Math.random() * (Math.floor((rows - 2) / 2))) * 2;
    const startCol = 1 + Math.floor(Math.random() * (Math.floor((cols - 2) / 2))) * 2;
    carvePath(startRow, startCol);

    grid[1][1] = 'start';
    grid[rows - 2][cols - 2] = 'end';

    return grid;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function drawMaze(container) {
    const mazeGridElement = document.createElement("div");
    mazeGridElement.id = "mazeGrid";
    mazeGridElement.style.display = "grid";
    mazeGridElement.style.gridTemplateColumns = `repeat(${mazeCols}, 20px)`;
    mazeGridElement.style.border = "2px solid black";
    mazeGridElement.style.margin = "auto";


    for (let r = 0; r < mazeRows; r++) {
        for (let c = 0; c < mazeCols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("maze-cell");
            cell.style.width = "20px";
            cell.style.height = "20px";
            cell.style.backgroundColor = mazeGrid[r][c] === 'wall' ? 'black' : (mazeGrid[r][c] === 'start' ? 'green' : (mazeGrid[r][c] === 'end' ? 'red' : 'white'));
            cell.dataset.row = r;
            cell.dataset.col = c;
            mazeGridElement.appendChild(cell);
        }
    }
    container.appendChild(mazeGridElement);
}

function updateMazeDisplay() {
    const cells = document.querySelectorAll('.maze-cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        cell.style.backgroundColor = mazeGrid[row][col] === 'wall' ? 'black' : (mazeGrid[row][col] === 'start' ? 'green' : (mazeGrid[row][col] === 'end' ? 'red' : 'white'));

        if (row === playerPos.row && col === playerPos.col) {
            cell.style.backgroundColor = 'blue'; // Player color
        }
    });


    if (playerPos.row === endPos.row && playerPos.col === endPos.col) {
        document.getElementById("mazeStatus").textContent = `Level ${currentMazeLevel} Completed!`;
        document.removeEventListener("keydown", handleMazeMovement);

        const currentIndex = levelOrder.indexOf(currentMazeLevel);
        if (currentIndex < levelOrder.length - 1) {
            setTimeout(() => {
                startMaze(levelOrder[currentIndex + 1]);
            }, 1500);
        } else {
            document.getElementById("mazeStatus").textContent = "Congratulations! You completed all maze levels!";
            document.getElementById("mazeGrid").innerHTML = "";
             // Display "Back to Menu" button after completing all levels
            const gameContainer = document.getElementById("gameContainer");
            gameContainer.appendChild(createMainMenuButton());
        }
    }
}

function handleMazeMovement(event) {
    let newRow = playerPos.row;
    let newCol = playerPos.col;

    switch (event.key) {
        case 'ArrowUp':
            newRow--;
            break;
        case 'ArrowDown':
            newRow++;
            break;
        case 'ArrowLeft':
            newCol--;
            break;
        case 'ArrowRight':
            newCol++;
            break;
        default:
            return;
    }

    if (newRow >= 0 && newRow < mazeRows && newCol >= 0 && newCol < mazeCols &&
        (mazeGrid[newRow][newCol] === 'path' || mazeGrid[newRow][newCol] === 'end' || mazeGrid[newRow][newCol] === 'start')) {

        playerPos.row = newRow;
        playerPos.col = newCol;
        updateMazeDisplay();
    }
}

// Function to create and return the main menu button
function createMainMenuButton() {
    const button = document.createElement("button");
    button.textContent = "Back to Menu";
    button.onclick = backToMainMenu;
    return button;
}

// Function to return to the main menu
function backToMainMenu() {
    const gameContainer = document.getElementById("gameContainer");
    gameContainer.innerHTML = `
        <h2>Welcome to the Game Hub!</h2>
        <p>Select a game from the menu.</p>
    `;
    gameContainer.appendChild(createMazeButton());
    gameContainer.appendChild(createQuizButton());
     document.removeEventListener("keydown", handleMazeMovement); // Remove maze movement listener when going back to menu
}

// Function to create and return the Maze game button
function createMazeButton() {
     const button = document.createElement("button");
    button.textContent = "Start Maze Game";
    button.onclick = () => {
         document.getElementById("gameContainer").innerHTML = ""; // Clear menu
         startMaze('easy1'); // Start default maze level
    };
    return button;
}

// Function to create and return the Quiz game button (placeholder, assumed to be in quiz.js)
function createQuizButton() {
    const button = document.createElement("button");
    button.textContent = "Start Quiz Game";
    button.onclick = startQuiz; // Assumes startQuiz function is defined in quiz.js
    return button;
}


// Initial setup for the menu when the page loads
document.addEventListener("DOMContentLoaded", () => {
    backToMainMenu(); // Display the main menu initially
});
