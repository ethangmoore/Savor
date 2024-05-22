const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: { type: String, required: true },
    servings: { type: String, required: false },
    cuisineType: { type: String, required: false },
    cookTime: { type: String, required: false },
    description: { type: String, required: false },
    ingredients: { type: String, required: true },
    directions: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: { type: String, required: true },
    createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Recipe", recipeSchema);