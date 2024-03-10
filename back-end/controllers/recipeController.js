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

exports.getRandomRecipeID = (req, res) => {
  Recipe.aggregate([{ $sample: { size: 1 } }, { $project: { _id: 1 } }])
    .then((result) => {
      res.send(result[0]); // Send the first (and only) item in the result array
    })
    .catch((err) => console.log(err));
};

exports.deleteRecipe = (req, res) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.status(200).json({ message: 'Recipe deleted successfully' });
    })
    .catch((err) => {
      console.error('Error deleting recipe:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
};