import React from 'react';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} >
      {props.content}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square content={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  render() {
    const status = 'Next player: X';
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      squares: Array(9).fill(null),
      isNextX: true
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(i) {
    let isNextX = this.state.isNextX;
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) === null) {
      squares[i] = isNextX ? 'X' : 'O';
      isNextX = !isNextX;
      this.setState({ squares: squares, isNextX: isNextX });
    }
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{this.state.isNextX? 'X' : 'O' }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
