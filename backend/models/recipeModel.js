import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    /*ingredients: {
      ingredient: String,
      amount: Number,
    },*/
    serves: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
