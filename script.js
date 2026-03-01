const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const playAgainBtn = document.getElementById("play-again");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const index = Array.from(cells).indexOf(clickedCell);

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkResult() {
    let win = false;

    for (let combo of winningConditions) {
        const [a,b,c] = combo;
        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            win = true;
            break;
        }
    }

    if (win) {
        gameActive = false;
        popupMessage.textContent = `🎉 Player ${currentPlayer} Wins!`;
        popup.classList.remove("hide");
        return;
    }

    if (!gameState.includes("")) {
        gameActive = false;
        popupMessage.textContent = "😐 Match Draw!";
        popup.classList.remove("hide");
    }
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";

    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", resetGame);

playAgainBtn.addEventListener("click", () => {
    popup.classList.add("hide");
    resetGame();
});