import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom'
import '../Styles/global.css'
import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";

import 'tailwindcss/tailwind.css';

import 'tailwindcss/tailwind.css';

import 'tailwindcss/tailwind.css';

function Welcome() {
  return (
      <div className="bg-red-200 rounded-full w-1/3 h-1/2 p-2 absolute left-0 top-20 box-border font-roboto flex flex-col items-center justify-center text-center">
          <h1 className="font-bold italic text-lg mb-2">Welcome</h1>
          <h1 className="font-bold italic text-lg mb-2">to</h1>
          <h1 className="font-bold italic text-lg mb-2">Chop!</h1>
          <p className="font-semibold italic text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut turpis velit. Integer nec facilisis velit. Fusce suscipit libero et odio facilisis, id fringilla nisi ultricies.
          </p>
      </div>
  );
}

function RecipeOfTheDay() {
  return (
      <div className="bg-red-200 rounded-full w-1/3 h-auto p-2 absolute left-0 top-2/3 box-border font-roboto flex flex-col items-center justify-center text-center">
          <h1 className="font-bold italic text-lg mb-2">Recipe Of The Day</h1>
      </div>
  );
}

function RandomRecipe() {
  return (
    <div style={{ border: "1px solid black", padding: "20px", margin: "20px" }}>
      <h1>Recipe of The Day</h1>
      <p>
        Here's a random recipe for you!
      </p>
    </div>
  )
}

function Library(){
  return (
    //TODO: CHANGE THIS LINK TO CORRECT PAGE
    <Link to="/user">
      <button className="chefButton">Browse our Library</button>
    </Link>
  )
}

function ChefProfile({value}) {
  return (
    <Link to="/user">
      <button className="chefButton">Chef's Profile</button>
    </Link>
  )
}

function AboutChop({value, onAboutChopClick}) {
  return (
    <Link to="/about">
      <button className="AboutChop">About our kitchen</button>
    </Link>
  )
}

function UploadRecipe({value}){
  return (
    <Link to="/upload-recipe">
      <button className="UploadRecipe">Upload New Recipe</button>
    </Link>
  )
}

function HomePage(){
    const {userID} = useUser(); 
    ProtectedRoute();
  function handleClick() {
    return;
  }
    return (
        <div>
            <Navbar />
            <div>
                <Welcome></Welcome>
                <RecipeOfTheDay></RecipeOfTheDay>
                <Library></Library>
                <RandomRecipe></RandomRecipe>
                <AboutChop value="about" className="About Chop" ></AboutChop>
                <ChefProfile value="Chef's Profile" onChefClick={() => handleClick()}></ChefProfile>
                <UploadRecipe value="Upload Recipe"></UploadRecipe>
            </div>
        </div> 
    );
}

export default HomePage;