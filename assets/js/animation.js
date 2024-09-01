
/**
 * Displays a score update for a merged tile.
 */
export function showTileScoreUpdate(mergedTile, scoreIncrement) {
  // Create the score element
  const scoreElement = document.createElement('div');
  scoreElement.className = 'tile-score-update';
  scoreElement.textContent = `+${scoreIncrement}`;

  // Set its position in the middle of the merged tile
  scoreElement.style.left = `${mergedTile.getBoundingClientRect().x + 30}px`; // Adjust as per your grid size
  scoreElement.style.top = `${mergedTile.getBoundingClientRect().y + 25}px`;
  let tilecolor = getComputedStyle(mergedTile).getPropertyValue('color');
  scoreElement.style.color = tilecolor
  // Append the element to the grid
  document.querySelector('.gameboard').appendChild(scoreElement);

  // Remove the score element after the animation ends
  setTimeout(() => {
    scoreElement.remove();
  }, 800); // Match with CSS animation duration
}

/**
 * Displays a score update on the game board.
 */
export function showScoreUpdateOnBoard(scoreIncrement, scoreDisplay, score) {
  // Create the score element
  const scoreElement = document.createElement('div');
  scoreElement.className = 'score-update';
  scoreElement.textContent = `+${scoreIncrement}`;

  // Position it near the scoreboard
  const scoreboard = document.querySelector('.score-container');
  const scoreboardRect = scoreboard.getBoundingClientRect();
  scoreElement.style.left = `${scoreboardRect.left}px`; // Position near the scoreboard
  scoreElement.style.top = `${scoreboardRect.top}px`;

  // Append the element to the body
  document.body.appendChild(scoreElement);
  // Add the animation class
  scoreDisplay.classList.add('score-update-animation');
  scoreDisplay.innerHTML = score

  // Remove the animation class after the animation completes
  setTimeout(() => {
    scoreDisplay.classList.remove('score-update-animation');
  }, 500); // Duration of the animation in milliseconds

  // Remove the score element after the animation ends
  setTimeout(() => {
    scoreElement.remove();
  }, 1500); // Match with CSS animation duration
}
