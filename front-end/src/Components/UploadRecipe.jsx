import React, { useState } from 'react';
import '../Styles/UploadRecipe.css';

const UploadRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [],
    instructions: [{ description: '', image: null }],
    tags: [],
  });

  const [newTag, setNewTag] = useState('');

  const handleAddInstruction = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [
        ...prevRecipe.instructions,
        { description: '', image: null },
      ],
    }));
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = [...recipe.instructions];
    updatedInstructions.splice(index, 1);
    setRecipe((prevRecipe) => ({ ...prevRecipe, instructions: updatedInstructions }));
  };

  const handleInstructionChange = (index, key, value) => {
    const updatedInstructions = [...recipe.instructions];
    updatedInstructions[index][key] = value;
    setRecipe((prevRecipe) => ({ ...prevRecipe, instructions: updatedInstructions }));
  };

  const handleTitleChange = (value) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, title: value }));
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: updatedIngredients }));
  };

  const handleAddIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ''],
    }));
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: updatedIngredients }));
  };

const handleImageChange = (index, file) => {
  if (file) {
    const updatedInstructions = [...recipe.instructions];
    const reader = new FileReader();

    reader.onload = (e) => {
      updatedInstructions[index].image = e.target.result;
      setRecipe((prevRecipe) => ({ ...prevRecipe, instructions: updatedInstructions }));
    };

    reader.readAsDataURL(file);
  } else {
    // Handle the case when no file is selected
    console.log('No file selected');
  }
};

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        tags: [...prevRecipe.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const handleDeleteTag = (index) => {
    const updatedTags = [...recipe.tags];
    updatedTags.splice(index, 1);
    setRecipe((prevRecipe) => ({ ...prevRecipe, tags: updatedTags }));
  };


  const handleSubmit = () => {
    // Handle submitting the recipe to the database
    console.log('Recipe submitted:', recipe);
  };

  return (
    <div className="center-page-upload">
      <div>
        <h2>Upload Recipe</h2>

        {/* Title input */}
        <div>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Recipe Title"
            value={recipe.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
        </div>

        {/* Ingredients section */}
        <div>
          <h3>Ingredients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Ingredient #${index + 1}`}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
              />
              <button onClick={() => handleDeleteIngredient(index)}>
                Delete Ingredient
              </button>
            </div>
          ))}
          <button onClick={handleAddIngredient}>Add Ingredient</button>
        </div>

        {/* Instructions section */}
        <div>
          <h3>Instructions</h3>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="instruction-container">
              <textarea
                placeholder={`Description #${index + 1}`}
                value={instruction.description}
                onChange={(e) => handleInstructionChange(index, 'description', e.target.value)}
              />
              <div>
              <label htmlFor="files" className="select-image-button">Select Images</label>
              <input
                
                id="files"
                style={{ visibility: 'hidden' }}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
              </div>
              <div>
                {instruction.image && <img src={instruction.image} alt={`Instruction ${index + 1}` } className ="upload-image" />}
              </div>
              <button onClick={() => handleDeleteInstruction(index)}>
                Delete Instruction
              </button>
            </div>
          ))}
          <button onClick={handleAddInstruction}>Add Instruction</button>
        </div>

        {/* Tags section */}
        <div className="tags-container">
          <h3>Tags</h3>
          <div className="tags">
            {recipe.tags.map((tag, index) => (
              <div key={index} className="tag-pill">
                {tag}
                <button onClick={() => handleDeleteTag(index)}>X</button>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button onClick={handleAddTag}>Add Tag</button>
        </div>

        {/* Submit button */}
        <button onClick={handleSubmit}>Submit Recipe</button>
      </div>
    </div>
  );
};

export default UploadRecipe;
