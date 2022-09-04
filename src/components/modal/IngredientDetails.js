import React from 'react';

function IngredientDetails ({ activeIngredient }) {
    return (
        <div>{activeIngredient.name}</div>
    )
}

export default IngredientDetails;
