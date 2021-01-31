import React from 'react'

import styles from './Answers.module.css';
import Answer from './Answer/Answer';

const Answers = (props) => {
  const answers = props.answers.answers;
  
  return (
    <ul className={styles.Answers}>
      {answers.map(answer => (
        <Answer 
          key={answer.id} 
          id={answer.id} 
          label={answer.value}
          answered = {props.answers.isAnswered}
          correct={answer.correct}
          incorrect={answer.incorrect}
          clicked={() => props.onAnswerClicked(answer)}
        />))}    
    </ul>
  );
}

export default Answers;
