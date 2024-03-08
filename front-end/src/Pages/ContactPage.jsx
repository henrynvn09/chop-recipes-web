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
    <div>
      <Navbar />
      <div className="bg-gradient-to-tr from-red-500 to-purple-400 relative h-screen w-screen">
        <img
          className="absolute inset-0 w-full h-full"
          alt="background image for"
          src="/contactBackground.jpg"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center w-5/6 max-w-lg mx-auto text-center">
          <div className="space-y-8">
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
    </div>
  );
};

export default ContactPage;
