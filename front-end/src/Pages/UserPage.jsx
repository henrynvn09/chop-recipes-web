import React from "react";
import myImage from "../assets/signupbackground.png";
import "../Styles/UserPage.css";
//import Footer from "../components/Footer.jsx";
import LogoutButton from "../Components/LogoutButton.jsx";
import ProtectedRoute from "../Components/ProtectedRoute.jsx";
import Navbar from "../Components/Navbar.jsx";

export default function Profile() {
  const [followed, setFollowed] = React.useState(false);
  ProtectedRoute();
  const followButtonHandler = () => {
    setFollowed(!followed);
  };
  return (
    <>
      <Navbar />
      <div>
        <LogoutButton />
      </div>
      <main className="profile-page">
        <section className="profile-section">
          <div
            className="profile-background"
            style={{ backgroundImage: `url(${myImage})` }}
          >
            <span className="black-overlay"></span>
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
                  <div className="profile-stat">
                    <div className="stat">
                      <div className="stat-number">
                        <span className="value">10</span>
                        <span className="placeholder">Recipes</span>
                      </div>
                    </div>
                  </div>
                  <div className="image-container">
                    <div className="relative">
                      <img
                        alt="..."
                        src={myImage}
                        className="profile-img rounded-full w-48 h-48 object-cover border-4 border-white justify-center"
                        style={{ maxWidth: "200px" }}
                      />
                    </div>
                  </div>
                  <div className="profile-stat">
                    <div className="stat">
                      <div className="stat-number">
                        <span className="value">22</span>
                        <span className="placeholder">Friends</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="profile-name">User name</h3>
                  <div className="flex justify-center pt-1 pb-8">
                    <button
                      onClick={followButtonHandler}
                      class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      {followed ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                  <div>Description</div>
                </div>

                <div className="text-xl h-10 pt-10 pl-10">
                  <h2>User's recipes</h2>
                </div>
                <div className="recipes-container">
                  <div className="recipe">
                    <a
                      href="./Aboutpage.jsx"
                      className="font-normal text-pink-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="No recipes found"
                        src={myImage}
                        style={{ maxWidth: "200px" }}
                      />
                    </a>
                  </div>
                  <div className="recipe">
                    <a
                      href="./Aboutpage.jsx"
                      className="font-normal text-pink-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="No recipes found"
                        src={myImage}
                        style={{ maxWidth: "200px" }}
                      />
                    </a>
                  </div>
                  <div className="recipe">
                    <a
                      href="./Aboutpage.jsx"
                      className="font-normal text-pink-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="No recipes found"
                        src={myImage}
                        style={{ maxWidth: "200px" }}
                      />
                    </a>
                  </div>
                  <div className="recipe">
                    <a
                      href="./Aboutpage.jsx"
                      className="font-normal text-pink-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="No recipes found"
                        src={myImage}
                        style={{ maxWidth: "200px" }}
                      />
                    </a>
                  </div>
                  <div className="recipe">
                    <a
                      href="./Aboutpage.jsx"
                      className="font-normal text-pink-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="No recipes found"
                        src={myImage}
                        style={{ maxWidth: "200px" }}
                      />
                    </a>
                  </div>
                  <div className="recipe">
                    <a
                      href="./Aboutpage.jsx"
                      className="font-normal text-pink-500"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="No recipes found"
                        src={myImage}
                        style={{ maxWidth: "200px" }}
                      />
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
