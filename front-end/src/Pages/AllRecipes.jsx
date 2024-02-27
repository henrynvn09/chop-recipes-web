import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AllRecipes.css";

import React from "react";

import RecipePreviewBox from "../Components/RecipePreviewBox";

function AllRecipes() {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex-1 bg-gray-100"></div>
      <div className="flex-4 flex flex-col min-w-max">
        <h1 className="text-2xl font-bold">All Recipes</h1>
        <RecipePreviewBox
          image="https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg"
          title="Beef and Mustard Pie"
        />
      </div>
      <div className="flex-1 bg-gray-100"></div>
    </div>
  );
}

export default AllRecipes;
