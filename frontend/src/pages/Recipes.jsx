import { useEffect, useState } from "react";
import api from "../services/api";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadRecipes();
  }, []);

  async function loadRecipes() {
    try {
      const response = await api.get("/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  function handleDelete(id) {
    setRecipes((prevRecipes) =>
      prevRecipes.filter(
        (recipe) => recipe.id !== id
      )
    );
  }
  
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold text-warning">
        🍲 Todas as Receitas
      </h2>

      <div className="row g-4">
        {recipes.map((recipe) => (
          <div
            className="col-12 col-md-6 col-lg-4"
            key={recipe.id}
          >
            <RecipeCard
              recipe={recipe}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;