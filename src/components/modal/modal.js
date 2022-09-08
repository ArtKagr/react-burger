import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import PortalReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

function Modal ({ children, closePopup }) {

  React.useEffect(() => {
    function keyDownFn (e) {
      if (e.key === 'Escape') {
        closePopup();
      }
    }
    document.addEventListener('keydown', keyDownFn)

    return () => document.removeEventListener('keydown', keyDownFn)
  }, [])

  return PortalReactDOM.createPortal(
    <ModalOverlay className={styles.modal_overlay} closePopup={closePopup}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_close} onClick={() => closePopup()}>
           <CloseIcon type={'primary'} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closePopup: PropTypes.func.isRequired
};

export default Modal;
