import {
  Link,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import { confirmDialog } from "../utils/confirmDialog";

function RecipeCard({
  recipe,
  onDelete,
}) {

  const [isFavorite, setIsFavorite] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem(
      "cookboss_user"
    )
  );

  useEffect(() => {

    checkFavorite();

  }, []);

  async function checkFavorite() {

    if (!user) return;

    try {

      const response =
        await api.get(
          `/favorites/check?user_id=${user.id}&recipe_id=${recipe.id}`
        );

      setIsFavorite(
        response.data.isFavorite
      );

    } catch (error) {

      console.error(error);
    }
  }

  async function handleFavorite() {

    if (!user) {

      alert(
        "Faça login para favoritar receitas"
      );

      return;
    }

    try {

      if (isFavorite) {

        await api.delete(
          `/favorites?user_id=${user.id}&recipe_id=${recipe.id}`
        );

        setIsFavorite(false);

        alert(
          "Receita removida dos favoritos"
        );

      } else {

        await api.post(
          "/favorites",
          {
            user_id:
              user.id,

            recipe_id:
              recipe.id,
          }
        );

        setIsFavorite(true);

        alert(
          "Receita adicionada aos favoritos"
        );
      }

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao atualizar favorito"
      );
    }
  }

  async function handleDelete() {

    const confirmed =
      await confirmDialog({
        title:
          "Remover receita?",
        text:
          "Tem certeza que deseja remover esta receita?",
        confirmButtonText:
          "Sim, remover",
        cancelButtonText:
          "Não, cancelar",
        icon:
          "warning",
      });

    if (!confirmed) return;

    try {

      await api.delete(
        `/recipes/${recipe.id}?user_id=${user.id}`
      );

      onDelete(recipe.id);

      alert(
        "Receita removida com sucesso"
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Erro ao remover receita"
      );
    }
  }

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

      <div className="position-relative">

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

        <button
          type="button"
          className="btn btn-light rounded-circle position-absolute shadow-sm d-flex align-items-center justify-content-center"
          onClick={handleFavorite}
          style={{
            top: "12px",
            right: "12px",
            width: "42px",
            height: "42px",
          }}
          aria-label="Favoritar receita"
        >

          <i
            className={
              isFavorite
                ? "bi bi-heart-fill text-danger"
                : "bi bi-heart text-danger"
            }
          ></i>

        </button>

      </div>

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