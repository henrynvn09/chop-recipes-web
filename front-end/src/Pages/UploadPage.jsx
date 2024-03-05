import React, { useState } from "react";
import  '../Styles/Upload.css';
import Step from "../Components/RecipeStep";
import StepsList from "../Components/StepsList";
import Ingredient from "../Components/Ingredient";
import IngredientTable from "../Components/IngredientTable";
import Navbar from "../Components/Navbar";
import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";
import axios from 'axios';
export default function UploadPage() {
    ProtectedRoute();
    const { userID } = useUser();
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
    const handleCoverImageBase64 = (event) =>{
        console.log(event);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); // base64 encoded string
            setCoverImage(reader.result);
        };
        reader.onerror = (error) => { 
            console.log("Error: ", error);
        }
    }


    // Recipe Steps
    const [newStep, setNewStep] = useState({});
    // In an input field’s change event, event.target would be the input field that the user is typing into. 
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setNewStep((prev) => ({ ...prev, id: Date.now(), [name]: value }));
    };

    // Recipe Steps image
    const [image, setImage] = useState(null);
    const handleStepImageBase64 = (event) =>{
        console.log(event);
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); // base64 encoded string
            setImage(reader.result);
        };
        reader.onerror = (error) => { 
            console.log("Error: ", error);
        }
    }

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
        formData.append(`allSteps[${index}].text`, step.description);
        formData.append(`allSteps[${index}].image`, step.image);
        });
  
        const responseJson = {
            title: "", // To be filled from formData        
            cover_image: "", // To be filled from formData
            content_list: [], // To be filled from formData (allSteps)
            tagName_lists: [], // To be filled from formData (tags)
            ingredient_lists: [], // To be filled from formData (ingredients)
            author_id: userID // Assuming userID is available in your scope
        }; 
         console.log(responseJson);

        for (let [key, value] of formData.entries()) {
            if (key === 'recipeTitle') {
                responseJson.title = value;
            }
            else if (key === 'coverImage') {
                responseJson.cover_image = value;
            }
            else if (key.includes('allSteps')) {
                const stepIndex = key.match(/\d+/)[0];
                const stepKey = key.split('.')[1];
                if (!responseJson.content_list[stepIndex]) {
                    responseJson.content_list[stepIndex] = {};
                }
                responseJson.content_list[stepIndex][stepKey] = value;
            }
            else if (key.includes('tags')) {
                responseJson.tagName_lists.push(value);
            }
            else if (key.includes('ingredients')) {
                const ingredientIndex = key.match(/\d+/)[0];
                const ingredientKey = key.split('.')[1];
                if (!responseJson.ingredient_lists[ingredientIndex]) {
                    responseJson.ingredient_lists[ingredientIndex] = {};
                }
                responseJson.ingredient_lists[ingredientIndex][ingredientKey] = value;
            }
        }
        
        axios.post('http://localhost:5000/uploadRecipe', responseJson)
        .then(result => {
            console.log('Recipe added successfully')
            console.log(result)
        })
        .catch(err => console.log(err))

        // console.log(responseJson);





        // const response = await fetch('http://localhost:3000/api/recipes', {
        // method: 'POST',
        // body: formData,
        // headers: {
        //     'Content-Type': 'application/json'
        //     }
        // });
        
        // const data = await response.json();
        // console.log(data);
        
        // Reset the form after submission
        // if (data) {
        //     setRecipeTitle('');
        //     setCoverImage(null);
        //     setIngredients([]);
        //     setTags([]);
        //     setAllSteps([]);
        // }
    };

    return (
        <>
            <Navbar />
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
                    onChange={handleCoverImageBase64}
                />
                {coverImage === "" || coverImage === null ? "" : (
                    <div className="coverImageContainer">
                    <img src={coverImage} alt="Cover" className="coverImage" />
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
                    handleImageChange={handleStepImageBase64}
                />
                <StepsList allSteps={allSteps} handleDelete={handleDelete} />

                <form onSubmit={handleFormSubmit}>
                    <input type="submit"/>
                </form>
            </main>
        </>
    );
}
