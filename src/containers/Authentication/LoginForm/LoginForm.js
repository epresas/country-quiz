import React, { useState, useRef } from 'react'

import styles from './LoginForm.module.css';
import * as utilities from '../../../shared/utilities';

const LoginForm = (props) => {
  const [controls, setControls] = useState({
    username: {
      value: '',
      isValid: false,
      isTouched: false,
      errorMsg: null,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 30,
      },
    },
    password: {
      value: '',
      isValid: false,
      isTouched: false,
      errorMsg: null,
      validation: {
        required: true,
        pattern: 'password',
      },
    }
  });

  const getInputClasses = (inputName)  => {
    const element = controls[inputName];
    const classesArray = [styles.FormInput];
    
    if (element.value) {
      classesArray.push(styles.IsFilled);
    }

    if (element.isTouched && !element.isValid) {
      classesArray.push(styles.Error);
    }

    return classesArray;
  };

  const getValidationErrorMessage = (value, elemName) => {
    if (!value.length) {
      return 'This field is required';
    }

    if (!controls[elemName].isValid) {
      return 'Please enter a valid value';
    }

    return null;
  }

  const inputChangeHandler = (ev) => {
    const elemName = ev.target.name;
    const updatedControls = {
      ...controls,
      [elemName]: {
        ...controls[elemName],
        value: ev.target.value,
        isValid: utilities.checkValidity(ev.target.value, controls[elemName].validation),
        isTouched: true,
        errorMsg: getValidationErrorMessage(ev.target.value.trim(), elemName)
      }
    };

    setControls(updatedControls);
  }
  const onLoginHandler = () => {

  };

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.Form} >
          <div className={styles.FormGroup}>
            <input 
              className={getInputClasses('username').join(' ')} 
              type="text" 
              name="username" 
              id="username"
              onChange={(ev) => {inputChangeHandler(ev)}}
              onBlur={(ev) => {inputChangeHandler(ev)}}
              value={controls.username.value}
            />
            <label className={styles.FormLabel} htmlFor="username">Username</label>
            {!controls.username.isValid && <p className={styles.ErrorMsg}>{controls.username.errorMsg}</p>}
          </div>
          <div className={styles.FormGroup}>
            <input 
              className={getInputClasses('password').join(' ')} 
              type="password" 
              name="password"
              onChange={(ev) => {inputChangeHandler(ev)}}
              onBlur={(ev) => {inputChangeHandler(ev)}}
              value={controls.password.value}
            />
            <label className={styles.FormLabel} htmlFor="password">Password</label>
            {!controls.password.isValid && <p className={styles.ErrorMsg}>{controls.password.errorMsg}</p>}
          </div>
        </div>
      </div>
      <div className={styles.Footer}>
        <button type="button" className={styles.Btn} onClick={onLoginHandler}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
