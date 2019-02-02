import React from 'react';

import Cell from './Cell';

export default class BoardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.boardDiv = React.createRef();
  }

  renderLiveCells() {
    return this.props.board.liveCells().map((cell) =>
      <Cell key={`${cell.col}-${cell.row}`} col={cell.col} row={cell.row} cellSize={this.props.cellSize}/>
    );
  }

  onMouseMove(e) {
    const boundingRect = this.boardDiv.current.getBoundingClientRect()
    const left = Math.floor(e.clientX - boundingRect.left);
    const top = Math.floor(e.clientY - boundingRect.top);
    const col = Math.max(0, Math.floor(left / this.props.cellSize));
    const row = Math.max(0, Math.floor(top / this.props.cellSize));
    this.props.onMouseMove(col, row)
  }

  render() {
    return(
      <div
        ref={this.boardDiv}
        className="board"
        style={{width: this.props.width, height: this.props.height}}
        onMouseMove={this.onMouseMove.bind(this)}
      >
        {this.renderLiveCells()}
      </div>
    );
  }
}
