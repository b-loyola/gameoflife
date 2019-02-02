import React from 'react';

import BoardComponent from './BoardComponent';
import Board from './Board';

import './game.css';

const CELL_SIZE = 10;
const COLUMNS = 128;
const ROWS = 74;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Board(COLUMNS, ROWS),
    }
  }

  componentDidMount() {
    setInterval(() => { this.moveGeneration() }, 100);
  }

  moveGeneration() {
    this.setState({board: this.state.board.moveGeneration()})
  }

  onMove(col, row) {
    // this.state.board.giveLife(col, row)
    this.setState({board: this.state.board.giveLife(col, row)});
  }

  render() {
    return (
      <div className="game">
        <BoardComponent
          onMouseMove={this.onMove.bind(this)}
          board={this.state.board}
          cellSize={CELL_SIZE}
          width={CELL_SIZE * COLUMNS}
          height={CELL_SIZE * ROWS}
        />
      </div>
    );
  }
}
