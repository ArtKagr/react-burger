import React from 'react';
import PropTypes from "prop-types";
import styles from './model-overlay.module.css';

function ModalOverlay ({ children, closePopup }) {

  return (
    <div className={styles.modal_overlay} onClick={() => closePopup()}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closePopup: PropTypes.func.isRequired
};

export default ModalOverlay;
