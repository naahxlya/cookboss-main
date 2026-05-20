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

      {recipes.length === 0 ? (
        <div className="text-center bg-warning bg-opacity-25 rounded-5 p-5">
          <h3 className="fw-bold">
            Nenhuma receita cadastrada ainda
          </h3>

          <p className="text-muted">
            Comece adicionando sua primeira receita ao CookBoss.
          </p>

          <Link
            to="/add"
            className="btn btn-warning rounded-pill px-4 fw-bold"
          >
            Adicionar Receita
          </Link>
        </div>
      ) : (
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
      )}
    </main>
  );
}

export default Recipes;