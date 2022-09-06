import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './burger-constructor.module.css'
import { IngredientType } from "../proptypes/proptypes";

function BurgerConstructor ({ ingredients, setModalVisible, setModalSource, order }) {

    const currentOrder = React.useMemo(() => {
        let result = {bun: {}, array: []}
        if (order && order.length && ingredients && ingredients.length) {
            result = order.map(ingredientId => {
                return ingredients.find(ingredient => {
                        return ingredient._id === ingredientId
                    }
                )
            })
            result = result.reduce((acc, ingredient, index) => {
                if (ingredient.type === 'bun') {
                    acc.bun = ingredient
                } else {
                    acc.array.push(ingredient)
                }
                return acc
            }, {bun: {}, array: []})
        }
        return result
    }, [JSON.stringify(order), JSON.stringify(ingredients)])

    const totalPrice = React.useMemo(() => {
        return currentOrder.array.reduce((acc, ingredient) => {
            return ingredient && ingredient.price ? acc + ingredient.price : acc + 0
        }, 0) + (currentOrder.bun.price * 2)
    }, [currentOrder.bun, currentOrder.array])

    const toggleModalVisible = flag => {
        setModalVisible(flag);
        setModalSource('order');
    }

    return (
        <div className={styles.burger_constructor}>
            <div className={styles.burger_constructor_items}>
                {currentOrder.bun && <div className={`${styles.burger_constructor_item} ${styles.burger_constructor_item_bun}`}>
                    <span className={styles.burger_constructor_drag_icon}>
                        <DragIcon type={'primary'} />
                    </span>
                    <ConstructorElement
                        text={currentOrder.bun.name}
                        thumbnail={currentOrder.bun.image}
                        price={currentOrder.bun.price}
                        isLocked={true}
                        type={'top'}
                    />
                </div>}
                <div className={styles.burger_constructor_items_container}>
                    {currentOrder.array.map((item, index) => (
                        item && item._id &&
                        <div className={styles.burger_constructor_item}>
                            <span className={styles.burger_constructor_drag_icon}>
                                <DragIcon type={'primary'} />
                            </span>
                            <ConstructorElement
                                text={item.name}
                                thumbnail={item.image}
                                price={item.price}
                            />
                        </div>))
                    }
                </div>
                {currentOrder.bun && <div className={`${styles.burger_constructor_item} ${styles.burger_constructor_item_bun}`}>
                    <span className={styles.burger_constructor_drag_icon}>
                        <DragIcon type={'primary'} />
                    </span>
                    <ConstructorElement
                        text={currentOrder.bun.name}
                        thumbnail={currentOrder.bun.image}
                        price={currentOrder.bun.price}
                        isLocked={true}
                        type={'bottom'}
                    />
                </div>}
            </div>
            <div className={styles.burger_constructor_container}>
                <div className={styles.burger_constructor_container_price}>
                    <span>{totalPrice}</span>
                    <CurrencyIcon type={'primary'} />
                </div>
                <Button name={'Оформить заказ'} onClick={() => toggleModalVisible(true)}>Оформить заказ</Button>
            </div>
        </div>
        )
}

BurgerConstructor.propTypes = {
   ingredients: PropTypes.arrayOf(IngredientType.isRequired).isRequired,
   setModalVisible: PropTypes.func.isRequired,
   setModalSource: PropTypes.func.isRequired,
   order: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default BurgerConstructor;
