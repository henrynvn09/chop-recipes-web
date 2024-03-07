import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom'

import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";
import RecipePreviewBox from '../Components/RecipePreviewBox.jsx';

import 'tailwindcss/tailwind.css';

const todaysRecipe = {
  title: "Apple Pie",
  image: "https://greateightfriends.com/wp-content/uploads/2019/03/Apple-Pie-v-1-2.jpeg",
  id: "1"
}


function RecipeOfTheDay({ className }) {
  return (
    <div className={`rounded-lg box-border font-roboto text-center flex items-center ${className}`}>
      <h1 className="font-bold italic text-lg mb-2">Recipe Of TheDay</h1>
      <RecipePreviewBox id={todaysRecipe.id} title={todaysRecipe.title} image={todaysRecipe.image} />
    </div>
  );
}

function Library({ className }) {
  return (
    <div className="flex justify-center">
      <Link to="/library" className={`rounded-lg w-64 h-64 box-border font-roboto text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
        <img src={`${process.env.PUBLIC_URL + '/cookbook.png'}`} alt="Cookbook" className="w-full h-full object-cover" />
        <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Browse our Library</div>
      </Link>
    </div>
  )
}

function UploadRecipe({ className }) {
  return (
    <div className="flex justify-center">
      <Link to="/upload-recipe" className={`rounded-lg w-64 h-64 box-border font-roboto text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
        <img src={`${process.env.PUBLIC_URL + '/whisk.png'}`} alt="Whisk" className="w-full h-full object-cover" />
        <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Upload New Recipe</div>
      </Link>
    </div>
  )
}

function ChefProfile({ className, userID }) {
  return (
    <div className="flex justify-center">
      <Link to={`/user/${userID}`} className={`rounded-lg w-64 h-64 box-border font-roboto flex flex-col justify-center items-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
        <img src={`${process.env.PUBLIC_URL + '/chefhat.png'}`} alt="Chef Hat" className="w-full h-full object-cover" />
        <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Chef's Profile</div>
      </Link>
    </div>
  )
}

function RandomRecipe({ className }) {
  return (
    <div className="flex justify-center">
      <Link to="/random-recipe" className={`rounded-lg w-64 h-64 box-border font-roboto text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
        <img src={`${process.env.PUBLIC_URL + '/blender.png'}`} alt="Blender" className="w-full h-full object-cover" />
        <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Random Recipe</div>
      </Link>
    </div>
  )
}


//CURRENTLY NOT USED
function AboutChop() {
  return (
    <Link to="/about">
      <div style={{ backgroundImage: `url('https://img.freepik.com/premium-vector/blurred-gradient-mesh-abstract-background-orange-yellow-seamless-transition_427410-505.jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="rounded-full w-64 h-64 transform box-border font-roboto flex items-center justify-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110">
        About our kitchen
      </div>
    </Link>
  )
}

function HomePage(){
  const {userID} = useUser(); 
  ProtectedRoute();
  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/cuttingboard-bg.avif'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', overflow: 'auto' }}>
          <Navbar />
          <div className="pt-4 grid grid-cols-3 gap-10">
              <RecipeOfTheDay className='col-start-1 row-span-2'/>
              <Library className='' />
              <UploadRecipe className=''/>
              {/* <AboutChop />*/}
              <ChefProfile className=''/>
              <RandomRecipe className=''/>
          </div>
      </div> 
  );
}

export default HomePage;