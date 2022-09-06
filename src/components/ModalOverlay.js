import React from 'react';
import PropTypes from "prop-types";
import styles from '../styles/modal.module.css';

function ModalOverlay ({ children, setModalVisible }) {

    const toggleModalVisible = (e, flag) => {
        setModalVisible(flag);
    }

    return (
        <div className={styles.modal_overlay} onClick={(e) => toggleModalVisible(e, false)}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired
};

export default ModalOverlay;
