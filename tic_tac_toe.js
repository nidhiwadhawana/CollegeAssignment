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
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.innerText = `${currentPlayer} has won! Thanks for playing!`; // Added thank you message
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        gameStatus.innerText = 'Game Draw! Thanks for playing!'; // Added thank you message
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerText = `It's ${currentPlayer}'s turn`;
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameStatus.innerText = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerText = '');
}

function initializeTicTacToe() {
     console.log("Tic Tac Toe game initialized.");
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameStatus.innerText = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerText = '');

     // Remove existing event listeners to prevent duplicates
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    if (resetButton) {
        resetButton.removeEventListener('click', handleRestartGame);
    }

    // Add event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    if (resetButton) {
        resetButton.addEventListener('click', handleRestartGame);
    }
}

// Event listener for the back button
if (ticTacToeBackButton) {
    ticTacToeBackButton.addEventListener('click', () => {
        // Add any necessary cleanup for Tic Tac Toe before going back
        handleRestartGame(); // Reset the game state
        // The showGameMenu function is handled in index.html
    });
}
