export default class Board {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.board = this.buildBoard();
  }

  buildBoard() {
    let board = [];
    for (let col = 0; col < this.cols; col++) {
      board[col] = [];
      for (let row = 0; row < this.rows; row++) {
        board[col][row] = false;
      }
    }
    return board;
  }

  giveLife(col, row) {
    if (this.board[col] === undefined) {
      return this
    }
    this.board[col][row] = true;
    return this;
  }

  takeLife(col, row) {
    if (this.board[col] === undefined) {
      return this
    }
    this.board[col][row] = false;
    return this;
  }

  isAlive(col, row) {
    if (this.board[col] === undefined) {
      return false
    }
    return this.board[col][row];
  }

  liveCells() {
    let liveCells = [];
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.isAlive(col, row)) {
          liveCells.push({col: col, row: row});
        }
      }
    }
    return liveCells;
  }

  countOfAliveNeighbours(col, row) {
    let count = 0;
    for (let adjacentCol = col - 1; adjacentCol <= col + 1; adjacentCol++) {
      for (let adjacentRow = row - 1; adjacentRow <= row + 1; adjacentRow++) {
        if (!(adjacentRow === row && adjacentCol === col) && this.isAlive(adjacentCol, adjacentRow)) {
          count++;
        }
      }
    }
    return count
  }

  moveGeneration() {
    let cellsToDie = [];
    let cellsToGainLife = [];
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        let liveNeighboursCount = this.countOfAliveNeighbours(col, row);
        if (this.isAlive(col, row)) {
          if (liveNeighboursCount < 2 || liveNeighboursCount > 3) {
            cellsToDie.push({col: col, row: row});
          }
        } else {
          if (liveNeighboursCount === 3) {
            cellsToGainLife.push({col: col, row: row});
          }
        }
      }
    }
    cellsToDie.forEach((cell) => this.takeLife(cell.col, cell.row));
    cellsToGainLife.forEach((cell) => this.giveLife(cell.col, cell.row));
    return this;
  }
}
