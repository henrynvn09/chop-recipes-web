const Recipe = require("../models/Recipe");

exports.uploadRecipe = (req, res) => {
  Recipe.create(req.body)
    .then((recipe) => res.json(recipe))
    .catch((err) => res.json(err));
};

exports.getAllRecipes = (req, res) => {
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
};

exports.getRecipesbyUserID = (req, res) => {
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
};

exports.getRecipeByID = (req, res) => {
  Recipe.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};


exports.getRandomRecipe = (req, res) => {
  Recipe.aggregate([
    { $sample: { size: 1 } }, // Randomly selects one document
    { $project: { 
        title: 1, 
        cover_image: 1, 
        tagName_lists: 1, 
        ingredient_lists: 1, 
        _id: 1 
      } 
    }
  ])
  .then((result) => {
    res.send(result[0]); // Send the first (and only) item in the result array
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ message: "Error retrieving random recipe" });
  });
};