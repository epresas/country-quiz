import React, { useState } from 'react';
import firebase from 'firebase';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import styles from './Authentication.module.css';
import signinImg from '../../assets/img/undraw_sign_in.svg';
import loginImg from '../../assets/img/undraw_mobile_login.svg';
import axios from 'axios';

const Authentication = (props) => {
  const [signUpMode, setSignUpMode] = useState(false); 
  
  const toggleSignUpMode = (ev) => {
    const isAllowedKeyEvent = ev.type === 'keyup' && (ev.keyCode === 32 || ev.keyCode === 13);
    if (ev.type === 'click' || isAllowedKeyEvent)
    setSignUpMode(!signUpMode);
  }



  const loginText =  <p className={styles.AuthDisclaimer}> Registered?<span className={styles.AuthSwitch} onClick={toggleSignUpMode} onKeyUp={toggleSignUpMode}  role='link' tabIndex="0">login</span></p>;
  const registerText = <p className={styles.AuthDisclaimer}> Don't have an account?<span className={styles.AuthSwitch} onClick={toggleSignUpMode} onKeyUp={toggleSignUpMode} role='link' tabIndex="0">register</span></p>;

  const loginHandler = (loginData) => {
    const { email, password } = loginData;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {

        if (!!user) {
          console.log('LOGIN SUCCESSFUL');
          props.history.push('/quiz');
        } else {
          props.history.push('/auth');
        }
      })
      .catch((error) => {
        console.log('LOGIN ERROR:: ', error);
      });
  }

  const registerHandler = (registerData) => {
    const { email, password, username } = registerData;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (!!user) {
          const userData = {
            email,
            username,
          };
          axios.post('https://ep-country-quiz-default-rtdb.europe-west1.firebasedatabase.app/players.json', userData)
            .then( response => {
              props.history.push('/quiz');
            })
            .catch(err => {
              console.log('ERROR AXION:: ', err);
            });
        } else {
          props.history.push('/auth');
        }
      })
      .catch((error) => {
        console.log('ERROR FIREBASE:: ', error);
      });
  }

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
          {signUpMode ? <RegisterForm onRegister={registerHandler}/> :  <LoginForm onLogin={loginHandler}/>}
        </form>
        {signUpMode ? loginText : registerText}
      </div>
    </section>
  );
}

export default Authentication;
