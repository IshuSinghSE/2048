

addEventListener('DOMContentLoaded', () => {
  const gameboard = document.querySelector('.gameboard');
  const scoreDisplay = document.querySelector('.score-text');
  const highscoreDisplay = document.querySelector('.highscore-text');
  const modal = document.getElementById('game-over-modal');
  const modalTitle = document.getElementsByClassName('modal-title');
  const modalScore = document.getElementsByClassName('modal-score');
  const playAgainButton = document.getElementById('play-again-button');
  const closeButton = document.querySelector('.close-button');
  const resetButton = document.querySelector('.reset-button');

  const SIZE = 4;
  const BOARDSIZE = SIZE * SIZE;

  let board;
  let score;
  let highscore;
  let madeHighScore = false;


  /** Initializes the game. */
  function init() {
    // Clear the gameboard and reset the board array
    gameboard.innerHTML = '';
    board = [];

    // Retrieve the score and highscore from localStorage
    score = parseInt(localStorage.getItem('score')) || 0;
    highscore = parseInt(localStorage.getItem('highscore')) || 0;
    scoreDisplay.innerHTML = score;
    highscoreDisplay.innerHTML = highscore;

    // Retrieve the board state from localStorage
    const savedBoard = JSON.parse(localStorage.getItem('board'));
    if (savedBoard) {
      board = savedBoard;
      createBoardFromState();
    } else {
      createBoard();
      addNewTile();
      addNewTile();
    }
    updateDisplay();
  }

  /**
   * Creates the game board.
   */
  function createBoard() {
    for (let i = 0; i < BOARDSIZE; i++) {
      let cell = document.createElement('div')
      let innerCell = document.createElement('span')
      innerCell.textContent = 0
      cell.appendChild(innerCell)
      cell.setAttribute('cell', i)
      cell.classList.add('cell')
      gameboard.appendChild(cell)
      board.push(cell)
    }
  }

  /**
 * Creates the game board from saved state.
 */
  function createBoardFromState() {
    for (let i = 0; i < BOARDSIZE; i++) {
      let cell = document.createElement('div');
      let innerCell = document.createElement('span');
      innerCell.textContent = board[i];
      cell.appendChild(innerCell);
      cell.setAttribute('cell', i);
      cell.classList.add('cell');
      cell.classList.add('new-tile'); // Add animation class
      gameboard.appendChild(cell);
      board[i] = cell

      // Remove the animation class after the animation ends
      setTimeout(() => {
        cell.classList.remove('new-tile');
      }, 300); // Match the duration of the animation
    }
    addColor();
  }

  // Add new tile
  function addNewTile() {
    let emptyCells = board.filter(cell => cell.querySelector('span').textContent == 0);

    if (emptyCells.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyCells.length);
      let newTile = emptyCells[randomIndex];
      newTile.querySelector('span').textContent = 2;
      newTile.classList.add('new-tile');
      addColor(); // Update colors after adding a new tile
      saveGameState()
      // Remove the animation class after the animation ends
      setTimeout(() => {
        newTile.classList.remove('new-tile');
      }, 300); // Match the duration of the animation
    } else {
      console.log('over')
      checkForGameOver()
    }
  }


  function moveRight() {
    for (let i = 0; i < BOARDSIZE - 1; i++) {
      if (i % 4 == 0) {
        let one = board[i].children[0].textContent
        let two = board[i + 1].children[0].textContent
        let three = board[i + 2].children[0].textContent
        let four = board[i + 3].children[0].textContent
        let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]
        // console.log(row)

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)
        board[i].children[0].textContent = newRow[0]
        board[i + 1].children[0].textContent = newRow[1]
        board[i + 2].children[0].textContent = newRow[2]
        board[i + 3].children[0].textContent = newRow[3]
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < BOARDSIZE; i++) {
      if (i % 4 == 0) {
        let one = board[i].children[0].textContent
        let two = board[i + 1].children[0].textContent
        let three = board[i + 2].children[0].textContent
        let four = board[i + 3].children[0].textContent
        let row = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]
        // console.log(row)

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)
        board[i].children[0].textContent = newRow[0]
        board[i + 1].children[0].textContent = newRow[1]
        board[i + 2].children[0].textContent = newRow[2]
        board[i + 3].children[0].textContent = newRow[3]
      }
    }
  }

  function moveUp() {
    for (let i = 0; i < SIZE; i++) {

      let one = board[i].children[0].textContent
      let two = board[i + SIZE].children[0].textContent
      let three = board[i + SIZE * 2].children[0].textContent
      let four = board[i + SIZE * 3].children[0].textContent
      let col = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]
      // console.log(col)

      let filteredCol = col.filter(num => num)
      let missing = 4 - filteredCol.length
      let zeros = Array(missing).fill(0)
      let newCol = filteredCol.concat(zeros)
      board[i].children[0].textContent = newCol[0]
      board[i + SIZE].children[0].textContent = newCol[1]
      board[i + SIZE * 2].children[0].textContent = newCol[2]
      board[i + SIZE * 3].children[0].textContent = newCol[3]

    }
  }
  function moveDown() {
    for (let i = 0; i < SIZE; i++) {

      let one = board[i].children[0].textContent
      let two = board[i + SIZE].children[0].textContent
      let three = board[i + SIZE * 2].children[0].textContent
      let four = board[i + SIZE * 3].children[0].textContent
      let col = [parseInt(one), parseInt(two), parseInt(three), parseInt(four)]
      // console.log(col)

      let filteredCol = col.filter(num => num)
      let missing = 4 - filteredCol.length
      let zeros = Array(missing).fill(0)
      let newCol = zeros.concat(filteredCol)
      board[i].children[0].textContent = newCol[0]
      board[i + SIZE].children[0].textContent = newCol[1]
      board[i + SIZE * 2].children[0].textContent = newCol[2]
      board[i + SIZE * 3].children[0].textContent = newCol[3]

    }
  }

  function mergeRow() {
    for (let i = 0; i < board.length - 1; i++) {
      let curerntCell = board[i].children[0].textContent
      let nextCell = board[i + 1].children[0].textContent
      if (curerntCell != 0 && curerntCell == nextCell) {
        let mergeTotal = parseInt(curerntCell) + parseInt(nextCell)
        board[i].children[0].textContent = mergeTotal
        board[i + 1].children[0].textContent = 0
        score += mergeTotal
        scoreDisplay.innerHTML = score
        // console.log('merged')
        // Add animation class
        board[i].classList.add('merge-animation');
        // Remove the animation class after the animation ends
        setTimeout(() => {
          board[i].classList.remove('merge-animation');
        }, 300); // Match the duration of the animation
        // console.log('merged')
      }
    }
    checkForWin();
    checkForGameOver();
  }

  function mergeColumn() {
    for (let i = 0; i < BOARDSIZE - SIZE; i++) {
      let curerntCell = board[i].children[0].textContent
      let nextCell = board[i + SIZE].children[0].textContent
      if (curerntCell != 0 && curerntCell == nextCell) {
        let mergeTotal = parseInt(curerntCell) + parseInt(nextCell)
        board[i].children[0].textContent = mergeTotal
        board[i + SIZE].children[0].textContent = 0
        score += mergeTotal
        scoreDisplay.innerHTML = score
        // console.log('merged')
        // Add animation class
        board[i].classList.add('merge-animation');
        // Remove the animation class after the animation ends
        setTimeout(() => {
          board[i].classList.remove('merge-animation');
        }, 300); // Match the duration of the animation
        // console.log('merged')

      }
    }
    checkForWin()
    checkForGameOver();
  }

  function control(e) {
    if (e.key === 'ArrowRight') {
      // moveRight()
      // mergeRow()
      // moveRight()
      // addNewTile()
      slideTiles('right')
    }
    else if (e.key === 'ArrowLeft') {
      // moveLeft()
      // mergeRow()
      // moveLeft()
      // addNewTile()
      slideTiles('left')
    }
    else if (e.key === 'ArrowUp') {
      // moveUp()
      // mergeColumn()
      // moveUp()
      // addNewTile()
      slideTiles('up')
    }
    else if (e.key === 'ArrowDown') {
      // moveDown()
      // mergeColumn()
      // moveDown()
      // addNewTile()
      slideTiles('down')
    }
  }

  /**
   * Slides the tiles in the specified direction.
   */
  function slideTiles(direction) {
    let moved = false;

    if (direction === 'left' || direction === 'right') {
      for (let row = 0; row < SIZE; row++) {
        let cells = [];
        for (let col = 0; col < SIZE; col++) {
          let index = row * SIZE + col;
          cells.push(board[index]);

        }
        if (direction === 'right') {
          cells.reverse();
        }
        moved = slideRow(cells) || moved;
      }
    } else if (direction === 'up' || direction === 'down') {
      for (let col = 0; col < SIZE; col++) {
        let cells = [];
        for (let row = 0; row < SIZE; row++) {
          let index = row * SIZE + col;
          cells.push(board[index]);

        }
        if (direction === 'down') {
          cells.reverse();
        }
        moved = slideRow(cells) || moved;
      }
    }

    if (moved) {
      addNewTile();
    }
  }

  /**
   * Slides a row of tiles.
   */
  function slideRow(cells) {
    let moved = false;
    for (let i = 0; i < cells.length - 1; i++) {
      for (let j = i + 1; j < cells.length; j++) {
        let value1 = parseInt(cells[i].querySelector('span').innerHTML);
        let value2 = parseInt(cells[j].querySelector('span').innerHTML);

        if (value2 === 0) {
          continue;
        }

        if (value1 === 0) {
          cells[i].querySelector('span').innerHTML = value2;
          cells[j].querySelector('span').innerHTML = 0;
          cells[i].classList.add('merge-animation');
          cells[i].classList.add('moving');
          cells[j].classList.add('moving');
          moved = true;
        } else if (value1 === value2) {
          cells[i].querySelector('span').innerHTML = value1 + value2;
          cells[j].querySelector('span').innerHTML = 0;
          cells[i].classList.add('merge-animation');
          cells[i].classList.add('moving');
          cells[j].classList.add('moving');
          score += value1 + value2;
          scoreDisplay.innerHTML = score
          moved = true;
          break;
        } else {
          checkForGameOver()
        }
      }
    }

    // Remove the moving class after the transition ends
    setTimeout(() => {
      cells.forEach(cell => {
        cell.classList.remove('moving');
        cell.classList.remove('merge-animation');
      });
    }, 300); // Match the duration of the transition

    return moved;
  }



  /**
   * Updates the high score based on the current score.
   */
  function updateScore(newScore) {
    score = newScore;
    scoreDisplay.innerHTML = score;
    localStorage.setItem('score', score);

    if (score > highscore) {
      highscore = score;
      madeHighScore = true
      highscoreDisplay.innerHTML = highscore;
      localStorage.setItem('highscore', highscore);
    }
  }
  /**
 * Saves the current game state to localStorage.
 */
  function saveGameState() {
    const boardState = board.map(cell => parseInt(cell.querySelector('span').textContent));
    localStorage.setItem('board', JSON.stringify(boardState));
    localStorage.setItem('score', score);
    localStorage.setItem('highscore', highscore);
  }


  function updateDisplay() {
    document.addEventListener('keydown', control)
    scoreDisplay.innerHTML = score;
    highscoreDisplay.innerHTML = highscore;

  }

  function checkForWin() {
    for (let i = 0; i < BOARDSIZE; i++) {
      if (board[i].children[0].innerHTML == 2048) {
        document.removeEventListener('keydown', control)

        updateScore(score)
        showModal('You', 'Win', score);
      }
    }
  }

  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < BOARDSIZE - 1; i++) {
      if (board[i].children[0].innerHTML == 0) {
        zeros++
      }
    }
    //console.log(zeros)
    if (zeros === 0) {
      document.removeEventListener('keydown', control)
      updateScore(score)
      showModal('Game', 'Over', score, false);
    }
  }

  function showModal(titleStart, titleEnd, score, confetti = true) {
    modalTitle[0].innerHTML = titleStart;
    modalTitle[1].innerHTML = titleEnd;
    modalScore[1].innerHTML = `${score}`;

    if (madeHighScore) modalScore[0].innerHTML = `HighScore`;

    modal.style.display = "block";
    if (confetti) {
      launchConfetti();
    }
  }

  function launchConfetti() {
    var duration = 5 * 1000;
    var end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 100,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 100,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  function hideModal() {
    localStorage.removeItem('board');
    localStorage.removeItem('score');
    modal.style.display = "none";
  }

  playAgainButton.addEventListener('click', () => {
    hideModal();
    localStorage.removeItem('board');
    init();
  });

  resetButton.addEventListener('click', () => {
    localStorage.removeItem('board');
    localStorage.removeItem('score');
    resetButton.classList.add('rotate');
    // Remove the moving class after the transition ends
    setTimeout(() => {
      resetButton.classList.remove('rotate');
  }, 300); // Match the duration of the transition

  init();
});

closeButton.addEventListener('click', hideModal);

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    hideModal();
  }
});
let startX, startY, endX, endY;

