import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-ingredients.module.css'

function BurgerIngredients ({ ingredients, activeTab, setActiveTab, setModalVisible, setModalSource, setActiveIngredient }) {
    const [tabs, setTabs] = React.useState([
        { id: 0, name: 'Булки', type: 'bun', items: [] },
        { id: 1, name: 'Соусы', type: 'sauce', items: [] },
        { id: 2, name: 'Начинки', type: 'main', items: [] }
    ])

    React.useEffect(() => {
        setTabs((items) => {
            const result = items.map(tab => {
                tab.items = []
                return tab
            })
            ingredients.forEach((ingredient) => {
                result.map((tab) => {
                    if (ingredient.type === tab.type) {
                        tab.items.push(ingredient)
                    }
                    return tab
                })
            })
            return result
        })
    }, [JSON.stringify(ingredients)])

    const updateStates = (flag, ingredient) => {
        setModalVisible(flag);
        setModalSource('ingredient');
        setActiveIngredient(ingredient);
    }

    return (
        <div className={styles.burger_ingredients}>
            <span>Соберите бургер</span>
            <div className={styles.tabs}>{
                tabs.map((tab) => (
                    <Tab key={tab.id} active={tab.id === activeTab.id} value={''} onClick={() => setActiveTab(tab)}>
                        {tab.name}
                    </Tab>
                ))
            }</div>
            <div className={styles.ingredients}>
                {tabs.map((tab) => (
                    <>
                        <span key={`name-${tab.id}`}>{tab.name}</span>
                        <div key={`category-${tab.id}`} className={styles.ingredients_category}>
                            {tab.items.map((ingredient) => (
                                <div key={ingredient._id} className={styles.ingredient} onClick={() => updateStates(true, ingredient)}>
                                    <Counter className={styles.ingredient_counter} count={1} />
                                    <img src={ingredient.image} alt={`ingredient_${ingredient._id}`} />
                                    <div>
                                        <span>{ingredient.price}</span>
                                        <CurrencyIcon key={`currency-icon-${ingredient._id}`} type={'primary'} />
                                    </div>
                                    <span>{ingredient.name}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default BurgerIngredients;
