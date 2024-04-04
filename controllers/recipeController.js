const Recipe = require('../models/recipeModel');


exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


exports.getRecipeByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const recipe = await Recipe.findOne({ title });
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


exports.createRecipe = async (req, res) => {
    const recipe = new Recipe(req.body);
    try {
        const existingRecipe = await Recipe.findOne({ title: recipe.title });
        if (existingRecipe) return res.status(409).json({ message: "Recipe already exists" });

        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


exports.updateRecipe = async (req, res) => {
    const { id } = req.params;
    const updatedRecipe = req.body;
    try {
        const recipe = await Recipe.findByIdAndUpdate(id, updatedRecipe, { new: true });
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Recipe.findByIdAndRemove(id);
        if (!result) return res.status(404).json({ message: "Recipe not found" });
        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
