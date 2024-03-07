import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";
import { useUser } from "../contexts/UserContent";

const Navbar = () => {
  const { userID } = useUser();
  const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/library", label: "Library" },
  { path: "/contacts", label: "Contact" },
  { path: `/user/${userID}`, label: "User" },
  { path: "/upload-recipe", label: "Upload Recipe" },
];


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
      {navLinks.map((link) => (
        <li key={link.path}>
          <Link to={link.path}>{link.label}</Link>
        </li>
      ))}
    </ul>
    </nav>
  );
};

export default Navbar;
