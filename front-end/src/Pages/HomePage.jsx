import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom'
import '../Styles/global.css'
import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";
function Welcome() {
  return (
    <div style={{ border: "1px solid black", padding: "20px", margin: "20px" }}>
      <h1>Welcome to Chop!</h1>
      <p>
        Chop is an amazing platform where you can discover, share, and explore delicious recipes from around the world. Whether you're a professional chef or a home cook, Chop has something for everyone.
      </p>
    </div>
  )
}

function RecipeOfTheDay() {
  return (
    <div style={{ border: "1px solid black", padding: "20px", margin: "20px" }}>
      <h1>Recipe of The Day</h1>
      <p>
        Chicken Soup!
      </p>
    </div>
  )
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