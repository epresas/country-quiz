import React, { useContext, useState } from 'react';

import authContext from '../../context/auth-context';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import styles from './Authentication.module.css';
import signinImg from '../../assets/img/undraw_sign_in.svg';
import loginImg from '../../assets/img/undraw_mobile_login.svg';

const Authentication = (props) => {
  const [signUpMode, setSignUpMode] = useState(false); 
  const toggleSignUpMode = (ev) => {
    console.log(ev)
    const isAllowedKeyEvent = ev.type === 'keyup' && (ev.keyCode === 32 || ev.keyCode === 13);
    if (ev.type === 'click' || isAllowedKeyEvent)
    setSignUpMode(!signUpMode);
  }

  const loginText =  <p className={styles.AuthDisclaimer}> Registered?<span className={styles.AuthSwitch} onClick={toggleSignUpMode} onKeyUp={toggleSignUpMode}  role='link' tabIndex="0">login</span></p>
  const registerText = <p className={styles.AuthDisclaimer}> Don't have an account?<span className={styles.AuthSwitch} onClick={toggleSignUpMode} onKeyUp={toggleSignUpMode} role='link' tabIndex="0">register</span></p>
  
  return (
    <section className={styles.AuthContainer}>
      <h2 className={styles.Title}>Country quiz</h2>
      <div className={styles.AuthContent}>
        <header className={styles.Header}>
          <figure className={styles.ImgContainer}>
            <img className={styles.Image} src={signUpMode ? signinImg : loginImg} alt=""/>
          </figure>
        <div className={styles.ContentTitle}>{signUpMode ? 'Register' : 'Login'}</div>
        </header>
        <form className={styles.Form}>
          {signUpMode ? <RegisterForm/> :  <LoginForm/>}
        </form>
        {signUpMode ? loginText : registerText}
      </div>
    </section>
  );
}

export default Authentication;
