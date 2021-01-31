import React, { useContext } from 'react';

import styles from './ModalHeader.module.css';
import modalContext from '../../../../context/modal-context';

const ModalHeader = ({ children }) => {
  const { onModalClose } = useContext(modalContext);

  return (
    <header className="modal-header">
      { children }
      <button className={styles.CloseBtn} title="close modal" onClick={onModalClose}></button>
    </header>
  );
}

export default ModalHeader;
