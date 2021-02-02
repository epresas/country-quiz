import React, { useState, useRef } from 'react'

import styles from '../Form.module.css';
import * as utilities from '../../../shared/utilities';

const LoginForm = (props) => {
  const [controls, setControls] = useState({
    email: {
      value: '',
      type: 'text',
      isValid: false,
      isTouched: false,
      errorMsg: null,
      validation: {
        required: true,
        pattern: 'email',
      },
    },
    password: {
      value: '',
      type:'password',
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

  const togglePassword = () => {
    const updatedControls = {
      ...controls,
      password: {
        ...controls.password,
        type: controls.password.type === 'text' ? 'password' : 'text',
      }
    };

    setControls(updatedControls);
  };

  const validateForm = () => {

    for (const control in controls) {
      if (!controls[control].isValid) {
        return false;
      }
    };

    return true;
  }

  const onLoginHandler = () => {
    if (validateForm()) {
      const loginData = {
        email: controls.email.value,
        password: controls.password.value,
      }
      props.onLogin(loginData);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.Form} >
          <div className={styles.FormGroup}>
            <input 
              className={getInputClasses('email').join(' ')} 
              type="text" 
              name="email" 
              id="email"
              onChange={(ev) => {inputChangeHandler(ev)}}
              onBlur={(ev) => {inputChangeHandler(ev)}}
              value={controls.email.value}
            />
            <label className={styles.FormLabel} htmlFor="email">Email</label>
            {!controls.email.isValid && <p className={styles.ErrorMsg}>{controls.email.errorMsg}</p>}
          </div>
          <div className={styles.FormGroup}>
            <input 
              className={getInputClasses('password').join(' ')} 
              type={controls.password.type} 
              name="password"
              onChange={(ev) => {inputChangeHandler(ev)}}
              onBlur={(ev) => {inputChangeHandler(ev)}}
              value={controls.password.value}
            />
            <label className={styles.FormLabel} htmlFor="password">Password</label>
            <i className={controls.password.type === 'text' ? styles.HidePassword : styles.ShowPassword} onClick={togglePassword}></i>
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
