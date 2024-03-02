import React from "react";
// import Navbar from "../Components/Navbar";
import { Link } from 'react-router-dom'
import '../Styles/global.css'

function ChefProfile({value, onChefClick}) {
  return (
    <button className="chefButton">{value}</button>
  )
}

function AboutChop({value, onAboutChopClick}) {
  return (
    <button className="AboutChop">{value}</button>
  )
}

function HomePage(){
  function handleClick() {
    return;
  }
    return (
        <div>
            {/* <Navbar /> */}
            <div>
                <button className="welcome"></button>
                <button className="Recipe Of The Day"></button>
                <button className="Browse Recipe Library"></button>
                <button className="Recipe Randomizer"></button>
                <AboutChop value="About Chop" className="About Chop"></AboutChop>
                {/* <button className="About Chop" onAboutChopClick={() => handleClick()}></button> */}
                <ChefProfile value="Chef's Profile" onChefClick={() => handleClick()}></ChefProfile>
                {/* <button className="Chef's Profile"></button> */}
                Edmund is the best
            </div>
        </div>
    );
}

export default HomePage;