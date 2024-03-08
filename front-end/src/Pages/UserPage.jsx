import React from "react";
import coverImage from "../assets/signupbackground.png";
import blankAvatarImage from "../assets/blankProfile.webp";
import "../Styles/UserPage.css";
//import Footer from "../components/Footer.jsx";
import LogoutButton from "../Components/LogoutButton.jsx";
import ProtectedRoute from "../Components/ProtectedRoute.jsx";
import Navbar from "../Components/Navbar.jsx";
import ProfilePicture from "../Components/ProfilePicture";
import "react-image-crop/dist/ReactCrop.css";
import { useUser } from "../contexts/UserContent";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfilePreview from "../Components/ProfilePreview.jsx";
import RecipePreviewBox from "../Components/RecipePreviewBox.jsx";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Profile() {
  // protected route
  ProtectedRoute();

  const [followed, setFollowed] = React.useState(false);
  const { userID } = useUser();
  const { profile_id } = useParams();
  
  const [userDetails, setUserDetails] = React.useState(null);
  const [viewerProfile, setViewerProfile] = React.useState(null);
  const [recipes, setRecipes] = React.useState([]);
  const [followingProfiles, setFollowingProfiles] = React.useState([]);

  // Fetching user data from backend
  React.useEffect(() => {
    fetchProfile();
    fetchRecipesByProfileID();
    fetchViewerProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/api/" + profile_id);
      console.log("User details fetched:", response.data[0]);
      setUserDetails(response.data[0]);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const fetchViewerProfile = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/api/" + userID);
      console.log("Viewer details fetched:", response.data[0]);
      setViewerProfile(response.data[0]);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // fetch recipes by profile id
  const fetchRecipesByProfileID = async () => {
    try {
      console.log("backend url = " + BACKEND_URL);
      const response = await axios.get(
        BACKEND_URL + "/api/recipe/all_recipes/" + profile_id
      );

      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // fetch followings profiles by profile id
  React.useEffect(() => {
    if (userDetails) {
      fetchFollowingsByProfileID();
    }
  }, [userDetails]);

  React.useEffect(() => {
    if (userID !== profile_id && userDetails && viewerProfile) {
      setFollowed(viewerProfile.followings.includes(profile_id));
      console.log("Followed:", viewerProfile.followings, profile_id);
      console.log("Followed:", followed);
    }
  }, [viewerProfile, userDetails]);

  const fetchFollowingsByProfileID = async () => {
    try {
      const response = await axios.get(
        BACKEND_URL + "/api/followings/" + userDetails.followings.join(",")
      );
      console.log("Followings fetched:", response.data);

      setFollowingProfiles(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const user = {
    name: "Username",
    description: "",
    Image: blankAvatarImage,
    followings: [],
    recipes: [],
  };
  if (userDetails) {
    user.name = userDetails.name;
    user.description = userDetails.description;
    user.Image = userDetails.Image ? userDetails.Image : blankAvatarImage;
  }
  if (recipes) {
    user.recipes = recipes;
  }
  if (followingProfiles) {
    user.followings = followingProfiles;
  }

  // Button follow and signout
  const followButtonHandler = () => {
    if (followed) {
      unfollowUser();
    } else {
      followUser();
    }
  };
  const followUser = async () => {
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/followProfile/" + userID + "/" + profile_id
      );
      console.log("Followed:", response.data);
      setFollowed(true);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  const unfollowUser = async () => {
    try {
      console.warn(
        BACKEND_URL + "/api/unfollowProfile/" + userID + "/" + profile_id
      );
      const response = await axios.post(
        BACKEND_URL + "/api/unfollowProfile/" + userID + "/" + profile_id
      );
      console.log("Unfollowed:", response.data);
      setFollowed(false);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const followOrSignoutButton = () => {
    if (profile_id === userID) {
      return (
        <div className="flex justify-center pt-1 pb-8">
          <LogoutButton />
        </div>
      );
    } else {
      return (
        <div className="flex justify-center pt-1 pb-8">
          <button
            onClick={followButtonHandler}
            class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            {followed ? "Unfollow" : "Follow"}
          </button>
        </div>
      );
    }
  };

  // render Followings
  const followingComponents = user.followings.map((user, index) => {
    return <ProfilePreview key={index} user={user} />;
  });

  // render recipes
  const recipePreviewBoxes = recipes.map((recipe, index) => (
    <RecipePreviewBox
      key={index}
      image={recipe.cover_image}
      title={recipe.title}
      id={recipe._id}
    />
  ));

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <section className="profile-section">
          <div
            className="profile-background"
            style={{ backgroundImage: `url(${coverImage})` }}
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
                        <span className="value">{user.recipes.length}</span>
                        <span className="placeholder">Recipes</span>
                      </div>
                    </div>
                  </div>
                  <div className="image-container">
                    <div className="relative">
                      <ProfilePicture/>
                    </div>
                  </div>
                  <div className="profile-stat">
                    <div className="stat">
                      <div className="stat-number">
                        <span className="value">{user.followings.length}</span>
                        <span className="placeholder">Followings</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="profile-name">{user.name}</h3>
                  {followOrSignoutButton()}
                  <div>{user.description}</div>
                </div>

                <div className="bg-gray-200 h-[1px] mx-12 mt-10"></div>
                <div className="text-xl h-10 pt-10 pl-10">
                  <h2>User's recipes</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 3xl:grid-cols-5 mx-10 p-10 overflow-y-scroll">
                  {recipePreviewBoxes}
                </div>
                <h3 className="text-xl h-10 pl-10">Followings</h3>
                <div className="flex overflow-x-scroll space-x-24 mx-10 mb-5 border rounded-md">
                  {followingComponents}
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

