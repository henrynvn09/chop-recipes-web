import React from "react";

export default function IngredientTable({ ingredients, deleteIngredient }) {
    if (ingredients.length === 0) {
        return null; // Don't render anything if there are no ingredients
      }
    return (
      <div>
        <h2>Ingredients</h2>
        <table className="ingredient-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient.name}</td>
                <td>{ingredient.quantity}</td>
                <td>
                  <button onClick={() => deleteIngredient(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
