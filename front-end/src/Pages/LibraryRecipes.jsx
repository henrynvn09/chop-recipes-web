import axios from "axios";
import { useState, useEffect } from "react";
import "../Styles/LibraryRecipes.css";

import React from "react";

import RecipePreviewBox from "../Components/RecipePreviewBox";
import ProtectedRoute from "../Components/ProtectedRoute";

import Navbar from "../Components/Navbar";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function LibraryRecipes() {
  ProtectedRoute();
  console.log("backend url = " + BACKEND_URL);
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // fetch the recipe from backend
  useEffect(() => {
    fetchRecipes();
  }, []);

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
    <div>
      <Navbar />
      <div className="flex flex-row">
        <div className="h-screen sticky mt-16 top-0 bg-gray-10">
          {/* Left sidebar content */}
          <div className="h-[32%] mb-12">
            <h2 className="text-lg font-bold mb-2 p-5 pb-0">Filter by Tags</h2>
            {/* Render tags dynamically */}
            <div className="h-full overflow-y-scroll p-5 pt-0">{tags_html}</div>
          </div>
          <div className="h-[32%]">
            <h2 className="text-lg font-bold mb-2  p-5 pb-0">
              Filter by Ingredients
            </h2>
            {/* Render ingredients dynamically */}
            <div className="h-full overflow-y-scroll  p-5 pt-0">
              {ingredients_html}
            </div>
          </div>
        </div>
        <div className="flex-4 flex flex-col w-[80%] py-5">
          <h1 className="text-2xl font-bold flex-row pb-6">All Recipes</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by title"
            className="border border-gray-300 rounded px-2 py-1 mb-4 pr-24"
          />
          {/* Recipe preview boxes */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {recipePreviewBoxes}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryRecipes;
