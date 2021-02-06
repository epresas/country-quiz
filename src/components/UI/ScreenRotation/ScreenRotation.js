import React from 'react'

import styles from './ScreenRotation.module.css';
import img from '../../../assets/img/screen.svg';

const ScreenRotation = (props) => (
  <div className={styles.Backdrop} role='dialog'>
    <div className={styles.Content}>
      <h2 className={styles.Title}>Please rotate your device to keep playing</h2>
      <figure className={styles.ImgWrapper}>
        <img src={img} alt='' className={styles.Img}/>
      </figure>
    </div>
  </div>
)

export default ScreenRotation;
