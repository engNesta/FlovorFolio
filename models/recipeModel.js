const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({

    title: String,
    ingredients: String,
    instructions: String,
    coojingTime: String,   
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;