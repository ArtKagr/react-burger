import React from 'react';
import styles from './order-details.module.css';
import { orderDetails } from "../../../../utils/data";
import CheckIcon from '../../../../images/check-icon.svg';

function OrderDetails () {
  return (
    <div className={styles.modal_order_component}>
      <span className={styles.modal_order_number}>{orderDetails.orderNumber}</span>
      <span className={styles.modal_order_title}>идентификатор заказа</span>
      {orderDetails.status === 'success' &&
        <>
          <i className={styles.modal_order_icon}>
            <img src={CheckIcon} alt="check-icon" />
          </i>
          <span className={styles.modal_order_text}>Ваш заказ начали готовить</span>
          <span className={styles.modal_order_text_primary}>Дождитесь готовности на орбитальной станции</span>
        </>
      }
    </div>
  )
}

export default OrderDetails;
