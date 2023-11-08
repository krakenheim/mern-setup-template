import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Recipe } from "./models/recipeModel.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("This is a MERN Template.");
});

// Route to save a new Recipe
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.date ||
      !request.body.serves
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, date, serves",
      });
    }
    const newRecipe = {
      title: request.body.title,
      author: request.body.author,
      date: request.body.date,
      serves: request.body.serves,
    };

    const recipe = await Recipe.create(newRecipe);

    return response.status(201).send(recipe);
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
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
