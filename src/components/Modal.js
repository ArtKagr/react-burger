import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientType } from "../proptypes/proptypes";
import React from 'react';
import PortalReactDOM from 'react-dom';
// createPortal как метод ReactDom из библиотеки 'react-dom/client' не определяется
import ModalOverlay from "./ModalOverlay";
import styles from '../styles/modal.module.css';

const modalRoot = document.getElementById("react-modals");

function Modal ({ children, setModalVisible }) {

    const toggleModalVisible = (flag) => {
        setModalVisible(flag);
    }

    return PortalReactDOM.createPortal(
        <ModalOverlay className={styles.modal_overlay} setModalVisible={setModalVisible}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal_close} onClick={() => toggleModalVisible(false)}>
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
    setModalVisible: PropTypes.func.isRequired
};

export default Modal;
