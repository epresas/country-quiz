import React from 'react';

import styles from './Footer.module.css';

const Footer = (props) => {
  return(
    <footer className={styles.Footer}>
      <p className={styles.Info}>
        <a 
          className={styles.Link} 
          href='https://github.com/epresas' 
          target='_blank' 
          rel='noreferrer'
        >Edmundo Presas</a> @ 
        <a 
          className={styles.Link} 
          href='https://devchallenges.io/challenges/Bu3G2irnaXmfwQ8sZkw8' 
          target='_blank' 
          rel='noreferrer'
        >Devchallenges.io</a> 
      </p>
    </footer>
  );
}

export default Footer;
