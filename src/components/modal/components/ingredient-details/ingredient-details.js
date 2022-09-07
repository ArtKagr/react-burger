import React from 'react';
import { IngredientType } from '../../../../proptypes/proptypes';
import styles from './ingredient-details.module.css';

function IngredientDetails ({ activeIngredient }) {
  return (
    <div className={styles.modal_ingredient_component}>
      <span className={styles.modal_ingredient_title}>Детали ингредиента</span>
      <img src={activeIngredient.image} alt={`ingredient_${activeIngredient._id}`} />
      <span className={styles.modal_ingredient_name}>{activeIngredient.name}</span>
      <ul className={styles.modal_ingredient_container}>
        <li className={styles.modal_ingredient_item}>
          <span>Калории, ккал</span>
          <span>{activeIngredient.calories}</span>
        </li>
        <li className={styles.modal_ingredient_item}>
          <span>Белки, г</span>
          <span>{activeIngredient.proteins}</span>
        </li>
        <li className={styles.modal_ingredient_item}>
          <span>Жиры, г</span>
          <span>{activeIngredient.fat}</span>
        </li>
        <li className={styles.modal_ingredient_item}>
          <span>Углеводы, г</span>
          <span>{activeIngredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  activeIngredient: IngredientType.isRequired
};

export default IngredientDetails;
