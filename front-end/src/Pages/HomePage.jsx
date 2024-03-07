import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom'
import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";
import 'tailwindcss/tailwind.css';
import "../Styles/HomePage.css";
import { useEffect } from "react";

const todaysRecipe = {
  title: "Apple Pie",
  image: "https://greateightfriends.com/wp-content/uploads/2019/03/Apple-Pie-v-1-2.jpeg",
  id: "1"
}

function getTodaysRecipe() {
  //TODO: CHANGE THIS TO FETCH FROM BACKEND
  return {
    title: "Apple Pie",
    image: "https://greateightfriends.com/wp-content/uploads/2019/03/Apple-Pie-v-1-2.jpeg",
    id: "1"
  };
}

function getRandomRecipeID() {
  //TODO: CHANGE THIS TO FETCH FROM BACKEND TO RETURN A RANDOM RECIPE ID
  return {
    id: "1",
  };
}

function RecipeOfTheDay({ className }) {
  const recipe = getTodaysRecipe();
  return (
    <div className={`rounded-lg box-border font-roboto flex flex-col items-center justify-center ${className}`}>
      <Link to={`/view-recipe/${recipe.id}`} className="flex flex-col items-center">
        <h1 className="font-bold italic text-2xl mb-2">Recipe Of The Day</h1>
        <h2 className="font-bold italic text-xl mb-2">{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="w-64 h-64 object-cover" />
      </Link>
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
        <img src={`${process.env.PUBLIC_URL + '/whisk-square.png'}`} alt="Whisk" className="w-full h-full object-cover" />
        <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Upload New Recipe</div>
      </Link>
    </div>
  )
}

function ChefProfile({ className, userID }) {
  return (
    <div className="flex justify-center">
      <Link to={`/user/${userID}`} className={`rounded-lg w-64 h-64 box-border font-roboto text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
        <img src={`${process.env.PUBLIC_URL + '/chefhat.png'}`} alt="Chef Hat" className="w-full h-full object-cover" />
        <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Chef's Profile</div>
      </Link>
    </div>
  ) 
}

function RandomRecipe({ className }) {
  const randomRecipeID = getRandomRecipeID().id;
  return (
    <div className="flex justify-center">
      <Link to={`/view-recipe/${randomRecipeID}`} className={`rounded-lg w-64 h-64 box-border font-roboto text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
        <img src={`${process.env.PUBLIC_URL + '/blender-newest.png'}`} alt="Blender" className="w-full h-full object-cover" />
        <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Random Recipe</div>
      </Link>
    </div>
  )
}

function ContactUs({ className }) {
  return (
    <div className="flex justify-center">
      <Link to="/contacts" className={`rounded-lg w-64 h-64 box-border font-roboto text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
        <img src={`${process.env.PUBLIC_URL + '/mail-square.png'}`} alt="Contact" className="w-full h-full object-cover" />
        <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Contact Us</div>
      </Link>
    </div>
  )
}

function ShareWithFriend({ className, handleShare }) {
  return (
    <div className="flex justify-center">
    <button onClick={handleShare} className={`rounded-lg w-64 h-64 box-border font-roboto text-lg font-bold italic transition-transform duration-500 ease-in-out hover:scale-110 ${className}`}>
      <img src={`${process.env.PUBLIC_URL + '/chef.png'}`} alt="Share" className="w-full h-full object-cover" />
      <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Share with a Friend</div>
    </button>
    </div>
  )
}

 // Dummy function for browsing the library
  const handleLibraryClick = () => {
    console.log('Library button clicked');
    // Navigate to the library page or perform any action here
    // history.push('/library');
  };

  // Dummy function for uploading a new recipe
  const handleUploadRecipeClick = () => {
    console.log('Upload recipe button clicked');
    // Navigate to the upload recipe page or perform any action here
    // history.push('/upload-recipe');
  };

  // Dummy function for contacting us
  const handleContactClick = () => {
    console.log('Contact button clicked');
    // Navigate to the contact page or perform any action here
    // history.push('/contacts');
  };

  // Dummy function for user profile
  const handleProfileClick = (userID) => {
    console.log('Profile button clicked for user:', userID);
    // Navigate to the user profile page or perform any action here
    // history.push(`/user/${userID}`);
  };

  // Dummy function for a random recipe
  const handleRandomRecipeClick = () => {
    console.log('Random recipe button clicked');
    // Navigate to a random recipe page or perform any action here
    // history.push(`/view-recipe/${getRandomRecipeID().id}`);
  };

  // Dummy function for sharing with a friend
  const handleShare = () => {
    console.log('Share button clicked');
    // Perform share action here
  };

function HomePage(){
  const {userID} = useUser(); 
  ProtectedRoute();
  useEffect(() => {
  document.body.classList.add('overflow-hidden');
  
  return () => {
    document.body.classList.remove('overflow-hidden');
  };
}, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this awesome recipe website!',
        text: 'Hey, I found this awesome recipe website! Check it out and let\'s cook something delicious together!',
        url: window.location.href
      }).catch(console.error);
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="bg-custom-grey ">
        <Navbar />
        <div className="relative h-screen">
        <div className="relative block w-full h-1/4screen hover:bg-opacity-75">
         
            <img src='/allfoodimg.jpg' alt="All Food" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black transition duration-300 ease-in-out bg-opacity-50 hover:bg-opacity-75 ">

              <a href="/library" className="absolute inset-0 flex justify-center mt-40 z-0">
                  <h1 className="text-white text-2xl md:text-4xl lg:text-7xl font-bold">Never Takeout Again</h1>
              </a>
              <a href="/library" className="absolute inset-0 flex justify-center mt-80 z-0">
                  <h3 className="text-custom-grey text-sm md:text-md lg:text-lg italic">At Chop, we offer quality services for all!</h3>
              </a>
            </div>
        </div>

          
          <div className="centered-grid absolute flex justify-center z-1000">
                  <div className="grid grid-cols-3 gap-[4rem] max-w-5xl "
                  >
            
                    <div className="bg-custom-darkgreen rounded-[4rem] transition duration-500 ease-in-out hover:scale-110 hover:bg-custom-green p-10">
                        <button onClick={() => handleLibraryClick()} className="  rounded-lg h-64 box-border font-roboto text-lg font-bold italic ">
                          <div className="justify-center flex-col ">

                            <img src='/cookbook.png' alt="Cookbook"  />
                            <div className=" bg-opacity-50">Browse our Library</div>
                            </div>
                        </button>
                    </div>

                    <div className="bg-custom-darkgreen rounded-[4rem]  transition duration-500 ease-in-out hover:scale-110 hover:bg-custom-green p-10">
                        <button onClick={() => handleUploadRecipeClick()} className=" rounded-lg h-64 box-border font-roboto text-lg font-bold italic ">
                                                <div className="justify-center flex-col">

                            <img src={'/whisk-square.png'} alt="Whisk"  />
                            <div className=" bg-opacity-50">Upload New Recipe</div>
                            </div>
                        </button>
                    </div>

                    <div className="bg-custom-darkgreen rounded-[4rem]   transition duration-500 ease-in-out hover:scale-110 hover:bg-custom-green p-10">
                        <button onClick={() => handleContactClick()} className="rounded-lg h-64 box-border font-roboto text-lg font-bold italic ">
                                                <div className="justify-center flex-col">

                            <img src={'/mail-square.png'} alt="Contact"  />
                            <div className=" bg-opacity-50">Contact Us</div>
                            </div>
                        </button>
                    </div>

                    <div className="bg-custom-darkgreen rounded-[4rem]   transition duration-500 ease-in-out hover:scale-110 hover:bg-custom-green p-10">
                        <button onClick={() => handleProfileClick(userID)} className="rounded-lg h-64 box-border font-roboto text-lg font-bold italic ">
                            <div className="justify-center flex-col">
                            <img src={'/chefhat.png'} alt="Chef Hat"  />
                            <div className="bg-opacity-50">Chef's Profile</div>
                            </div>
                        </button>
                    </div>

                    <div className="bg-custom-darkgreen rounded-[4rem]   transition duration-500 ease-in-out hover:scale-110 hover:bg-custom-green p-10">
                        <button onClick={() => handleRandomRecipeClick()} className="rounded-lg h-64 box-border font-roboto text-lg font-bold italic ">
                            <div className="justify-center flex-col">

                            <img src={'/blender-newest.png'} alt="Blender" />
                            <div className=" bg-opacity-50">Random Recipe</div>
                            </div>
                        </button>
                    </div>
                    <div className="bg-custom-darkgreen rounded-[4rem]  transition duration-500 ease-in-out hover:scale-110 hover:bg-custom-green p-10">
                        <button onClick={handleShare} className=" rounded-lg w-60 h-60 box-border font-roboto text-lg font-bold italic  flex flex-col">
                            <div className="justify-center flex-col">
                              <img src={'/chef.png'} alt="Share" />
                              <div className="bg-opacity-50">Share with a Friend</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            </div>
      </div> 
  );
}

export default HomePage;