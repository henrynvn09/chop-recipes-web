import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom'
import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";
import 'tailwindcss/tailwind.css';
import "../Styles/HomePage.css";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

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
      <div className="mt-auto bg-white bg-opacity-50 w-full text-center">Share with a Friend!</div>
    </button>
    </div>
  )
}



function HomePage(){
  const {userID} = useUser(); 
  ProtectedRoute();
  const Navigate = useNavigate();
  useEffect(() => {
      document.body.classList.add('overflow-hidden');
      
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }, []);


  const handleLibraryClick = () => {
    Navigate('/library');
    console.log('Library button clicked');

  };


  const handleUploadRecipeClick = () => {
    Navigate('/upload-recipe');
    console.log('Upload recipe button clicked');

  };

 
  const handleContactClick = () => {
    Navigate('/contacts');
    console.log('Contact button clicked');

  };

 
  const handleProfileClick = (userID) => {
    Navigate('/user/' + userID);
    console.log('Profile button clicked for user:', userID);
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