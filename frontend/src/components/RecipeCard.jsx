import { Link } from "react-router-dom";
import api from "../services/api";

function RecipeCard({ recipe, onDelete }) {

  async function handleDelete() {

    const confirmDelete = window.confirm(
      "Deseja remover esta receita?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/recipes/${recipe.id}`
      );

      onDelete(recipe.id);

    } catch (error) {

      console.error(error);

      alert("Erro ao remover receita");
    }
  }

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

      <Link
        to={`/recipe/${recipe.id}`}
        className="text-decoration-none"
      >

        <div
          style={{
            overflow: "hidden",
          }}
        >

          <img
            src={
              recipe.imagem
                ? `http://localhost:3001${recipe.imagem}`
                : "https://placehold.co/600x400/f1f1f1/999999?text=CookBoss"
            }

            alt={recipe.nome}

            className="card-img-top recipe-card-image"

            style={{
              height: "220px",
              objectFit: "cover",
            }}

            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x400/f1f1f1/999999?text=CookBoss";
            }}
          />

        </div>

      </Link>

      <div className="card-body d-flex flex-column p-4">

        <span className="badge bg-warning text-dark rounded-pill mb-3 align-self-start">
          {recipe.categoria}
        </span>

        <Link
          to={`/recipe/${recipe.id}`}
          className="text-decoration-none"
        >

          <h5 className="fw-bold mb-2 text-warning">
            {recipe.nome}
          </h5>

        </Link>

        <p className="text-muted mb-4">
          ⏱ {recipe.tempo}
        </p>

        <div className="d-flex gap-2 mt-auto">

          <Link
            to={`/edit/${recipe.id}`}
            className="btn btn-warning rounded-pill flex-fill fw-semibold"
          >
            Editar
          </Link>

          <button
            className="btn btn-outline-danger rounded-pill flex-fill fw-semibold"
            onClick={handleDelete}
          >
            Excluir
          </button>

        </div>

      </div>
    </div>
  );
}

export default RecipeCard;