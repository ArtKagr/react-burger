import React from 'react';
import styles from './modal.module.css';

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

export default ModalOverlay;
