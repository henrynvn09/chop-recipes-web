import axios from "axios";
import { useState, useEffect } from "react";
import "../Styles/LibraryRecipes.css";
import { useLocation } from "react-router-dom";

import React from "react";

import RecipePreviewBox from "../Components/RecipePreviewBox";
import ProtectedRoute from "../Components/ProtectedRoute";

import Navbar from "../Components/Navbar";

import Sidebar from "../Components/Sidebar";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function LibraryRecipes() {
  ProtectedRoute();
  console.log("backend url = " + BACKEND_URL);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const location = useLocation(); // Create a location object
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search'); // Get the search query from the URL

  // fetch the recipe from backend
  useEffect(() => {
    setSearchTerm(searchQuery || ''); // Set the search term to the search query or an empty string if the search query is null
    fetchRecipes();
  }, [searchQuery]); // Add searchQuery as a dependency

  const fetchRecipes = async () => {
    try {
      console.log("backend url = " + BACKEND_URL);
      const response = await axios.get(BACKEND_URL + "/api/recipe/all_recipes");
      console.log("Recipes fetched:", response.data);

      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // fetch the author name from backend
  const fetchAuthorName = async (recipeId) => {
    try {
      const recipeResponse = await fetch(`${BACKEND_URL}/api/recipe/${recipeId}`);
      if (!recipeResponse.ok) throw new Error('Failed to fetch recipe');
      const recipeData = await recipeResponse.json();
  
      if (recipeData.author_id) {
        const authorResponse = await fetch(`${BACKEND_URL}/api/${recipeData.author_id}`);
        if (!authorResponse.ok) throw new Error('Failed to fetch author');
        const authorData = await authorResponse.json();
        console.log("Author data fetched:", authorData);
        return authorData; 
      }
  
      return 'Unknown Author';
    } catch (error) {
      console.error('Error fetching author name:', error);
      return 'Unknown Author';
    }
  };

  // Handle typing in the search bar
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleIngredientSelection = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(
        selectedIngredients.filter((i) => i !== ingredient)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const filterRecipes = (recipe) => {
    // Filter by selected tags
    if (
      selectedTags.length > 0 &&
      !selectedTags.every((tag) => recipe.tagName_lists.includes(tag))
    ) {
      return false;
    }
    // Filter by selected ingredients
    if (
      selectedIngredients.length > 0 &&
      !selectedIngredients.every((ingredient) =>
        recipe.ingredient_lists.some((i) => i.name === ingredient)
      )
    ) {
      return false;
    }
    // Filter by search term
    if (
      searchTerm &&
      !recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  };

  const filteredRecipes = recipes.filter(filterRecipes);

  const recipePreviewBoxes = filteredRecipes.map((recipe, index) => (
    <RecipePreviewBox
      key={index}
      image={recipe.cover_image}
      title={recipe.title}
      id={recipe._id}
      author={recipe.author}
      fetchAuthorName={fetchAuthorName}
    />
  ));
  

  const tags_html = filteredRecipes
    .reduce((acc, curr) => [...acc, ...curr.tagName_lists], [])
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a.localeCompare(b))
    .map((tag, index) => (
      <div key={index} className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={selectedTags.includes(tag)}
          onChange={() => handleTagSelection(tag)}
          className="mr-2"
        />
        <label>{tag}</label>
      </div>
    ));

  const ingredients_html = filteredRecipes
    .reduce((acc, curr) => [...acc, ...curr.ingredient_lists], [])
    .map((i) => i.name)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => a.localeCompare(b))
    .map((ingredient, index) => (
      <div key={index} className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={selectedIngredients.includes(ingredient)}
          onChange={() => handleIngredientSelection(ingredient)}
          className="mr-2"
        />
        <label>{ingredient}</label>
      </div>
    ));

  return (
    <div className="bg-custom-grey">
    <Navbar />
      <div className="flex flex-row">
        <Sidebar tags={tags_html} ingredients={ingredients_html} />
        <div className="flex flex-col w-[100%] flex-5 py-5 items-center pr-10">
          <h1 className="text-4xl font-bold flex-row pb-6 ">All Recipes</h1>     
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title"
            className="border border-gray-300 rounded px-2 py-1 mb-4 pr-24 w-4/5 "
          />
          {/* Recipe preview boxes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 4xl:grid-cols-8 gap-4">
            {recipePreviewBoxes}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryRecipes;
