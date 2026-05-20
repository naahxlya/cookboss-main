import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <main className="container py-5">

      <div className="text-center mb-5">
        <span className="text-warning fw-bold">
          CookBoss
        </span>

        <h2 className="fw-bold mb-0">
          🍲 Todas as Receitas
        </h2>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center bg-warning bg-opacity-25 rounded-5 p-5">

          <h3 className="fw-bold">
            Nenhuma receita cadastrada ainda
          </h3>

          <p className="text-muted mb-4">
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