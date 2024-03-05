import React from "react";

import '../Styles/viewRecipe.css';  
import Navbar from "../Components/Navbar";


const fakeData = {
    title: "Cake",
    cover_image: "https://unsplash.com/photos/a-woman-working-on-a-laptop-6uAssP0vuPs",
    author_id: "141421421412",
    ingredient_lists: [
      { name: "Flour", quantity: "100g" },
      { name: "Water", quantity: "200g" },
      // Add more ingredient_lists as needed
    ],
    tags: ["easy to make", "within 10 miniutes", "delicious"],
    content_list: [
      {
        title: "Step 1",
        text: "Put water in flour",
        image: "https://unsplash.com/photos/a-computer-screen-with-a-remote-control-on-it-s5kTY-Ve1c0",
      },
      {
        title: "Step 2",
        text: "stir the flour...",
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
    <>
    <Navbar />
        <div className="view-recipe">
          <h1>{recipe.title}</h1>
          
          <div className="cover_imageContainer">
            <img src={recipe.cover_image} alt="Cover" className="cover_image" />
          </div>
          <br/>

          <h3>Tags</h3>
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

          <h2>Ingredients</h2>
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {recipe.ingredient_lists.map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>

          <h2>Steps</h2>
          <ul>
            {recipe.content_list.map((step, index) => (
              <li key={index}>
                <div className="step-container">
                  <h3>{step.title}</h3>
                  {step.text && <p>{step.text}</p>}
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
    </>
    );
};

export default ViewRecipe;