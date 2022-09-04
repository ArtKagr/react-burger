import React from 'react';
import IngredientDetails from "./modal/IngredientDetails";
import OrderDetails from "./modal/OrderDetails";

import PortalReactDOM from 'react-dom';
// createPortal как метод ReactDom из библиотеки 'react-dom/client' не определяется

import ModalOverlay from "./ModalOverlay";
import styles from './modal.module.css';
const modalRoot = document.getElementById("react-modals");

function Modal ({ source, activeIngredient }) {
    return PortalReactDOM.createPortal(
        <ModalOverlay className={styles.modal_overlay}>
            <div className={styles.modal}>
                {source === 'ingredient' && <IngredientDetails activeIngredient={activeIngredient} />}
                {source === 'order' && <OrderDetails />}
            </div>
        </ModalOverlay>,
        modalRoot
    )
}

export default Modal;
