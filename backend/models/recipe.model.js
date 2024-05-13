const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = newSchema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: { type: String, required: true },
    createdOn: { type: DataTransfer, default: newDate().getTime() },
});

module.exports = mongoose.model("Recipe", recipeSchema);