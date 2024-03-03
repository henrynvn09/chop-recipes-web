import React from "react";
import '../Styles/viewRecipe.css';  

const fakeData = {
    recipeTitle: "Cake",
    coverImage: "https://unsplash.com/photos/a-woman-working-on-a-laptop-6uAssP0vuPs",
    
    ingredients: [
      { name: "Flour", quantity: "100g" },
      { name: "Water", quantity: "200g" },
      // Add more ingredients as needed
    ],
    tags: ["easy to make", "within 10 miniutes", "delicious"],
    allSteps: [
      {
        title: "Step 1",
        description: "Put water in flour",
        image: "https://unsplash.com/photos/a-computer-screen-with-a-remote-control-on-it-s5kTY-Ve1c0",
      },
      {
        title: "Step 2",
        description: "stir the flour...",
        image: "https://unsplash.com/photos/a-group-of-white-and-gold-tiles-on-a-white-surface-nPZ68nehUUo",
      },
      // Add more steps as needed
    ],

  }

const ViewRecipe = () => {
  const recipe = fakeData; // Replace with actual fetched data

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-recipe">
      <h1>{recipe.recipeTitle}</h1>
      
      <div className="coverImageContainer">
        <img src={recipe.coverImage} alt="Cover" className="coverImage" />
      </div>
      <br/>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name}: {ingredient.quantity}</li>
        ))}
      </ul>
      <br/>

      <h2>Tags</h2>
      <ul id="tags">
        {recipe.tags.map((tag, index) => (
          <li key={index}>
            <div>
              {tag}
            </div>
          </li>
        ))}
      </ul>
      <br/>

      <h2>Steps</h2>
      <ul>
        {recipe.allSteps.map((step, index) => (
          <li key={index}>
            <div className="step-container">
              <h3>{step.title}</h3>
              {step.description && <p>{step.description}</p>}
              {step.image && (
                <div className="stepImageContainer">
                  <img src={step.image} alt={step.title} className="stepImage" />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewRecipe;