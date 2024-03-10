import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/Navbar.css";
import { useUser } from "../contexts/UserContent";
import { placeholders } from "./SearchPlaceholders";

const Navbar = () => {
  // State variable to hold the value of the input field
  const [searchInput, setSearchInput] = useState("");
  const [placeholder, setPlaceholder] = useState(""); // State variable to hold the placeholder

  const navigate = useNavigate(); // Create a navigate function

  // Set a random placeholder phrase when the component is rendered
  useEffect(() => {
    const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
    setPlaceholder(randomPlaceholder);
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