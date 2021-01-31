import React from 'react'

import styles from './Button.module.css';

const Button = (props) => {
  return(
    <button type="button" className={styles.Button} onClick={props.clicked} disabled={props.disabled}>
      <span>{props.label}</span>
    </button>
  )
}

export default Button;
