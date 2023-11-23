import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import DeleteRecipe from "./pages/DeleteRecipe";
import EditRecipe from "./pages/EditRecipe";
import ShowRecipe from "./pages/ShowRecipe";

const App = () => {
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/recipe/create" element={<CreateRecipe />}></Route>
    <Route path="/recipe/details/:id" element={<ShowRecipe />}></Route>
    <Route path="/recipe/edit/:id" element={<EditRecipe />}></Route>
    <Route path="/recipe/delete/:id" element={<DeleteRecipe />}></Route>
  </Routes>;
};

export default App;
