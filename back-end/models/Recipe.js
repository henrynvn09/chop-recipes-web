const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    content_list: { type: Array, required: true },
    tagName_lists: { type: Array, required: true },
    ingredient_lists: { type: Array, required: true },
    total_rating: { type: Number, required: true },
    rating_count: { type: Number, required: true },
  },
  {
    timestamps: true, // to auto track time
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
