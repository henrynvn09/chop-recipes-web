import React, { useState } from "react";

export default function Ingredient({ addIngredient }) {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");

  const handleAddIngredient = () => {
    if (ingredientName && ingredientQuantity) {
      addIngredient({ name: ingredientName, quantity: ingredientQuantity });
      setIngredientName("");
      setIngredientQuantity("");
    }
  };

  return (
    <div>
      <h2>Add Ingredient</h2>
      <input
        type="text"
        placeholder="Ingredient"
        value={ingredientName}
        onChange={(e) => setIngredientName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Quantity"
        value={ingredientQuantity}
        onChange={(e) => setIngredientQuantity(e.target.value)}
      />
      <button onClick={handleAddIngredient}>Add</button>
    </div>
  );
}
