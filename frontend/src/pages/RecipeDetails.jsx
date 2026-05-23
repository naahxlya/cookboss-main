import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function RecipeDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    loadRecipe();
  }, []);

  async function loadRecipe() {

    try {

      const response = await api.get("/recipes");

      const foundRecipe = response.data.find(
        (item) => item.id === Number(id)
      );

      setRecipe(foundRecipe);

    } catch (error) {

      console.error(error);
    }
  }

  if (!recipe) {

    return (
      <main className="container py-1 text-center">

        <h2>
          Receita não encontrada
        </h2>

      </main>
    );
  }

  return (
    <main className="container py-1">

      <div className="card border-0 shadow-lg rounded-5 overflow-hidden">

        <div className="p-4 p-lg-5">

           <button
            className="btn btn-outline-warning rounded-pill mb-4"
            onClick={() => navigate("/recipes")}
          >
            <i class="bi bi-arrow-left-short m-1"></i>
          </button>

          <div className="text-center mb-5">

            <img
              src={
                recipe.imagem
                  ? `http://localhost:3001${recipe.imagem}`
                  : "https://placehold.co/600x400/f1f1f1/999999?text=CookBoss"
              }

              alt={recipe.nome}

              className="img-fluid rounded-5 shadow-sm"

              style={{
                width: "100%",
                maxWidth: "700px",
                height: "320px",
                objectFit: "cover",
              }}

              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400/f1f1f1/999999?text=CookBoss";
              }}
            />

          </div>

          <div className="text-center mb-5">

            <span className="badge bg-warning text-dark rounded-pill mb-3 fs-6">
              {recipe.categoria}
            </span>

            <h1 className="fw-bold text-warning mb-3">
              {recipe.nome}
            </h1>

            <p className="fs-5 text-muted">
              <i class="bi bi-stopwatch m-1"></i> 
              Tempo de preparo: {recipe.tempo}
            </p>

          </div>

          <section className="mb-5">

            <h2 className="fw-bold mb-4 text-warning">
              Ingredientes
            </h2>

            <div className="recipe-details-box">

              <p
                className="mb-0"
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {
                  recipe.ingredientes ||
                  "Nenhum ingrediente informado."
                }
              </p>

            </div>

          </section>

          <section>

            <h2 className="fw-bold mb-4 text-warning">
              Modo de Preparo
            </h2>

            <div className="recipe-details-box">

              <p
                className="mb-0"
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {
                  recipe.modoPreparo ||
                  "Nenhum modo de preparo informado."
                }
              </p>

            </div>

          </section>

        </div>
      </div>
    </main>
  );
}

export default RecipeDetails;