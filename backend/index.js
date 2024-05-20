require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const config = require("./config.json");
const User = require("./models/user.model");
const Recipe = require("./models/recipe.model");
const { authenticateToken } = require("./utilities");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "Full Name, Email, and Password are required",
    });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).json({
      error: true,
      message: "This user already exists",
    });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Email and Password are required",
    });
  }

  const userInfo = await User.findOne({ email });
  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.password === password) {
    const accessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "3600m",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findById(user._id);
  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

// Add Recipe
app.post("/add-recipe", authenticateToken, async (req, res) => {
  const { title, ingredients, servings, cookTime, directions, tags } = req.body;
  const { user } = req.user;

  if (!title || !ingredients || !servings || !cookTime || !directions || !tags) {
    return res.status(400).json({
      error: true,
      message: "All fields are required",
    });
  }

  try {
    const recipe = new Recipe({
      title,
      ingredients,
      servings,
      cookTime,
      directions,
      tags,
      userId: user._id,
    });

    await recipe.save();
    return res.json({
      error: false,
      recipe,
      message: "Recipe added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Edit Recipe
app.put("/edit-recipe/:recipeId", authenticateToken, async (req, res) => {
  const { recipeId } = req.params;
  const { title, servings, cuisine, cookTime, directions, tags } = req.body;
  const { user } = req.user;

  try {
    const recipe = await Recipe.findOne({ _id: recipeId, userId: user._id });
    if (!recipe) {
      return res.status(404).json({ error: true, message: "Recipe not found" });
    }

    if (title) recipe.title = title;
    if (servings) recipe.servings = servings;
    if (cuisine) recipe.cuisine = cuisine;
    if (cookTime) recipe.cookTime = cookTime;
    if (directions) recipe.directions = directions;
    if (tags) recipe.tags = tags;

    await recipe.save();

    return res.json({
      error: false,
      recipe,
      message: "Recipe updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Get All Recipes
app.get("/get-all-recipes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const recipes = await Recipe.find({ userId: user._id }).sort({ isPinned: -1 });
    return res.json({
      error: false,
      recipes,
      message: "All recipes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Delete Recipe
app.delete("/delete-recipe/:recipeId", authenticateToken, async (req, res) => {
  const { recipeId } = req.params;
  const { user } = req.user;

  try {
    const recipe = await Recipe.findOne({ _id: recipeId, userId: user._id });
    if (!recipe) {
      return res.status(400).json({ error: true, message: "Recipe Not Found" });
    }

    await Recipe.deleteOne({ _id: recipeId, userId: user._id });
    return res.json({
      error: false,
      message: "Recipe Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Update isPinned Value
app.put("/update-recipe-pinned/:recipeId", authenticateToken, async (req, res) => {
  const { recipeId } = req.params;
  const { isPinned } = req.body;
  const { user } = req.user;

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
      message: "Recipe pinned status updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;
