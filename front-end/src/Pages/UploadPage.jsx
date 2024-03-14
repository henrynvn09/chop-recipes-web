import React, { useRef,useState } from "react";
import  '../Styles/Upload.css';
import Step from "../Components/RecipeStep";
import StepsList from "../Components/StepsList";
import Ingredient from "../Components/Ingredient";
import IngredientTable from "../Components/IngredientTable";
import Navbar from "../Components/Navbar";
import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";
import axios from 'axios';
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export default function UploadPage() {
    ProtectedRoute();
    const { userID } = useUser();
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
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

    const UploadCoverImage = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const uniqueFileName = `${Date.now()}-${selectedFile.name}`;
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(uniqueFileName);

            fileRef.put(selectedFile).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL); // URL of the uploaded file
                    setCoverImage(downloadURL); // Set state with the URL
                });
            });
        } else {
            console.log("No file selected");
        }
    };


    // Recipe Steps
    const [newStep, setNewStep] = useState({});
    // In an input field’s change event, event.target would be the input field that the user is typing into. 
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setNewStep((prev) => ({ ...prev, id: Date.now(), [name]: value }));
    };

    // Recipe Steps image
    const [imageUploaded, setImageUploaded] = useState(false);
    const [image, setImage] = useState(null);
    const UploadStepImage = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const uniqueFileName = `${Date.now()}-${selectedFile.name}`;
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(uniqueFileName);

            fileRef.put(selectedFile).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log(downloadURL); // URL of the uploaded file
                    setImage(downloadURL); // Set state with the URL
                    setImageUploaded(true); // Set imageUploaded to true
                });
            });
        } else {
            console.log("No file selected");
            setImageUploaded(false); // Set imageUploaded to false
        }
    };

    // Recipe all steps
    const [allSteps, setAllSteps] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newStep.title) return;
        setAllSteps((prev) => [...prev, { ...newStep, image }]);
        setNewStep({});
        setImage(null);
        setImageUploaded(false);
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
            setRecipeTitle('');
            setCoverImage(null);
            setIngredients([]);
            setTags([]);
            setAllSteps([]);
            console.log(responseJson);
        })
        .catch(err => console.log(err))
    };

    return (
        <>
            <Navbar />
            <main className="upload-page">

                <h1>Recipe Upload</h1>     
                <div className="recipe-title-label"><label htmlFor="recipeTitle">Recipe Title</label></div>
                <input
                    type="text"
                    id="recipeTitle"
                    placeholder="Enter Recipe Title"
                    value={recipeTitle}
                    onChange={handleRecipeTitleChange}
                    required
                />
                <br></br>
                <div className ="newline">
                    <label  htmlFor="coverImage">Cover Image:</label>
                </div>
                <button className="button-upload" onClick={handleClick}>
                        Upload a file
                </button>
                <input
                        type="file"
                        onChange={UploadCoverImage}
                        ref={hiddenFileInput}
                        style={{display: 'none'}} // Make the file input element invisible
                    />
                {coverImage && <img src={coverImage} alt="Uploaded" />}
                

                <Ingredient addIngredient={handleAddIngredient} />
                <IngredientTable ingredients={ingredients} deleteIngredient={handleDeleteIngredient}/>
                

                <h2>Tags</h2>
                <div>
                    <input
                    type="text"
                    placeholder="Enter Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value.toLowerCase())}
                    />
                    <button onClick={handleAddTag}>Add Tag</button>
                </div>

                {(tags != null && tags.length > 0) && (
                    <div>
                    <ul id="tags">
                        {tags.map((tag, index) => (
                        <li key={index}>
                            <div className="tag-container">
                                {tag}
                                <button className="tag-button" onClick={() => handleDeleteTag(index)}>Remove</button>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}
                

                <h2>Steps</h2>
                <Step
                    newStep={newStep}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleImageChange={UploadStepImage}
                    imageUploaded={imageUploaded}
                />

                <StepsList allSteps={allSteps} handleDelete={handleDelete} />

                <form onSubmit={handleFormSubmit} className="submit-form">
                    <input type="submit" id="submitButton"/>
                </form>
            </main>
        </>
    );
}
