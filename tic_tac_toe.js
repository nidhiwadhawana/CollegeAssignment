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
        gameStatus.innerText = currentPlayer + ' has won!'; // Removed "Thanks for playing!"
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        gameStatus.innerText = 'Game Draw!'; // Removed "Thanks for playing!"
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerText = 'It\'s ' + currentPlayer + '\'s turn'; // Changed to string concatenation
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) return;

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer; // This line updates the cell display

    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameStatus.innerText = 'It\'s ' + currentPlayer + '\'s turn'; // Changed to string concatenation
    cells.forEach(cell => cell.innerText = '');
}

function initializeTicTacToe() {
    console.log("Tic Tac Toe game initialized.");
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
    }
}
