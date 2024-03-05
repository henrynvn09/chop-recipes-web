import React from "react";

import '../Styles/viewRecipe.css';  
import Navbar from "../Components/Navbar";


const fakeData = {
    title: "Cake",
    cover_image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    author_id: "141421421412",
    author_name: "Bruin Joe",
    author_image: "https://source.unsplash.com/150x150/?portrait?3",
    author_description: "I am a UCLA student and I am a fried chicken lover, I will teach you how make one!",

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
        image: "https://media.istockphoto.com/id/520916393/photo/washing-vegetables-under-running-water.jpg?s=2048x2048&w=is&k=20&c=DVb4-JfbSezRfL9pqLPnNwtNIIvZIOvC-CS7yTaU5nM=",
      },
      {
        title: "Step 2",
        text: "stir the flour...",
        image: "https://media.istockphoto.com/id/1698683047/photo/woman-kneading-dough-on-table-sprinkled-with-flour-close-up-of-home-baker-chef-is-making-with.jpg?s=2048x2048&w=is&k=20&c=Qm7dqg03gGxelvAkl8Y1qJ002RVJhwLnrje9Dr3mQ2c=",
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
      <div className="view-recipe-container">
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

        <div className="author-card">
          <div className="author-image-container">
            <img src={recipe.author_image} alt="" className="author-image" />
          </div>
          <div className="author-info">
            <h3 className="author-name">{recipe.author_name}</h3>
            <p className="author-descrip">{recipe.author_description}</p>
          </div>
        </div>
      </div>
    </>
    );
};

export default ViewRecipe;