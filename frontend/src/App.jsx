import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";

function App() {

  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className="container mt-4">

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/recipes"
            element={
              <Recipes
                search={search}
              />
            }
          />

          <Route
            path="/add"
            element={<AddRecipe />}
          />

          <Route
            path="/edit/:id"
            element={<EditRecipe />}
          />

          <Route
            path="/recipe/:id"
            element={<RecipeDetails />}
          />

        </Routes>

      </div>

      <Footer />

    </BrowserRouter>
  );
}

export default App;