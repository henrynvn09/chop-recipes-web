import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom'

import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";
import RecipePreviewBox from '../Components/RecipePreviewBox.jsx';

import 'tailwindcss/tailwind.css';

// function Welcome() {
//   return (
//     <div className="fixed top-24 left-12 w-1/3 h-40vh p-4 rounded-lg bg-custom-red">
//       <div className="text-center">
//         <p className="font-bold italic text-lg">Welcome to</p>
//         <p className="font-bold italic text-4xl">CHOP</p>
//         <p className="italic text-lg">
//           Whether you're a seasoned chef or a kitchen novice, prepare to embark
//           on a flavor-packed adventure like no other. Dive into our recipe
//           library! With our intuitive search bar and ingredient-tagging
//           magic, finding your next culinary masterpiece is as easy as pie. So,
//           sharpen your knives and unleash your inner chef – let's Chop till we
//           drop!
//         </p>
//       </div>
//     </div>
//   );
// };

const todaysRecipe = {
  title: "Apple Pie",
  image: "https://greateightfriends.com/wp-content/uploads/2019/03/Apple-Pie-v-1-2.jpeg",
  id: "1"
}


function RecipeOfTheDay({ className }) {
  return (
    <div className={`rounded-lg box-border font-roboto text-center flex items-center border ${className}`}>
      <h1 className="font-bold italic text-lg mb-2">Recipe Of TheDay</h1>
      <RecipePreviewBox id={todaysRecipe.id} title={todaysRecipe.title} image={todaysRecipe.image} />
    </div>
  );
}

function Library({ className }) {
  return (
    <Link to="/library">
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/cookbook.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className={`rounded-lg w-64 h-64 box-border font-roboto items-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
        <div></div>
        <div>Browse our Library</div>
      </div>
    </Link>
  )
}

function UploadRecipe({ className }) {
  return (
    <Link to="/upload-recipe">
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/whisk.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className={`rounded-lg w-64 h-64 box-border font-roboto justify-end items-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
        <div></div>
        <div>Upload New Recipe</div>
      </div>
    </Link>
  )
}

function ChefProfile({ className }) {
  return (
    <Link to="/user">
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/chefhat.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className={`rounded-lg w-64 h-64 box-border font-roboto items-center text-center text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 border-black ${className}`}>
        <div></div>
        <div>Chef's Profile</div>
      </div>
    </Link>
  )
}

function RandomRecipe({ className }) {
  return (
    //TODO: MAKE THIS LINK TO THE PAGE OF A RANDOM RECIPE
    <Link to="/random-recipe">
      <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/blender.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className={`rounded-lg w-64 h-64 box-border font-roboto text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 border border-black ${className}`}>
        <div></div>
        <div>Random Recipe</div>
      </div>
    </Link>
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

// function tester() {
//   return (
//     <Link to="/random-recipe">
//       <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/blender.png'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
//         <div>Random Recipe</div>
//       </div>
//     </Link>
//   );
// }

function HomePage(){
  const {userID} = useUser(); 
  ProtectedRoute();
  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/cuttingboard-bg.avif'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', overflow: 'auto' }}>
          <Navbar />
          <div className="grid grid-cols-3 gap-2">
              <RecipeOfTheDay className='col-start-2'/>
              <Library className='border border-white' />
              <RandomRecipe className='border border-black'/>
              {/* <AboutChop />*/}
              <ChefProfile className='border border-white'/>
              <UploadRecipe className='border border-white'/>
          </div>
      </div> 
  );
}

export default HomePage;