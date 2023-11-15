import express from "express";
import { Recipe } from "../models/recipeModel.js";

const router = express.Router();

// Route to save a new Recipe
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      /*!request.body.date ||*/
      !request.body.serves
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, serves",
      });
    }
    const newRecipe = {
      title: request.body.title,
      author: request.body.author,
      /*date: request.body.date,*/
      serves: request.body.serves,
    };

    const recipe = await Recipe.create(newRecipe);

    return response.status(201).send(recipe);
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

// Route to Get All Recipes from database
router.get("/", async (request, response) => {
  try {
    const recipes = await Recipe.find({});

    return response.status(200).json({
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Get One Recipe from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const recipe = await Recipe.findById(id);

    return response.status(200).json(recipe);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Update Recipe
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      /*!request.body.date ||*/
      !request.body.serves
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, serves",
      });
    }

    const { id } = request.params;

    const result = await Recipe.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Recipe not found" });
    }

    return response
      .status(200)
      .send({ message: "Recipe updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Delete a recipe
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Recipe.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
