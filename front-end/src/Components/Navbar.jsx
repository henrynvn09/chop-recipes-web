import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/Navbar.css";
import { useUser } from "../contexts/UserContent";
import { placeholders } from "./SearchPlaceholders";

const Navbar = () => {
  // State variable to hold the value of the input field
  const [searchInput, setSearchInput] = useState("");
  const [placeholder, setPlaceholder] = useState(""); // State variable to hold the placeholder
  const placeholderRef = useRef(); // Create a ref for the search input

  const navigate = useNavigate(); // Create a navigate function

 // Set a random placeholder phrase every 7 seconds
 useEffect(() => {
  const intervalId = setInterval(() => {
    // Fade out the current placeholder
    if (placeholderRef.current) {
      placeholderRef.current.style.opacity = 0;
    }

    // Wait for the fade out animation to finish, then change the placeholder and fade it back in
    setTimeout(() => {
      const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
      setPlaceholder(randomPlaceholder);

      if (placeholderRef.current) {
        placeholderRef.current.style.opacity = 1;
      }
    }, 500); // Wait for 0.5 seconds, which is the duration of the fade out animation
  }, 7000); // Change the placeholder every 7 seconds

  // Clear the interval when the component is unmounted
  return () => clearInterval(intervalId);
}, []);

  // Event handler to update the search input value when Enter key is pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Event handler to update the search input value when search button is clicked
  const handleSearch = () => {
    navigate(`/library?search=${searchInput}`); // Navigate to the Library page with the search query
    setSearchInput("");
  };

  // Event handler to update the search input value when input field changes
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const { userID } = useUser();

  return (
    <nav className="navbar">
      <Link to="/home">
        <img src="/chopLogoWhite.svg" alt="" className="logo" />
      </Link>
      <div className="search-box">
        <input
          ref={placeholderRef} // Add the ref to the search input
          type="text"
          placeholder={placeholder}
          value={searchInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          <img src="/searchIcon.svg" alt="" className="search-icon" />
        </button>
      </div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/library">Library</Link>
        </li>

        <li>
          <Link to="/contacts">Contact</Link>
        </li>
        <li>
          <Link
            onClick={() => {
              window.location.href = "/user/" + userID;
            }}
          >
            User
          </Link>
        </li>
        <li>
          <Link className="notoverflow" to="/upload-recipe">
            Upload Recipe
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;