import React from 'react'

import styles from './Results.module.css';
import winnersImg from '../../assets/img/undraw_winners.svg'

const Results = ({ score, retryClicked, continueClicked }) => {
  
  return (
    <section className={styles.Results}>
      <div className={styles.Content}>
        <figure className={styles.Image}>
          <img src={winnersImg} alt=""/>
        </figure>
        <h3 className={styles.Title}>Results</h3>
        <p className={styles.Info}> You got <span className={styles.Score}>{score}</span> correct answers</p>
      </div>
      <footer className={styles.Footer}>
        <button 
          type="button" 
          className={styles.RetryBtn}
          onClick={retryClicked}
        >Try again</button>
        <button 
          type="button" 
          className={styles.ContinueBtn}
          onClick={continueClicked}
        >Continue</button>
      </footer>
    </section>
  )
}


export default Results;