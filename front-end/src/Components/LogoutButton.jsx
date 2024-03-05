// LogoutButton.js
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/LibraryRecipes.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/logout", {}, { withCredentials: true })
      .then((result) => {
        console.log(result);
        if (result.data.Logout) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <button
      onClick={handleSubmit}
      class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      Sign out
    </button>
  );
};

export default LogoutButton;
