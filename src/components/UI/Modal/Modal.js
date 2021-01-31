import React, { useEffect, createRef } from 'react';
import createPortal from 'ReactDOM';

import styles from './Modal.module.css';
import modalContext from '../../../context/modal-context';

const Modal = ({ children, onModalClose }) => {
  // Accesibility for the modal - Credit to: https://tinloof.com/blog/how-to-create-an-accessible-react-modal/

   // Managing keyboard interaction
  const modalRef = createRef();
  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };
  // map of keyboard listeners
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey]]
  );

  useEffect(() => {
    const keyListener = (e) => {
      const listener = keyListenersMap.get(e.keyCode);

      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    // clean up the event listener
    return () => document.removeEventListener("keydown", keyListener);
  }, [keyListenersMap]);

  return createPortal(
    <div className={styles.Backdrop} role="dialog" aria-modal="true">
      <section className={styles.Modal} ref={modalRef}>
        <modalContext.Provider value={{ onModalClose }}>
          {children}
        </modalContext.Provider>
      </section>
    </div>,
    document.body
  );
};

export default Modal;
