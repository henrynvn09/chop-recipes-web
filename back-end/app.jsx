const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
app.use(cors());

mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.get("/recipe/add", (req, res) => {
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

app.get("/recipe/all_recipes", (req, res) => {
  Recipe.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get("/recipe/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log("Server is running... in port", PORT);
});
