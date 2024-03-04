import React from "react";
import myImage from "../assets/signupbackground.png"; 
import "../Styles/UserPage.css"
//import Footer from "../components/Footer.jsx";
import LogoutButton from "../Components/LogoutButton.jsx";
import ProtectedRoute from "../Components/ProtectedRoute.jsx";
import Navbar from "../Components/Navbar.jsx";

export default function Profile() {
  ProtectedRoute();
  return (
    <>
        <Navbar/>    
      <div>
        <LogoutButton />
      </div>
      <main className="profile-page">
        <section className="profile-section">
            <div
            className="profile-background"
            style={{backgroundImage: `url(${myImage})`}}
            >
            <span
              className="black-overlay"
            ></span>
          </div>
          <div className="bottom-shape">
            <svg
              className="svg-shape"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="polygon-shape"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="profile-segment">
          <div className="container">
            <div className="profile-card">
              <div className="profile-top">
                <div className="profile-topCenter">
                  <div className="image-container">
                    <div className="relative">
                      <img
                        alt="..."
                        src={myImage}
                        className="profile-img"
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  </div>
                  <div className="button-container">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                  <div className="profile-stat">
                    <div className="stat">
                      <div className="stat-number">
                        <span className="value">
                          22
                        </span>
                        <span className="placeholder">Friends</span>
                      </div>
                      <div className="stat-number">
                        <span className="value">
                          10
                        </span>
                        <span className="placeholder">Recipes</span>
                      </div>
                      <div className="stat-number">
                        <span className="value">
                          89
                        </span>
                        <span className="placeholder">Points</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-info">
                <h3 className="profile-name">
                  Chop
                </h3>
                <div className="profile-location">
                  <i className="profile-icon fas fa-map-marker-alt"></i>
                  Los Angeles, California
                </div>
                <div className="profile-job">
                  <i className="profile-icon fas fa-briefcase"></i>
                  Student
                </div>
                <div className="profile-university">
                  <i className="profile-icon fas fa-university"></i>
                  University of California
                </div>
              </div>
              <div className="recipes-heading"><h2>Your recommended recipes</h2></div>
                <div className="recipes-container">
                  <div className="recipe">
                      <a
                        href="./Aboutpage.jsx"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        <img alt="No recipes found" src={myImage} style={{ maxWidth: "200px" }}/>
                      </a>
                  </div>
                  <div className="recipe">
                      <a
                        href="./Aboutpage.jsx"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        <img alt="No recipes found" src={myImage} style={{ maxWidth: "200px" }}/>
                      </a>
                  </div>
                  <div className="recipe">
                      <a
                        href="./Aboutpage.jsx"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        <img alt="No recipes found" src={myImage} style={{ maxWidth: "200px" }}/>
                      </a>
                  </div>
                  <div className="recipe">
                      <a
                        href="./Aboutpage.jsx"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        <img alt="No recipes found" src={myImage} style={{ maxWidth: "200px" }}/>
                      </a>
                  </div>
                  <div className="recipe">
                      <a
                        href="./Aboutpage.jsx"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        <img alt="No recipes found" src={myImage} style={{ maxWidth: "200px" }}/>
                      </a>
                  </div>
                  <div className="recipe">
                      <a
                        href="./Aboutpage.jsx"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        <img alt="No recipes found" src={myImage} style={{ maxWidth: "200px" }}/>
                      </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
     {/* <Footer /> */}
    </>
  );
}

export default UserPage;