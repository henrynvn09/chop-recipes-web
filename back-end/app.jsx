const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// Replace the uri string with your MongoDB deployment's connection string.
require("dotenv").config({ path: "./config.env" });
const recipeController = require("./controllers/recipeController");
const authController = require("./controllers/authController");
const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;

// Import schema here!
const UserModel = require("./models/Users");
const Recipe = require("./models/Recipe");

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

//recipe routes
app.get("/api/recipe/add", recipeController.addRecipe);
app.get("/api/recipe/all_recipes", recipeController.getAllRecipes);
app.post("/uploadRecipe", recipeController.uploadRecipe);


app.get("/api/recipe/all_recipes/:user_id", (req, res) => {
  Recipe.find(
    { author_id: req.params.user_id },
    {
      title: 1,
      cover_image: 1,
      _id: 1,
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/api/recipe/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/api/:userid", (req, res) => {
  UserModel.find({ _id: req.params.userid }, { password: 0 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/api/followings/:profileList", (req, res) => {
  const profileList = req.params.profileList.split(",");
  UserModel.find({ _id: { $in: profileList } }, { password: 0 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.post("/api/followProfile/:userID/:profileID", (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.userID,
    { $push: { followings: req.params.profileID } },
    { new: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.post("/api/unfollowProfile/:userID/:profileID", (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.userID,
    { $pull: { followings: req.params.profileID } },
    { new: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//authentication routes
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
