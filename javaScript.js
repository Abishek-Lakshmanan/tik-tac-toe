'use strict';

const cellElements = document.querySelectorAll('[data-cell]');
const matchMsg = document.querySelector('.winning-message');
const drawMatch = document.querySelector('.drawMatch');
const restartButton = document.querySelector('#restartButton');
const board = document.getElementById('board');

let xTurn = true;

// console.log(cellElements);

let positionPlayer1 = [];

let positionPlayer2 = [];

let a = 0;

////////////////////////////////////////
// Winning logic to be compared with

const gameLogic = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const array2 = gameLogic.map(el => [el[2], el[0], el[1]]);
const array3 = gameLogic.map(el => [el[1], el[2], el[0]]);
const array4 = gameLogic.map(el => [el[2], el[1], el[0]]);
const array5 = gameLogic.map(el => [el[1], el[0], el[2]]);
const array6 = gameLogic.map(el => [el[0], el[2], el[1]]);

const finalLogic = [
  ...gameLogic,
  ...array2,
  ...array3,
  ...array4,
  ...array5,
  ...array6,
];

// console.log(finalLogic);

/////////////////////////////////////////////////
// User TURNS and LOGIC comparison

const conditionLogic = function (currentCell, i) {
  // For X turn
  if (xTurn === true) {
    currentCell.classList.add('x');
    positionPlayer1.push(i);
    console.log(positionPlayer1);

    // IF ABOVE 3 ELEMENTS EXECUTE LOGIC
    if (positionPlayer1.length >= 3 && logicalCheck(positionPlayer1) === true) {
      matchMsg.classList.add('show');
      drawMatch.textContent = 'Player X wins!!';
      return;
    }
  }

  // For O turn
  if (xTurn === false) {
    currentCell.classList.add('circle');
    positionPlayer2.push(i);
    console.log(positionPlayer2);

    // IF ABOVE 3 ELEMENTS EXECUTE LOGIC
    if (positionPlayer2.length >= 3 && logicalCheck(positionPlayer2) === true) {
      matchMsg.classList.add('show');
      drawMatch.textContent = 'Player O wins!!';
      return;
    }
  }

  xTurn = !xTurn;
  a += 1;
  // console.log(a);
};

////////////////////////////////////////////////
// Winning codition check if position of player >= 3

function logicalCheck(pos) {
  console.log(pos);
  const arr1 = [pos[0], pos[1], pos[2]];
  const arr2 = [pos[1], pos[2], pos[3]];
  const arr3 = [pos[2], pos[3], pos[4]];
  const arr4 = [pos[0], pos[2], pos[3]];
  const arr5 = [pos[0], pos[3], pos[4]];
  const arr6 = [pos[1], pos[3], pos[4]];
  const arr7 = [pos[0], pos[1], pos[3]];
  const arr8 = [pos[1], pos[2], pos[4]];
  const arr9 = [pos[0], pos[2], pos[4]];
  // console.log(arr1);

  // Checking condition
  const winner = finalLogic.some(
    value =>
      value.join('') === arr1.join('') ||
      value.join('') === arr2.join('') ||
      value.join('') === arr3.join('') ||
      value.join('') === arr4.join('') ||
      value.join('') === arr5.join('') ||
      value.join('') === arr6.join('') ||
      value.join('') === arr7.join('') ||
      value.join('') === arr8.join('') ||
      value.join('') === arr9.join('')
  );
  // console.log(winner);
  return winner;
}
// logicalCheck([3,4,6]);

/////////////////////////////////////////////
// Hover option

const setBoardHoverclass = function () {
  board.classList.remove('x');
  board.classList.remove('circle');
  if (xTurn === true) {
    board.classList.add('x');
  } else {
    board.classList.add('circle');
  }
};

/////////////////////////////////////////
// Looping for Click Event

cellElements.forEach((cell, i) => {
  // console.log(cell);
  cell.addEventListener(
    'click',
    function (e) {
      const currentCell = e.target;
      console.log(currentCell);

      // User turn with condition logic
      conditionLogic(currentCell, i);

      // Hover Event after Player change
      setBoardHoverclass();

      //Game-over Logic
      if (a === 9) {
        console.log('No one wins');
        matchMsg.classList.add('show');
        drawMatch.textContent = 'GameOver!';
      }
    },
    { once: true }
  );
});

// Initial Hover event
setBoardHoverclass();

//////////////////////////////////////////
// Restart button

restartButton.addEventListener('click', function (e) {
  document.location.reload(false);
});
