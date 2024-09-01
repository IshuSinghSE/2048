/** Initialize.js */


/**
 * Creates the game board.
 */
export function createBoard(BOARDSIZE, gameboard, board) {
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
  return board
}

/**
* Creates the game board from saved state.
*/
export function createBoardFromState(BOARDSIZE, gameboard, board) {
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
  return board
}


/**
 * Sets the background color, text color, and border of each cell in the board based on its value.
 */
export function addColor(BOARDSIZE, board) {
  for (let i = 0; i < BOARDSIZE; i++) {
    let cellValue = parseInt(board[i].children[0].innerHTML);
    switch (cellValue) {
      case 0:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color')}`; // Add border
        break;
      case 2:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-1');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-1');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-1')}`;
        break;
      case 4:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-2');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-2');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-2')}`;
        break;
      case 8:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-3');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-3');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-3')}`;
        break;
      case 16:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-4');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-4');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-4')}`;
        break;
      case 32:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-5');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-5');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-5')}`;
        break;
      case 64:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-6');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-6');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-6')}`;
        break;
      case 128:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-7');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-7');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-7')}`;
        break;
      case 256:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-8');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-8');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-8')}`;
        break;
      case 512:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-9');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-9');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-9')}`;
        break;
      case 1024:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-10');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-10');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-10')}`;
        break;
      case 2048:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-11');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-11');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-11')}`;
        break;
      default:
        board[i].style.background = getComputedStyle(document.documentElement).getPropertyValue('--box-clr-12');
        board[i].style.color = getComputedStyle(document.documentElement).getPropertyValue('--box-text-12');
        board[i].style.border = `1px solid ${getComputedStyle(document.documentElement).getPropertyValue('--box-text-12')}`;
        break;
    }
  }

  return board;
}
