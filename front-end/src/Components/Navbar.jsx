import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import { useUser } from "../contexts/UserContent";

const Navbar = () => {
  // State variable to hold the value of the input field
  const [searchInput, setSearchInput] = useState("");

  // Event handler to update the search input value when Enter key is pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Event handler to update the search input value when search button is clicked
  const handleSearch = () => {
    console.log("Search Input:", searchInput);
    setSearchInput("");
    // Here you can perform any further actions with the searchInput value
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
          placeholder="Search"
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
        <li>
          <Link className="notoverflow" to="/view-recipe">
            View Recipe
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;