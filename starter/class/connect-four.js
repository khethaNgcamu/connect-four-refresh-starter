const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('u', 'Move up', this.moveUp.bind(this));
    Screen.addCommand('d', 'Move down', this.moveDown.bind(this));
    Screen.addCommand('l', 'Move left', this.moveLeft.bind(this));
    Screen.addCommand('r', 'Move right', this.moveRight.bind(this));
    Screen.addCommand('space', 'Place move at cursor position', this.placeMove.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  moveUp(){
    this.cursor.up();
    Screen.render();
  }

  moveDown(){
    this.cursor.down();
    Screen.render();
  }

  moveLeft(){
    this.cursor.left();
    Screen.render();
  }

  moveRight(){
    this.cursor.right();
    Screen.render();
  }

  placeMove(column) {
    // Determine the row where the move should be placed
    let row = this.dropPiece(column);

    // Check if the move is valid and the column is not full
    if (row !== -1) {
      // Place the move in the grid
      this.grid[row][column] = this.playerTurn;

      // Render the updated grid
      Screen.render();

      // Check for a win or tie
      const winner = ConnectFour.checkWin(this.grid);
      if (winner) {
        ConnectFour.endGame(winner);
      } else {
        // Toggle player turn
        this.playerTurn = this.playerTurn === 'O' ? 'X' : 'O';
      }
    }
  }

  // Method to drop the piece into the lowest empty row in the given column
  dropPiece(column) {
    for (let row = this.grid.length - 1; row >= 0; row--) {
      if (this.grid[row][column] === ' ') {
        return row; // Return the row where the piece should be placed
      }
    }
    return -1; // Column is full, cannot place the piece
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    const numRows = grid.length;
    const numCols = grid[0].length;

    // Check horizontally
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col <= numCols - 4; col++) {
            const cell = grid[row][col];
            if (cell !== ' ' &&
                cell === grid[row][col + 1] &&
                cell === grid[row][col + 2] &&
                cell === grid[row][col + 3]) {
                return cell; // Player wins
            }
        }
    }

    // Check vertically
    for (let row = 0; row <= numRows - 4; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = grid[row][col];
            if (cell !== ' ' &&
                cell === grid[row + 1][col] &&
                cell === grid[row + 2][col] &&
                cell === grid[row + 3][col]) {
                return cell; // Player wins
            }
        }
    }

    // Check diagonally (from top-left to bottom-right)
    for (let row = 0; row <= numRows - 4; row++) {
        for (let col = 0; col <= numCols - 4; col++) {
            const cell = grid[row][col];
            if (cell !== ' ' &&
                cell === grid[row + 1][col + 1] &&
                cell === grid[row + 2][col + 2] &&
                cell === grid[row + 3][col + 3]) {
                return cell; // Player wins
            }
        }
    }

    // Check diagonally (from top-right to bottom-left)
    for (let row = 0; row <= numRows - 4; row++) {
        for (let col = 3; col < numCols; col++) {
            const cell = grid[row][col];
            if (cell !== ' ' &&
                cell === grid[row + 1][col - 1] &&
                cell === grid[row + 2][col - 2] &&
                cell === grid[row + 3][col - 3]) {
                return cell; // Player wins
            }
        }
    }

    // Check for tie
    let isTie = true;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] === ' ') {
                isTie = false; // Game is not a tie, there are empty cells
                break;
            }
        }
        if (!isTie) {
            break;
        }
    }
    if (isTie) {
        return 'T'; // Game is a tie
    }

    return false; // Game is not over yet
}

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
