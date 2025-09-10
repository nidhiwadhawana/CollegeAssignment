let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
const cells = document.querySelectorAll('.cell');
const ticTacToeBackButton = document.getElementById('tic-tac-toe-back-button');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [aIndex, bIndex, cIndex] = winningConditions[i];
        let a = board[aIndex];
        let b = board[bIndex];
        let c = board[cIndex];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.innerText = currentPlayer + ' has won!'; // Changed to string concatenation
        gameActive = false;
        console.log("Game won by:", currentPlayer); // Log win
        return;
    }

    if (!board.includes('')) {
        gameStatus.innerText = 'Game Draw!'; // Changed to string concatenation
        gameActive = false;
        console.log("Game ended in a draw."); // Log draw
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerText = 'It\'s ' + currentPlayer + '\'s turn'; // Changed to string concatenation
    console.log("Player changed to:", currentPlayer); // Log player change
}

function handleCellClick(event) {
    console.log("Cell clicked!"); // Log cell click
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    console.log("Clicked cell index:", clickedCellIndex); // Log clicked index

    if (board[clickedCellIndex] !== '' || !gameActive) {
        console.log("Cell already occupied or game not active."); // Log if click is ignored
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer; // This line updates the cell display
    console.log("Board updated:", board); // Log board state
    console.log("Cell innerText set to:", currentPlayer); // Log innerText update

    handleResultValidation();
}

function handleRestartGame() {
    console.log("Restarting game..."); // Log restart
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameStatus.innerText = 'It\'s ' + currentPlayer + '\'s turn'; // Changed to string concatenation
    cells.forEach(cell => cell.innerText = '');
     console.log("Game restarted. Board cleared."); // Log restart completion
}

function initializeTicTacToe() {
    console.log("initializeTicTacToe called."); // Log function call
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameStatus.innerText = 'It\'s ' + currentPlayer + '\'s turn'; // Changed to string concatenation
    cells.forEach(cell => cell.innerText = '');

     // Remove existing event listeners to prevent duplicates
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    if (resetButton) { // Added check for resetButton
        resetButton.removeEventListener('click', handleRestartGame);
    }

    // Add event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    if (resetButton) {
        resetButton.addEventListener('click', handleRestartGame);
    }

    // Add event listener for the back button if it exists
    const ticTacToeBackButton = document.getElementById('tic-tac-toe-back-button');
    if (ticTacToeBackButton) {
        ticTacToeBackButton.removeEventListener('click', showGameMenu); // Remove old listener if any
        ticTacToeBackButton.addEventListener('click', () => {
            handleRestartGame(); // Reset the game state before going back
            showGameMenu(); // The showGameMenu function is assumed to be in index.html's script
        });
         console.log("Back button listener added."); // Log back button listener
    }
     console.log("Tic Tac Toe initialization complete."); // Log initialization completion
}
