import React from "react";

import '../Styles/viewRecipe.css';  
import Navbar from "../Components/Navbar";
import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";

const ViewRecipe = () => {
  // const recipe = fakeData; // Replace with actual fetched data
  let {recipe_id} = useParams();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [recipe, setRecipe] = useState( {
            title: "", // To be filled from fetched data
            cover_image: "", // To be filled from fetched data
            content_list: [], // Initialize as empty array
            tagName_lists: [], // Initialize as empty array
            ingredient_lists: [], // Initialize as empty array
            author_id: null, // Assuming userID is available in your scope
        }); // Initialize the recipe state to null

  const [author, setAuthor] = useState({
      name:"",
      email:"",
      password:"",
      Image:"",
      description:"",
      following: [],
    }); // Initialize the author state to null

useEffect(() => {
  const fetchRecipeAndAuthor = async () => {
    try {
      // Fetch the Recipe
      const recipeResponse = await fetch(`${BACKEND_URL}/api/recipe/${recipe_id}`);
      if (!recipeResponse.ok) throw new Error('Failed to fetch recipe');
      const recipeData = await recipeResponse.json();
      setRecipe(recipeData);
      console.log("Recipe fetched successfully, Recipe Data:", recipeData);

      // Proceed to fetch the Author if author_id is available
      if (recipeData.author_id) {
        console.log("Fetching author for ID:", recipeData.author_id);
        const authorResponse = await fetch(`${BACKEND_URL}/api/${recipeData.author_id}`); // Adjust the endpoint as needed
        if (!authorResponse.ok) throw new Error('Failed to fetch author');
        const authorData = await authorResponse.json();
        setAuthor(authorData[0]);
        console.log("Author data fetched:", authorData);
      }
    } catch (error) {
      console.error('Error during recipe or author fetch:', error);
    }
  };

  fetchRecipeAndAuthor();

    // Cleanup function
  return () => {
    setAuthor({
      name: "",
      email: "",
      Image: "",
      description: "",
      followings: [],
    }); // Reset author state to initial values
    console.log("Author state reset due to component unmount or re-render");
  };

}, [recipe_id, BACKEND_URL]); // Ensures this runs once upon initial render or if recipe_id/BACKEND_URL changes

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="view-recipe-container">

          <div className="pt-10 pb-10 rounded-[100rem]">
            <div className="view-recipe">
            <h1>{recipe.title}</h1>
            
            <div className="cover_imageContainer">
              <img src={recipe.cover_image} alt="Cover" className="cover_image" />
            </div>
            <br/>

            <h3>Tags</h3>
            <ul id="tags">
              {recipe.tagName_lists && recipe.tagName_lists.map((tag, index) => (
                <li key={index}>
                  <div>{tag}</div>
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
          </div>

        <div className="author-card">
          <div className="author-image-container">
            <Link to={`/user/${recipe.author_id}`}>
              <img src={author.Image} alt="Author" />
            </Link>
          </div>
          <div className="author-info">
            <Link to={`/user/${recipe.author_id}`}>
              <h3 className="author-name">{author.name}</h3>
            </Link>
            <p className="author-descrip">{author.description}</p>
          </div>
        </div>
      </div>
    </>
    );
};

export default ViewRecipe;