
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


/**
 * Initializes the particles.js library.
 */
export function initializeParticles() {
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#f96b8a"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#fb6b8a",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 200,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 200,
          "size": 4,
          "duration": 0.3,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 100,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
  });
}