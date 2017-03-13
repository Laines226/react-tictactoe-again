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
      //currentSquares: Array(9).fill(null),
      stepNumber: 0,
      history: [Array(9).fill(null)],
      isNextX: true,
    };

    this.handleClick = this.handleClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }
  handleClick(i) {
    let stepNumber = this.state.stepNumber;
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    const squares = history[history.length - 1].slice();
    let isNextX =  this.state.isNextX;
    if (calculateWinner(squares) === null && squares[i] === null) {
      history.push(squares);
      stepNumber++;
      squares[i] = isNextX ? 'X' : 'O';
      isNextX = !isNextX;
      this.setState({history : history, stepNumber: stepNumber, isNextX: isNextX });
    }
  }
  jumpTo(step){
    console.log("handleHistoryClick [event.target]", step);
    let isNextX = step === 0 || (step%2) === 0;
    this.setState({stepNumber: step, isNextX: isNextX})
  }
  render() {
    let history = this.state.history;
    const currentSquares = history[this.state.stepNumber];
    console.log("render [currentSquares],[stepNumber]", currentSquares, this.state.stepNumber);
    let winner = calculateWinner(currentSquares.slice());
    let status;
    if(winner){
      status = "Player " + winner + " wins!";
    }
    else{
      let nextPlayer = this.state.isNextX ? 'X': 'O';
      status = "Next Player: " + nextPl
      ayer;
    }
    let historyList =  history.map((element, index) => {
      return <li key={index}><a href="#" onClick={() => {this.jumpTo(index)}}> history #{index}</a></li>;
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{historyList}</ol>
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
