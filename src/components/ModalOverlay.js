import React from 'react';
import styles from './modal.module.css';

function ModalOverlay (props) {
    return (
        <div className={styles.modal_overlay}>
            {props.children}
        </div>
    )
}

export default ModalOverlay;
