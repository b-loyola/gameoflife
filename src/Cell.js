import React from 'react';

export default class Cell extends React.Component {
  // randomOffset() {
  //   return Math.floor((Math.random() * 6) - 3)
  // }

  style() {
    return {
      width: this.props.cellSize,
      height: this.props.cellSize,
      left: (this.props.col * this.props.cellSize),
      top: (this.props.row * this.props.cellSize),
    }
  }

  render() {
    return (
      <div className="cell" style={this.style()} />
    );
  }
}
