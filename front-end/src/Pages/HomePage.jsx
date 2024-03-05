import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom'

import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";

import 'tailwindcss/tailwind.css';

function Welcome() {
  return (
    <div className="fixed top-24 left-4 w-1/3 h-40vh p-4 rounded-lg bg-custom-red">
      <div className="text-center">
        <p className="font-bold italic text-lg">Welcome to</p>
        <p className="font-bold italic text-4xl">CHOP</p>
        <p className="italic text-lg">
          Whether you're a seasoned chef or a kitchen novice, prepare to embark
          on a flavor-packed adventure like no other. Dive into our recipe
          library, where a treasure trove of culinary delights awaits your
          discovery. With our intuitive search bar and ingredient-tagging
          magic, finding your next culinary masterpiece is as easy as pie. So,
          sharpen your knives and unleash your inner chef – let's Chop till we
          drop!
        </p>
      </div>
    </div>
  );
};

function RecipeOfTheDay() {
  return (
      <div className="bg-red-200 rounded-full w-1/3 h-auto p-2 absolute left-0 top-2/3 box-border font-roboto flex flex-col items-center justify-center text-center">
          <h1 className="font-bold italic text-lg mb-2">Recipe Of The Day</h1>
      </div>
  );
}

function RandomRecipe() {
  return (
    <Link to="/random-recipe">
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/blender-button.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="rounded-full w-64 h-64 absolute left-3/4 top-1/2 transform -translate-x-1/2 box-border font-roboto flex items-center justify-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110">
        Random Recipe
      </div>
    </Link>
  )
}

function Library(){
  return (
    <Link to="/library">
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/cookbook-button.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="rounded-full w-64 h-64 absolute left-1/2 top-20 transform -translate-x-1/2 box-border font-roboto flex items-center justify-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110">
        Browse our Library
      </div>
    </Link>
  )
}

function ChefProfile() {
  return (
    <Link to="/user">
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/chefhat-button.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="rounded-full w-64 h-64 absolute left-3/4 top-20 transform -translate-x-1/2 box-border font-roboto flex items-center justify-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110">
        Chef's Profile
      </div>
    </Link>
  )
}

function AboutChop() {
  return (
    <Link to="/about">
      <div style={{ backgroundImage: `url('https://img.freepik.com/premium-vector/blurred-gradient-mesh-abstract-background-orange-yellow-seamless-transition_427410-505.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="rounded-full w-64 h-64 absolute left-1/2 top-1/2 transform -translate-x-1/2 box-border font-roboto flex items-center justify-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110">
        About our kitchen
      </div>
    </Link>
  )
}

function UploadRecipe(){
  return (
    <Link to="/upload-recipe">
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/whisk-button.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="rounded-full w-64 h-64 absolute left-1/2 top-1/2 transform -translate-x-1/2 box-border font-roboto flex items-center justify-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110">
        Upload New Recipe
      </div>
    </Link>
  )
}

function HomePage(){
  const {userID} = useUser(); 
  ProtectedRoute();
  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/stripes-bg.jpg'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', overflow: 'auto' }}>
          <Navbar />
          <div>
              <Welcome></Welcome>
              <RecipeOfTheDay></RecipeOfTheDay>
              <Library></Library>
              <RandomRecipe></RandomRecipe>
              <AboutChop></AboutChop>
              <ChefProfile></ChefProfile>
              <UploadRecipe></UploadRecipe>
          </div>
      </div> 
  );
}

export default HomePage;