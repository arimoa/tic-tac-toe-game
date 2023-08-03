const cells = Array.from(document.getElementsByClassName("cell"));
const resultEl = document.getElementById("result");
const resetEl = document.getElementById("reset");
let currentPlayer = "X";
let result = "";
let board = new Array(9).fill(null);
let index;

// checking the target cell
const checkEmpty = (index) => {
  if (board[index] == null) {
    return true;
  } else {
    return false;
  }
};
const checkWin = () => {
  // horizontal
  for (let i = 0; i <= 6; i += 3) {
    if (
      board[i + 1] == board[i] &&
      board[i + 1] == board[i + 2] &&
      board[i] != null
    ) {
      cells[i].style.color = "#f0932b";
      cells[i + 1].style.color = "#f0932b";
      cells[i + 2].style.color = "#f0932b";
      result = `${board[i]} is winner!`;
      return result;
    }
  }
  // vertical
  for (let i = 0; i <= 2; i++) {
    if (
      board[i + 3] == board[i] &&
      board[i + 3] == board[i + 6] &&
      board[i] != null
    ) {
      cells[i].style.color = "#f0932b";
      cells[i + 3].style.color = "#f0932b";
      cells[i + 6].style.color = "#f0932b";
      result = `${board[i]} is winner!`;
      return result;
    }
  }
  // Diagonal
  if (board[4] == board[0] && board[4] == board[8] && board[4] != null) {
    result = `${board[4]} is winner!`;
    cells[4].style.color = "#f0932b";
    cells[0].style.color = "#f0932b";
    cells[8].style.color = "#f0932b";
    return result;
  } else if (board[4] == board[2] && board[4] == board[6] && board[4] != null) {
    cells[4].style.color = "#f0932b";
    cells[2].style.color = "#f0932b";
    cells[6].style.color = "#f0932b";
    result = `${board[4]} is winner!`;
    return result;
  }
  if (!board.includes(null)) {
    result = "The game was tied!";
    return result;
  }
  return (result = "ongoing");
};

const clickHandler = (e) => {
  index = cells.indexOf(e.target);
  if (checkEmpty(index)) {
    e.target.innerHTML = currentPlayer;
    board[index] = currentPlayer;
    currentPlayer == "X" ? (currentPlayer = "O") : (currentPlayer = "X");
    if (checkWin() != "ongoing") {
      for (let j = 0; j < cells.length; j++) {
        cells[j].removeEventListener("click", clickHandler);
      }
      resultEl.innerHTML = `${checkWin()}`;
      return;
    }
  } else if (checkWin() == "The game was tied!") {
    resultEl.innerHTML = checkWin();
    return;
  }
};
// Running the game
const runGame = () => {
  currentPlayer = "X";
  result = "";
  resultEl.innerHTML = "";
  board = new Array(9).fill(null);
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
    cells[i].style.color = "white";
    cells[i].addEventListener("click", clickHandler);
  }
};
// Reset button
resetEl.addEventListener("click", runGame);

runGame();
