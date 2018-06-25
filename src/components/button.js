import React from 'react'
import FA from 'react-fontawesome'

const Button = (props) => {
  let button;
  switch(props.answerIsCorrect) {
    case true:
      button =
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <FA className="fa fa-check" />
        </button>;
      break;
    case false:
      button =
        <button className="btn btn-danger">
          <FA className="fa fa-times" />
        </button>;
      break;
    default:
      button =
        <button className="btn btn-lg" 
            onClick={props.checkAnswer}
            disabled={props.selectedNumbers.length === 0}>check</button>;
      break;
  }
  return(
    <div className="col-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning" 
              onClick={props.redraw}
              disabled={props.redraws ===0}>
        <FA className="fa fa-refresh" />{props.redraws}
      </button>
    </div>
  );
}

export default Button;
