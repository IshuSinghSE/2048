import { createBoard, createBoardFromState, addColor } from "./initialize.js";
import { showScoreUpdateOnBoard, showTileScoreUpdate, initializeParticles } from "./animation.js";

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

  const hamburgerMenu = document.getElementById('hamburger-menu');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const accordions = document.querySelectorAll('.accordion');

  // Hamburger Menu Toggle
  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('menu-open');
    dropdownMenu.classList.toggle('menu-open');
  });

  // Accordion Toggle
  accordions.forEach(accordion => {
    accordion.addEventListener('click', function () {
      this.classList.toggle('accordion-open');
    });
  });

  // Night Mode Toggle
  const nightModeToggle = document.getElementById('night-mode-toggle');
  nightModeToggle.addEventListener('change', function () {
    if (this.checked) {
      document.body.classList.add('night-mode');
      localStorage.setItem('nightMode', 'enabled');
    } else {
      document.body.classList.remove('night-mode');
      localStorage.setItem('nightMode', 'disabled');
    }
  });

  // Vibration Toggle
  const vibrationToggle = document.getElementById('vibration-toggle');
  let enableVibration = true;
  vibrationToggle.addEventListener('change', function () {
    enableVibration = this.checked;
    localStorage.setItem('vibration', enableVibration ? 'enabled' : 'disabled');
  });

  // Particles.js Toggle
  const particlesToggle = document.getElementById('particles-toggle');
  particlesToggle.addEventListener('change', function () {
    const particlesElement = document.getElementById('particles-js');
    if (this.checked) {
      particlesElement.style.display = 'block';
      localStorage.setItem('particles', 'enabled');
    } else {
      particlesElement.style.display = 'none';
      localStorage.setItem('particles', 'disabled');
    }
  });

  // Load preferences from localStorage
  if (localStorage.getItem('nightMode') === 'enabled') {
    document.body.classList.add('night-mode');
    nightModeToggle.checked = true;
  }

  if (localStorage.getItem('vibration') === 'enabled') {
    enableVibration = true;
    vibrationToggle.checked = true;
  } else {
    enableVibration = false;
  }

  if (localStorage.getItem('particles') === 'enabled') {
    particlesToggle.checked = true;
  } else {
    const particlesElement = document.getElementById('particles-js');
    particlesElement.style.display = 'none';
  }



  const SIZE = 4;
  const BOARDSIZE = SIZE * SIZE;
  let board;
  let score;
  let highscore;
  let madeHighScore = false;
  let startX, startY, endX, endY;

  gameboard.addEventListener('touchstart', handleTouchStart, { passive: false });
  gameboard.addEventListener('touchmove', handleTouchMove, { passive: false });
  gameboard.addEventListener('touchend', handleTouchEnd, { passive: false });

  function supportsVibration() {
    return "vibrate" in navigator;
  }

  function triggerVibration(duration = 100) {
    if (supportsVibration()) {
      navigator.vibrate(duration); // Duration in milliseconds
    }
  }

  initializeParticles();


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
      board = createBoardFromState(BOARDSIZE, gameboard, board);
      board = addColor(BOARDSIZE, board);
    } else {
      board = createBoard(BOARDSIZE, gameboard, board);
      addNewTile();
      addNewTile();
    }
    updateDisplay();

  }

  // Add new tile
  function addNewTile() {
    let emptyCells = board.filter(cell => cell.querySelector('span').textContent == 0);

    if (emptyCells.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyCells.length);
      let newTile = emptyCells[randomIndex];
      let randomNumber = Math.random() < 0.9 ? 2 : 4;
      newTile.querySelector('span').textContent = randomNumber;
      newTile.classList.add('new-tile');
      board = addColor(BOARDSIZE, board); // Update colors after adding a new tile
      saveGameState()
      // Remove the animation class after the animation ends
      setTimeout(() => {
        newTile.classList.remove('new-tile');
      }, 300); // Match the duration of the animation
    } else {
      checkForGameOver()
    }
  }

  // Helper function to handle movement and merging
  function slideAndMerge(cells) {
    let line = []
    cells.forEach(cell => {
      line.push(parseInt(cell.children[0].textContent))
    });

    // Slide tiles to remove zeros
    let filteredLine = line.filter(num => num !== 0);
    let missing = 4 - filteredLine.length;
    let zeros = Array(missing).fill(0);

    // Merge tiles
    for (let i = 0; i < filteredLine.length - 1; i++) {
      if (filteredLine[i] === filteredLine[i + 1]) {
        filteredLine[i] *= 2;
        score += filteredLine[i];
        let scoreIncrement = filteredLine[i]
        // Trigger vibration
        triggerVibration();

        if (scoreIncrement) {
          showTileScoreUpdate(cells[i], scoreIncrement)
          showScoreUpdateOnBoard(scoreIncrement, scoreDisplay, score)
        }
        // scoreDisplay.innerHTML = score;
        filteredLine[i + 1] = 0;
      }
    }

    // Slide again after merging
    filteredLine = filteredLine.filter(num => num !== 0);
    missing = 4 - filteredLine.length;
    zeros = Array(missing).fill(0);

    return filteredLine.concat(zeros);
  }

  // General function to move tiles in any direction
  function move(direction) {
    let boardChanged = false;


    for (let i = 0; i < SIZE; i++) {
      let line = [];

      // Extract the current line/column based on the direction
      for (let j = 0; j < SIZE; j++) {
        if (direction === "left" || direction === "right") {
          line.push(board[i * SIZE + j] || 0);
        } else {
          line.push(board[j * SIZE + i] || 0);
        }
      }

      // Reverse the line if moving right or down
      if (direction === "right" || direction === "down") {
        line.reverse();
      }

      let newLine = slideAndMerge(line);

      // Reverse back if necessary
      if (direction === "right" || direction === "down") {
        newLine.reverse();
      }
      // Place the new line/column back into the board
      for (let j = 0; j < SIZE; j++) {
        if (direction === "left" || direction === "right") {
          if (board[i * SIZE + j].children[0].textContent != newLine[j]) {
            boardChanged = true;
          }
          board[i * SIZE + j].children[0].textContent = newLine[j];
        } else {
          if (board[j * SIZE + i].children[0].textContent != newLine[j]) {
            boardChanged = true;
          }
          board[j * SIZE + i].children[0].textContent = newLine[j];
        }
        boardChanged = boardChanged || (board[i * SIZE + j].children[0].textContent != newLine[j]);
      }
    }
    // Trigger vibration
    triggerVibration(150);

    if (boardChanged) {
      // Add logic to spawn new tiles, check for win or game over, etc.
      checkForWin()
      addNewTile()
      if (score < highscore) {

      }
    }
  }

  function control(e) {
    switch (e.key) {
      case 'ArrowLeft':
        move('left')
        break;
      case 'ArrowRight':
        move('right')
        break;
      case 'ArrowUp':
        move('up')
        break;
      case 'ArrowDown':
        move('down')
        break;

    }
  }

  /**
 * Saves the current game state to localStorage.
 */
  function saveGameState() {
    const boardState = board.map(cell => parseInt(cell.querySelector('span').textContent));
    localStorage.setItem('board', JSON.stringify(boardState));
    localStorage.setItem('score', score);


  }


  function updateDisplay() {
    document.addEventListener('keydown', control)
    scoreDisplay.innerHTML = score;

  }

  function checkForWin() {
    for (let i = 0; i < BOARDSIZE; i++) {
      if (board[i].children[0].innerHTML == 2048) {
        document.removeEventListener('keydown', control)
        showModal('You', 'Win', score);
        // Trigger vibration
        triggerVibration([100, 50, 300]);
      }
    }
  }

  function checkForGameOver() {
    let status = JSON.parse(localStorage.getItem('board'))
    if (score > highscore) {
      madeHighScore = true
      highscore = score;
      let textEl = document.createElement('div')
      let text = document.createElement('p');
      text.innerHTML = 'HIGHSCORE';
      textEl.append(text)
      document.body.appendChild(textEl);

      highscoreDisplay.innerHTML = highscore;
      localStorage.setItem('highscore', highscore);

      textEl.classList.add('highscore')
      textEl.children[0].classList.add('highscore-font')
      triggerVibration(300);

      launchConfetti()

      setTimeout(() => {
        textEl.remove();
      }, 5000);
    }
    if (status) {
      let zeros = status.filter(num => num == 0).length
      if (zeros === 0) {
        document.removeEventListener('keydown', control)
        // Trigger vibration
        triggerVibration(300);
        showModal('Game', 'Over', score, false);
      }
    }
  }

  function showModal(titleStart, titleEnd, score, confetti = true) {
    modalTitle[0].innerHTML = titleStart;
    modalTitle[1].innerHTML = titleEnd;
    modalScore[1].innerHTML = `${score}`;

    if (madeHighScore) modalScore[0].innerHTML = `HighScore`;
    localStorage.removeItem('board');
    localStorage.removeItem('score');

    modal.style.display = "block";
    if (confetti) {
      launchConfetti();
    }
  }

  function launchConfetti() {
    var duration = 4 * 1000;
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
    modal.style.display = "none";
    triggerVibration();

  }

  playAgainButton.addEventListener('click', () => {
    hideModal();
    // Trigger vibration
    triggerVibration();
    localStorage.removeItem('board');
    init();
  });

  resetButton.addEventListener('click', () => {
    localStorage.removeItem('board');
    localStorage.removeItem('score');
    resetButton.classList.add('rotate');
    // Trigger vibration
    triggerVibration();
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



  function handleTouchStart(e) {
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
    if (e.touches.length !== 1) return;
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;

    const touchDiff = endY - startY;

    if (touchDiff > 0 && window.scrollY === 0) {
      e.preventDefault();
    }
  }

  function handleTouchEnd() {
    if (!startX || !startY || !endX || !endY) return;

    let deltaX = endX - startX;
    let deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        // Swipe right
        move('right');
      } else {
        // Swipe left
        move('left');
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        // Swipe down
        move('down');
      } else {
        // Swipe up
        move('up');
      }
    }

    // Reset values
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;
  }

  init()
});
