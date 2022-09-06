import React from 'react';
import { IngredientType } from '../../proptypes/proptypes';
import styles from '../../styles/modal.module.css';

function IngredientDetails ({ activeIngredient }) {
    return (
        <div className={styles.modal_component}>
            <span className={styles.modal_ingredient_title}>Детали ингредиента</span>
            <img src={activeIngredient.image} alt={`ingredient_${activeIngredient._id}`} />
            <span className={styles.modal_ingredient_name}>{activeIngredient.name}</span>
            <div className={styles.modal_ingredient_container}>
                <div className={styles.modal_ingredient_item}>
                    <span>Калории, ккал</span>
                    <span>{activeIngredient.calories}</span>
                </div>
                <div className={styles.modal_ingredient_item}>
                    <span>Белки, г</span>
                    <span>{activeIngredient.proteins}</span>
                </div>
                <div className={styles.modal_ingredient_item}>
                    <span>Жиры, г</span>
                    <span>{activeIngredient.fat}</span>
                </div>
                <div className={styles.modal_ingredient_item}>
                    <span>Углеводы, г</span>
                    <span>{activeIngredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    activeIngredient: IngredientType.isRequired
};

export default IngredientDetails;
