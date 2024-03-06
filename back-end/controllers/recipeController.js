const Recipe = require('../models/Recipe');

exports.uploadRecipe = (req, res) => {
    Recipe.create(req.body)
        .then((recipe) => res.json(recipe))
        .catch((err) => res.json(err));
}

exports.addRecipe = (req, res) => {
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

exports.getRandomRecipe = (req, res) => {
  Recipe.aggregate().sample(1).exec()
        .then((result) => {
        res.send(result[0]._id);
        })
        .catch((err) => console.log(err));
}
