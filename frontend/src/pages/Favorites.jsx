import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import api from "../services/api";

import RecipeCard from "../components/RecipeCard";

function Favorites() {

  const [favorites, setFavorites] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem(
      "cookboss_user"
    )
  );

  useEffect(() => {

    loadFavorites();

  }, []);

  async function loadFavorites() {

    try {

      const response =
        await api.get(
          `/favorites?user_id=${user.id}`
        );

      setFavorites(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao carregar favoritos"
      );
    }
  }

  function handleDelete(id) {

    setFavorites((prevFavorites) =>
      prevFavorites.filter(
        (recipe) =>
          recipe.id !== id
      )
    );
  }

  return (
    <main className="container py-5">

      <div className="text-center mb-5">

        

        <h2 className="fw-bold mb-0">
          ❤️ Minhas Receitas Favoritas
        </h2>

      </div>

      {favorites.length === 0 ? (

        <div className="text-center bg-warning bg-opacity-25 rounded-5 p-5">

          <h3 className="fw-bold">
            Nenhuma receita favorita ainda
          </h3>

          <p className="text-muted mb-4">
            Favorite receitas para encontrá-las rapidamente depois.
          </p>

          <Link
            to="/recipes"
            className="btn btn-warning rounded-pill px-4 fw-bold"
          >
            Ver Receitas
          </Link>

        </div>

      ) : (

        <div className="row g-4">

          {favorites.map((recipe) => (

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

export default Favorites;