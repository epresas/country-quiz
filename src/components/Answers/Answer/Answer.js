import React from 'react';

import classes from './Answer.module.css';

const Answer = (props) => {
  const classesArray = [classes.AnswerBtn];
  const isDisabled = props.answered && !props.correct && !props.incorrect;
  let check = null;

  if (props.correct) {
    classesArray.push(classes.Correct);
    check = <span className={[classes.Check, classes.CheckCorrect].join(' ')}></span>
  }

  if (props.incorrect) {
    classesArray.push(classes.Incorrect);
    check = <span className={[classes.Check, classes.CheckIncorrect].join(' ')}></span>
  }

  if (isDisabled) {
    classesArray.push(classes.Disabled)
    
  }



  return (
    <li className={classes.Answer} id={props.id} >
      <button type="button" className={classesArray.join(' ')}  onClick={props.clicked} disabled={isDisabled}>
        <span className={classes.Counter}>{props.id}</span>
        <p className={classes.Label}>{props.label}</p>
        {check}
      </button>
    </li>
  );
}

export default Answer;
