import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import api from "../services/api";

import RecipeCard from "../components/RecipeCard";

import logo from "../assets/logo.svg";

function Recipes({
  search,
  selectedCategory,
}) {

  const [recipes, setRecipes] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem(
      "cookboss_user"
    )
  );

  useEffect(() => {

    loadRecipes();

  }, []);

  async function loadRecipes() {

    if (!user) return;

    try {

      const response =
        await api.get(
          `/recipes?user_id=${user.id}`
        );

      setRecipes(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao carregar receitas"
      );
    }
  }

  function handleDelete(id) {

    setRecipes((prevRecipes) =>
      prevRecipes.filter(
        (recipe) =>
          recipe.id !== id
      )
    );
  }

  const filteredRecipes =
    recipes.filter((recipe) => {

      const searchText =
        search.toLowerCase();

      const recipeName =
        String(recipe.nome || "")
          .toLowerCase();

      const recipeCategory =
        String(recipe.categoria || "")
          .toLowerCase();

      const matchesSearch =
        recipeName.includes(searchText) ||
        recipeCategory.includes(searchText);

      const matchesCategory =
        selectedCategory === ""
          ? true
          : recipe.categoria === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <main className="container py-1">

      <div className="text-center mb-5">

        <img
          src={logo}
          alt="CookBoss"
          style={{
            height: "80px",
            objectFit: "contain",
          }}
        />

        <h2 className="fw-bold mb-0">
          Todas as Receitas
        </h2>

        {selectedCategory && (

          <p className="text-muted mt-3">

            Categoria selecionada:
            <span className="fw-bold text-warning ms-2">
              {selectedCategory}
            </span>

          </p>

        )}

      </div>

      {filteredRecipes.length === 0 ? (

        <div className="text-center card-footer bg-opacity-25 rounded-5 p-5">

          <h3 className="fw-bold">
            Nenhuma receita encontrada
          </h3>

          <p className="text-muted mb-4">
            Tente buscar outro nome
            ou categoria.
          </p>

          <Link
            to="/add"
            className="btn btn-warning rounded-pill px-4 fw-bold"
          >
            <i className="bi bi-plus m-1"></i>
            Adicionar Receita
          </Link>

        </div>

      ) : (

        <div className="row g-4">

          {filteredRecipes.map((recipe) => (

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