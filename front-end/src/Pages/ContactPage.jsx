import React from "react";
import "../Styles/LibraryRecipes.css";
import Navbar from "../Components/Navbar";

import ProtectedRoute from "../Components/ProtectedRoute";

const ContactPage = () => {
  ProtectedRoute();

  const onClickHandler = () => {
    window.location.href = "mailto:chop_developer@g.ucla.edu";
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Navbar />
      <div className="bg-gradient-to-tr from-red-500 to-purple-400 relative w-full h-full">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="background image for"
          src="/contactBackground.jpg"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center space-y-8 text-center">
          <div className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-tight">
            <img
              src="/chopLogoBlack.svg"
              alt="logo"
              className="h-48 w-full object-cover md:h-full md:w-48 mx-auto"
            />
          </div>
          <button
            onClick={onClickHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Email us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
