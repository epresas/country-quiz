import React from 'react';

import styles from './Answer.module.css';

const Answer = (props) => {
  const stylesArray = [styles.AnswerBtn];
  const isDisabled = props.answered && !props.correct && !props.incorrect;
  let check = null;

  if (props.correct) {
    stylesArray.push(styles.Correct);
    check = <span className={[styles.Check, styles.CheckCorrect].join(' ')}></span>
  }

  if (props.incorrect) {
    stylesArray.push(styles.Incorrect);
    check = <span className={[styles.Check, styles.CheckIncorrect].join(' ')}></span>
  }

  if (isDisabled) {
    stylesArray.push(styles.Disabled)
    
  }



  return (
    <li className={styles.Answer} id={props.id} disabled={isDisabled}>
      <button 
        type="button" 
        className={stylesArray.join(' ')}  
        onClick={props.clicked} 
        disabled={isDisabled} 
        tabIndex={(isDisabled || props.correct || props.incorrect) ? -1 : 0}>
        <span className={styles.Counter}>{props.id}</span>
        <p className={styles.Label}>{props.label}</p>
        {check}
      </button>
    </li>
  );
}

export default Answer;
