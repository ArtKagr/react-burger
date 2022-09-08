import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './burger-constructor.module.css';
import { IngredientType } from "../../proptypes/proptypes";

function BurgerConstructor ({ ingredients, order, setModalVisible, setModalSource }) {
  const currentOrder = React.useMemo(() => {
    let result = { bun: {}, array: [] };
    if (order && order.length && ingredients && ingredients.length) {
      result = order.map(ingredientId => {
        return ingredients.find(ingredient => {
          return ingredient._id === ingredientId
        })
      })
      result = result.reduce((acc, ingredient, index) => {
        ingredient.type === 'bun' ? acc.bun = ingredient : acc.array.push(ingredient)
        return acc
      }, { bun: {}, array: [] })
    }
    return result
  }, [JSON.stringify(order), JSON.stringify(ingredients)]);

  const totalPrice = React.useMemo(() => {
    if (currentOrder && currentOrder.array && currentOrder.array.length) {
      return currentOrder.array.reduce((acc, ingredient) => {
        return ingredient && ingredient.price ? acc + ingredient.price : acc + 0
      }, 0) + (currentOrder.bun.price * 2)
    } else {
      return 0
    }
  }, [currentOrder.bun, currentOrder.array]);

  const toggleModalVisible = flag => {
    setModalVisible(flag);
    setModalSource('order');
  };

  return (
    <section className={styles.burger_constructor}>
      <li className={styles.burger_constructor_items}>
        {currentOrder.bun && <div className={`${styles.burger_constructor_item} ${styles.burger_constructor_item_bun}`}>
          <i className={styles.burger_constructor_drag_icon} />
          <ConstructorElement
            text={`${currentOrder.bun.name} (верх)`}
            thumbnail={currentOrder.bun.image}
            price={currentOrder.bun.price}
            isLocked={true}
            type={'top'}
          />
        </div>}
        <article className={styles.burger_constructor_items_container}>
          {currentOrder.array.map((item, index) => (
            item && item._id &&
            <div key={`constructor_element_${item._id}_${index}`} className={styles.burger_constructor_item}>
              <i className={styles.burger_constructor_drag_icon}>
                <DragIcon type={'primary'} />
              </i>
              <ConstructorElement
                text={item.name}
                thumbnail={item.image}
                price={item.price}
              />
            </div>))
          }
        </article>
        {currentOrder.bun && <div className={`${styles.burger_constructor_item} ${styles.burger_constructor_item_bun}`}>
          <i className={styles.burger_constructor_drag_icon} />
          <ConstructorElement
            text={`${currentOrder.bun.name} (низ)`}
            thumbnail={currentOrder.bun.image}
            price={currentOrder.bun.price}
            isLocked={true}
            type={'bottom'}
          />
        </div>}
      </li>
      <div className={styles.burger_constructor_container}>
        <article className={styles.burger_constructor_container_price}>
          <span>{totalPrice}</span>
          <CurrencyIcon type={'primary'} />
        </article>
        <Button name={'Оформить заказ'} onClick={() => toggleModalVisible(true)}>Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
  order: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setModalSource: PropTypes.func.isRequired
};

export default BurgerConstructor;
