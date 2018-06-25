import React, { Component } from 'react'
import Stars from './stars'
import Button from './button'
import Answer from './answer'
import Numbers from './numbers'
import DoneFrame from './done_frame'
import _ from 'lodash'

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

class Game extends Component {
  static randomNumber = () =>  1 + Math.floor(Math.random()*9);
  static initialState = () => ({
    selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    usedNumbers: [],
    answerIsCorrect: null,
    redraws: 8,
    doneStatus: null
  });
  state = Game.initialState();

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
      this.setState(prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }));
    }
  }

  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  }

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  }

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: Game.randomNumber()
    }), this.updateDoneStatus);

  }

  redraw = () => {
    if (this.state.redraws > 0) {
      this.setState(prevState => ({
        randomNumberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        selectedNumbers: [],
        redraws: prevState.redraws -1
      }), this.updateDoneStatus);
    }
  }

  possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
    const possibleNumbers = _.range(1, 10).filter(number =>
      usedNumbers.indexOf(number) === -1
    );
    return possibleCombinationSum(possibleNumbers, randomNumberOfStars)
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "You won. Nice!" };
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return {doneStatus: 'Game Over!'};
      }
    });
  }

  resetGame = () => {
    this.setState(Game.initialState());
  }

  render(){
    const { selectedNumbers, randomNumberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;
    return(
      <div className="container instructions">
        <div>Instructions: Select number that add up to the number of stars you see. Use all the numbers to win! </div>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers}
                  checkAnswer={this.checkAnswer}
                  answerIsCorrect={answerIsCorrect} 
                  acceptAnswer={this.acceptAnswer} 
                  redraw={this.redraw}
                  redraws={redraws} />
          <Answer selectedNumbers={selectedNumbers} 
                  unselectNumber={this.unselectNumber}/>
        </div>
        <br />
        {doneStatus ?
          <DoneFrame doneStatus={doneStatus}
                     resetGame={this.resetGame} />:
          <Numbers selectedNumbers={selectedNumbers}
                   selectNumber={this.selectNumber}
                   usedNumbers={usedNumbers} />
        }
      </div>
    );
  }
}

export default Game;
