import React from 'react';

import styles from './RegisterForm.module.css'

const RegisterForm = (props) => {
  const onRegisterHandler = () => {};
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.Form} >
          <div className={styles.FormGroup}>
            <input className={styles.FormInput} type="text" name="username"  />
            <label className={styles.FormLabel} htmlFor="username">Username</label>
          </div>
          <div className={styles.FormGroup}>
            <input className={styles.FormInput} type="text" name="email" />
            <label className={styles.FormLabel} htmlFor="email">Email</label>
          </div>
          <div className={styles.FormGroup}>
            <input className={styles.FormInput} type="text" name="password"/>
            <label className={styles.FormLabel} htmlFor="password">Password</label>
          </div>
        </div>
      </div>
      <div className={styles.Footer}>
        <button type="button" className={styles.Btn} onClick={onRegisterHandler}>
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
