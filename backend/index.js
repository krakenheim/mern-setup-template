import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Recipe } from "./models/recipeModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("This is a MERN Template.");
});

// Route to save a new Recipe
app.post("/recipe", async (request, response) => {
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
app.get("/recipe", async (request, response) => {
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
app.get("/recipe/:id", async (request, response) => {
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
app.put("/recipe/:id", async (request, response) => {
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
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Delete a recipe
app.delete("/recipe/:id", async (request, response) => {
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

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
