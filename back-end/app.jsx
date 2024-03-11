const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// Replace the uri string with your MongoDB deployment's connection string.
require("dotenv").config({ path: "./config.env" });
const recipeController = require("./controllers/recipeController");
const userController = require("./controllers/userController");
const authController = require("./controllers/authController");
const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;

const app = express();
//turns it to json file
app.use(express.json());
//access backend from front end
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

// ================== Recipe routes ==================
app.get("/api/recipe/all_recipes", recipeController.getAllRecipes);
app.post("/uploadRecipe", recipeController.uploadRecipe);
app.get(
  "/api/recipe/all_recipes/:user_id",
  recipeController.getRecipesbyUserID
);
app.get("/api/recipe/:id", recipeController.getRecipeByID);
app.get("/api/get_random_recipe_id", recipeController.getRandomRecipeID);
// Add the DELETE route for deleting a recipe
app.delete('/api/recipe/:id', recipeController.deleteRecipe);

// ================== User routes ==================
app.get("/api/:userid", userController.getProfileByID);
app.get("/api/followings/:profileList", userController.getFollowings);
app.post("/api/followProfile/:userID/:profileID", userController.followProfile);
app.post(
  "/api/unfollowProfile/:userID/:profileID",
  userController.unfollowProfile
);
app.post("/api/updatePhoto/:userID", userController.updateAvatar);

// =============== authentication routes ===========
app.post("/login", authController.login);
app.post("/logout", authController.logout);
app.post("/signup", authController.signup);

const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    if (renewToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(accessToken, "jwt-access-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "user not authorized" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  let exist = false;
  if (!refreshToken) {
    return res.json({ valid: false, message: "user not authorized" });
  } else {
    jwt.verify(refreshToken, "jwt-refresh-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Refresh" });
      } else {
        const accessToken = jwt.sign(
          { email: decoded.email },
          "jwt-access-token-secret-key",
          { expiresIn: "1m" }
        );
        res.cookie("accessToken", accessToken, { maxAge: 60000 });
        exist = true;
      }
    });
  }
  return exist;
};

app.get("/verify", verifyUser, authController.verifyUser);

app.listen(PORT, () => {
  console.log("Server is running... in port", PORT);
});
