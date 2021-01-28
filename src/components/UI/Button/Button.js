import React from 'react'

import classes from './Button.module.css';

const Button = (props) => {
  return(
    <button type="button" className={classes.Button} onClick={props.clicked} disabled={props.disabled}>
      <span>Next</span>
    </button>
  )
}

export default Button;
