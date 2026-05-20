import api from "../services/api";
import { Link } from "react-router-dom";

function RecipeCard({ recipe, onDelete }) {
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Deseja remover esta receita?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/recipes/${recipe.id}`);

      onDelete(recipe.id);
    } catch (error) {
      console.error(error);

      alert("Erro ao remover receita");
    }
  }

  return (
    <div className="card h-100 shadow border-0 rounded-4">
      <img
        src={
          recipe.imagem ||
          "https://via.placeholder.com/300"
        }
        className="card-img-top"
        alt={recipe.nome}
        style={{
          height: "220px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="fw-bold">
          {recipe.nome}
        </h5>

        <p className="mb-2">
          Categoria: {recipe.categoria}
        </p>

        <p>
          Tempo: {recipe.tempo}
        </p>

        <Link
          to={`/edit/${recipe.id}`}
          className="btn btn-warning mb-2"
        >
          Editar
        </Link>
        
        <button
          className="btn btn-danger mt-auto"
          onClick={handleDelete}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;