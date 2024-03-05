const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// Replace the uri string with your MongoDB deployment's connection string.
require("dotenv").config({ path: "./config.env" });

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

app.get("/api/recipe/add", (req, res) => {
  const recipe = new Recipe({
    content_list: ["content 1", "content 2", "content 3"],
    tagName_lists: ["tag1", "tag 2", "tag 3"],
    ingredient_lists: ["rice", "sugar", "coke"],
    total_rating: 0,
    rating_count: 0,
  });

  recipe
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/api/recipe/all_recipes", (req, res) => {
  Recipe.find(
    {},
    {
      title: 1,
      cover_image: 1,
      tagName_lists: 1,
      ingredient_lists: 1,
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

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((users) => {
    if (users) {
      if (users.password === password) {
        UserID = users._id;
        const accessToken = jwt.sign(
          { email: email },
          "jwt-access-token-secret-key",
          { expiresIn: "1m" }
        );
        const refreshToken = jwt.sign(
          { email: email },
          "jwt-refresh-token-secret-key",
          { expiresIn: "24h" }
        );
        res.cookie("accessToken", accessToken, { maxAge: 60000 });
        res.cookie("refreshToken", refreshToken, {
          maxAge: 86400000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        return res.json({
          Login: true,
          UserID: UserID,
          message: "login successful",
        });
      } else {
        res.json({ Login: false, message: "password incorrect" });
      }
    } else {
      res.json("user not found");
    }
  });
});

app.post("/logout", (req, res) => {
  // Make sure to include both req and res here
  // Clear the accessToken cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  // Clear the refreshToken cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.json({ Logout: true, message: "Successfully logged out" });
});

//req.body is the data that is being sent to the server
app.post("/signup", (req, res) => {
  UserModel.findOne({ email: req.body.email }).then((users) => {
    if (users) {
      res.json("user already exists");
    } else {
      UserModel.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.json(err));
    }
  });
});

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

app.post("/uploadRecipe", (req, res) => {
    Recipe.create(req.body)
        .then((recipe) => res.json(recipe))
        .catch((err) => res.json(err));
    }
);

app.get("/verify", verifyUser, (req, res) => {
  return res.json({ valid: true, message: "auhorized" });
});



app.listen(PORT, () => {
  console.log("Server is running... in port", PORT);
});