gameboard.addEventListener('touchstart', handleTouchStart, false);
gameboard.addEventListener('touchmove', handleTouchMove, false);
gameboard.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}

function handleTouchMove(e) {
  endX = e.touches[0].clientX;
  endY = e.touches[0].clientY;
}

function handleTouchEnd() {
  if (!startX || !startY || !endX || !endY) return;

  let deltaX = endX - startX;
  let deltaY = endY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > 0) {
      // Swipe right
      slideTiles('right');
    } else {
      // Swipe left
      slideTiles('left');
    }
  } else {
    // Vertical swipe
    if (deltaY > 0) {
      // Swipe down
      slideTiles('down');
    } else {
      // Swipe up
      slideTiles('up');
    }
  }

  // Reset values
  startX = null;
  startY = null;
  endX = null;
  endY = null;
}

/**
 * Sets the background color and text color of each cell in the board based on its value.
 */
function addColor() {
  for (let i = 0; i < BOARDSIZE; i++) {
    let cellValue = parseInt(board[i].children[0].innerHTML);
    switch (cellValue) {
      case 0:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        break;
      case 2:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-1');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-1');
        break;
      case 4:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-3');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-3');
        break;
      case 8:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-4');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-4');
        break;
      case 16:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-5');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-5');
        break;
      case 32:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-6');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-6');
        break;
      case 64:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-7');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-7');
        break;
      case 128:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-8');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-8');
        break;
      case 256:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-9');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-9');
        break;
      case 512:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-10');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-10');
        break;
      case 1024:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-11');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-11');
        break;
      case 2048:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-12');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-12');
        break;
      default:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-default');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-default');
        break;
    }
  }

}

init()


});
