require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model");
const Recipe = require("./models/recipe.model")

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origins: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "hello" })
});

// Backend Ready

// Create Account

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json ({
        user: {
            fullName: isUser.fullName, 
            email: isUser.email, 
            _id: isUser._id,
            createdOn: isUser.createdOn
        },
        message: ""
    });
});

// Add Recipe

// Edit Recipe

// Get All Recipes

// Delete Recipe
app.delete("/delete-recipe/:recipeId", authenticateToken, async (req, res) => {
    const recipeId = req.params.recipeId;
    const { user } = req.user;

    try {
        const recipe = await Recipe.findOne({ _id: recipeId, userId: user._id
        });

        if (!recipe) {
            return res.status(404).json({ error: true, message: "Recipe not found"
            });
        }

        await Recipe.deleteOne({ _id: recipeId, userId: user._id
        });

        return res.json({
            error: false,
            message: "Recipe deleted successfully"
        });
    } catch (error) {
        return res.status(500).json ({
            error: true,
            message: "Internal server error"
        });
    }
});

// Update isPinned Value
app.put("/update-recipe-pinned/:recipeId", authenticateToken, async (req, res) => {
    const recipeId = req.params.recipeId;
    const { isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res
        .status(400)
        .json({ error: true, message: "No changes provided" });
    }

    try {
        const recipe = await Recipe.findOne({ _id: recipeId, userId: user._id });

        if (!recipe) {
            return res.status(404).json({ error: true, message: "Recipe not found" });
        }

        recipe.isPinned = isPinned;

        await recipe.save();

        return res.json({
            error: false,
            recipe,
            message: "Recipe updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
});

app.listen(8000);

module.exports = app;