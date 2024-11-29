// Initialize the player and move counter
let player = "X";
let moves = 0;

/**
 * Handles a player's move when they click a cell.
 * @param {string} id - The ID of the clicked cell.
 */
function playMove(id) {
  const cell = document.getElementById(id);

  // Only allow a move if the cell is empty
  if (cell.src.includes("transp.png")) {
    cell.src = `img/${player}.png`;
    moves++;

    // Check if the move resulted in a win or a draw
    if (checkWin()) {
      setTimeout(() => alert(`Game Over: ${player} wins!`), 10);
      return;
    }

    if (moves === 9) {
      setTimeout(() => alert("Game Over: It's a draw!"), 10);
      return;
    }

    // Switch to the other player
    player = player === "X" ? "O" : "X";

    // If computer mode is enabled and it's the computer's turn, make a move
    if (document.getElementById("cpu").checked && player === "O") {
      const pcMove = getComputerMove();
      playMove(pcMove);
    }
  }
}

/**
 * Checks if there is a winning combination on the board.
 * @returns {boolean} - True if a win is detected, otherwise false.
 */
function checkWin() {
  const winPatterns = [
    ["c1", "c2", "c3"],
    ["c4", "c5", "c6"],
    ["c7", "c8", "c9"],
    ["c1", "c4", "c7"],
    ["c2", "c5", "c8"],
    ["c3", "c6", "c9"],
    ["c1", "c5", "c9"],
    ["c3", "c5", "c7"],
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      getImageSrc(a) === getImageSrc(b) &&
      getImageSrc(b) === getImageSrc(c) &&
      getImageSrc(a) !== "transp.png"
    );
  });
}

/**
 * Retrieves the image filename for a given cell.
 * @param {string} id - The ID of the cell.
 * @returns {string} - The filename of the image in the cell.
 */
function getImageSrc(id) {
  const src = document.getElementById(id).src;
  return src.substring(src.lastIndexOf("/") + 1);
}

/**
 * Finds the best move for the computer or a random empty cell.
 * @returns {string} - The ID of the cell for the computer's move.
 */
function getComputerMove() {
  const emptyCells = [];
  for (let i = 1; i <= 9; i++) {
    if (getImageSrc(`c${i}`) === "transp.png") {
      emptyCells.push(`c${i}`);
    }
  }
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

/**
 * Resets the game to its initial state.
 */
function resetGame() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById(`c${i}`).src = "img/transp.png";
  }
  player = "X";
  moves = 0;
}