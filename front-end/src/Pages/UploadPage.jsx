import React, { useState } from "react";
import  '../Styles/Upload.css';
import Step from "../Components/RecipeStep";
import StepsList from "../Components/StepsList";
import Ingredient from "../Components/Ingredient";
import IngredientTable from "../Components/IngredientTable";

export default function UploadPage() {
    // Recipe Ingredient
    const [ingredients, setIngredients] = useState([]);
    const handleAddIngredient = (ingredient) => {
        setIngredients((prev) => [...prev, ingredient]);
    };
    const handleDeleteIngredient = (index) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    };

    // Recipe Title
    const [recipeTitle, setRecipeTitle] = useState("");
    const handleRecipeTitleChange = (event) => {
        setRecipeTitle(event.target.value);
    };

    // Recipe Coverimage
    const [coverImage, setCoverImage] = useState(null);
    const handleCoverImageChange = (event) => {
        setCoverImage(event.target.files[0]);
    };

    // Recipe Steps
    const [newStep, setNewStep] = useState({});
    // In an input field’s change event, event.target would be the input field that the user is typing into. 
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setNewStep((prev) => ({ ...prev, id: Date.now(), [name]: value }));
    };

    // Recipe Steps image
    const [image, setImage] = useState(null);
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    // Recipe all steps
    const [allSteps, setAllSteps] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newStep.title) return;
        setAllSteps((prev) => [...prev, { ...newStep, image }]);
        setNewStep({});
        setImage(null);
    };
    const handleDelete = (stepIdToRemove) => {
        setAllSteps((prev) => prev.filter(
            (step) => step.id !== stepIdToRemove
        ));
    };

    // Recipe tags
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState(""); // New state for the input field
    const handleAddTag = () => {
        if (tag.trim() !== "") {
        setTags((prev) => [...prev, tag.trim()]);
        setTag(""); // Clear the input field after adding the tag
        }
    };
    const handleDeleteTag = (index) => {
        setTags((prev) => prev.filter((_, i) => i !== index));
    };

// Recipe Submit to database
const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('recipeTitle', recipeTitle);
    formData.append('coverImage', coverImage);
  
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}].name`, ingredient.name);
      formData.append(`ingredients[${index}].quantity`, ingredient.quantity);
    });
  
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
  
    allSteps.forEach((step, index) => {
      formData.append(`allSteps[${index}].title`, step.title);
      formData.append(`allSteps[${index}].description`, step.description);
      formData.append(`allSteps[${index}].image`, step.image);
    });
  
    const response = await fetch('http://localhost:3001/api/recipes', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json'
        }
    });
  
    const data = await response.json();
    console.log(data);
    
    // Reset the form after submission
    if (data) {
        setRecipeTitle('');
        setCoverImage(null);
        setIngredients([]);
        setTags([]);
        setAllSteps([]);
    }

  };

    return (
        <main className="upload-page">
        <h1>Recipe Upload</h1>

        
        
        <label htmlFor="recipeTitle">Recipe Title:</label>
        <input
            type="text"
            id="recipeTitle"
            placeholder="Enter Recipe Title"
            value={recipeTitle}
            onChange={handleRecipeTitleChange}
        />
        <br></br>

        <label htmlFor="coverImage">Cover Image:</label>
        <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleCoverImageChange}
        />
        {coverImage && (
            <div className="coverImageContainer">
            <img src={URL.createObjectURL(coverImage)} alt="Cover" className="coverImage" />
            </div>
        )}
        <br></br>

        <Ingredient addIngredient={handleAddIngredient} />
        <IngredientTable ingredients={ingredients} deleteIngredient={handleDeleteIngredient}/>
        <br></br>

        <h2>Tags</h2>
        <div>
            <input
            type="text"
            placeholder="Enter Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            />
            <button onClick={handleAddTag}>Add Tag</button>
        </div>
        {tags.length > 0 && (
            <div>
            <ul id="tags">
                {tags.map((tag, index) => (
                <li key={index}>
                    <div className="tag-container">
                        {tag}
                        <button onClick={() => handleDeleteTag(index)}>Remove</button>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        )}
        <br></br>

        <h1>Steps</h1>
        <Step
            newStep={newStep}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
        />
        <StepsList allSteps={allSteps} handleDelete={handleDelete} />
        <form onSubmit={handleFormSubmit}>
            <input type="submit"/>
        </form>
        </main>
    );
}
