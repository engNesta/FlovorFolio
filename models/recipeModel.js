const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [String],
  instructions: String,
  cookingTime: Number,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
