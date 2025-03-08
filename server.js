const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.nknbp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Recipe Schema
const RecipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    image: { type: String } // Store image URL
  },
  { timestamps: true } // Enable createdAt and updatedAt fields
);



const Recipe = mongoose.model("Recipe", RecipeSchema);

// Get all recipes grouped by category
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();

    const categorizedRecipes = {
      VegRecipe: [],
      
      NonVegRecipe: [],  
      IceCreams: [],
      Cakes: []
    };

    recipes.forEach(recipe => {
      if (categorizedRecipes[recipe.category]) {
        categorizedRecipes[recipe.category].push(recipe);
      }
    });

    res.json(categorizedRecipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

// Get recipes by category
app.get("/recipes/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ["VegRecipe", "NonVegRecipe",  "IceCreams", "Cakes"];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const recipes = await Recipe.find({ category });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes by category" });
  }
});

// Add a new recipe
app.post("/recipes", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging line

    const newRecipe = new Recipe(req.body);
    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (err) {
    console.error("Error adding recipe:", err);
    res.status(500).json({ message: "Error adding recipe", error: err.message });
  }
});

// Update a recipe
app.put("/recipes/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error updating recipe" });
  }
});

// Delete a recipe
app.delete("/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

