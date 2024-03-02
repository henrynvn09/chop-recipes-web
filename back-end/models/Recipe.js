const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    cover_image: { type: String, required: true },
    content_list: { type: Array, required: true },
    tagName_lists: { type: Array, required: true },
    ingredient_lists: { type: Array, required: true },
    author_id: { type: String, required: true },
  },
  {
    timestamps: true, // to auto track time
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
