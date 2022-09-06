import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { IngredientType, TabType } from "../proptypes/proptypes";
import PropTypes from "prop-types";
import styles from '../styles/burger-ingredients.module.css'

function BurgerIngredients ({ ingredients, order, activeTab, setActiveTab, setModalVisible, setModalSource, setActiveIngredient }) {
  const [tabs, setTabs] = React.useState([
    { id: 0, name: 'Булки', type: 'bun', items: [] },
    { id: 1, name: 'Соусы', type: 'sauce', items: [] },
    { id: 2, name: 'Начинки', type: 'main', items: [] }
  ]);

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
  }, [JSON.stringify(ingredients)]);

  const updateStates = (flag, ingredient) => {
    setModalVisible(flag);
    setModalSource('ingredient');
    setActiveIngredient(ingredient);
  };

  const currentIngredientCount = ingredientId => {
    return order.reduce((acc, id) => {
      return id === ingredientId ? acc + 1 : acc
    }, 0)
  };

  return (
    <main className={styles.burger_ingredients}>
      <h1 className={styles.burger_ingredients_title}>Соберите бургер</h1>
      <ul className={styles.tabs}>{
        tabs.map((tab) => (
          <Tab key={tab.id} active={tab.id === activeTab.id} value={''} onClick={() => setActiveTab(tab)}>
            {tab.name}
          </Tab>
        ))
      }</ul>
      <ul className={styles.ingredients}>
        {tabs.map((tab) => (
          <>
            <h2 className={styles.ingredients_category_title} key={`name-${tab.id}`}>{tab.name}</h2>
            <li key={`category-${tab.id}`} className={styles.ingredients_category}>
              {tab.items.map((ingredient) => (
              <div className={styles.ingredient} onClick={() => updateStates(true, ingredient)}>
                {order.includes(ingredient._id) &&
                    <Counter className={styles.ingredient_counter} count={currentIngredientCount(ingredient._id)} />
                }
                <img src={ingredient.image} alt={`ingredient_${ingredient._id}`} />
                <div className={styles.ingredient_container}>
                  <span className={styles.ingredient_container_number}>{ingredient.price}</span>
                  <CurrencyIcon key={`currency-icon-${ingredient._id}`} type={'primary'} />
                </div>
                <span>{ingredient.name}</span>
              </div>))}
            </li>
          </>
        ))}
      </ul>
    </main>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType).isRequired,
  order: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  activeTab: TabType.isRequired,
  setActiveTab: PropTypes.func,
  setModalVisible: PropTypes.func,
  setModalSource: PropTypes.func,
  setActiveIngredient: PropTypes.func
};

export default BurgerIngredients;
