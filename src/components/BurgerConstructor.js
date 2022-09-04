import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-constructor.module.css'

function BurgerConstructor ({ ingredients, setModalVisible, setModalSource }) {
    const [order, setOrder] = React.useState([
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733d1",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733c6"
    ])

    const currentOrder = React.useMemo(() => {
        let result = {first: {}, array: [], second: {}}
        if (order && order.length && ingredients && ingredients.length) {
            result = order.map(ingredientId => {
                return ingredients.find(ingredient => {
                        return ingredient._id === ingredientId
                    }
                )
            })
            result = result.reduce((acc, ingredient, index) => {
                if (ingredient.type === 'bun' && index === 0) {
                    acc.first = ingredient
                } else if (ingredient.type === 'bun') {
                    acc.second = ingredient
                } else {
                    acc.array.push(ingredient)
                }
                return acc
            }, {first: {}, array: [], second: {}})
        }
        return result
    }, [JSON.stringify(order), JSON.stringify(ingredients)])

    // const totalPrice = React.useMemo(() => {
    //     return currentOrder.reduce((acc, ingredient) => {
    //         if (ingredient && ingredient.price) {
    //             return acc + ingredient.price
    //         } else {
    //             return acc + 0
    //         }
    //     }, 0)
    // }, [currentOrder])

    const toggleModalVisible = flag => {
        setModalVisible(flag);
        setModalSource('order');
    }

    return (
        <div className={styles.burger_constructor}>
            <div className={styles.burger_constructor_items}>
                {currentOrder.first && <div className={`${styles.burger_constructor_item} ${styles.burger_constructor_item_bun}`}>
                    <DragIcon type={'primary'} />
                    <ConstructorElement
                        text={currentOrder.first.name}
                        thumbnail={currentOrder.first.image}
                        price={currentOrder.first.price}
                        isLocked={true}
                        type={'top'}
                    />
                </div>}
                <div className={styles.burger_constructor_items_container}>
                    {currentOrder.array.map((item, index) => (
                        item && item._id &&
                        <div className={styles.burger_constructor_item}>
                            <DragIcon type={'primary'} />
                            <ConstructorElement
                                text={item.name}
                                thumbnail={item.image}
                                price={item.price}
                            />
                        </div>))
                    }
                </div>
                {currentOrder.second && <div className={`${styles.burger_constructor_item} ${styles.burger_constructor_item_bun}`}>
                    <DragIcon type={'primary'} />
                    <ConstructorElement
                        text={currentOrder.second.name}
                        thumbnail={currentOrder.second.image}
                        price={currentOrder.second.price}
                        isLocked={true}
                        type={'bottom'}
                    />
                </div>}
            </div>
            <div className={styles.burger_constructor_container}>
                <div className={styles.burger_constructor_container_price}>
                    <span>{0}</span>
                    <CurrencyIcon type={'primary'} />
                </div>
                <Button name={'Оформить заказ'} onClick={() => toggleModalVisible(true)}>Оформить заказ</Button>
            </div>
        </div>
        )
}

export default BurgerConstructor;
