import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import api from "../services/api";

function Profile() {

  const [recipesCount, setRecipesCount] =
    useState(0);

  const [favoritesCount, setFavoritesCount] =
    useState(0);

  const user = JSON.parse(
    localStorage.getItem(
      "cookboss_user"
    )
  );

  useEffect(() => {

    loadProfileData();

  }, []);

  async function loadProfileData() {

    try {

      const recipesResponse =
        await api.get(
          `/recipes?user_id=${user.id}`
        );

      setRecipesCount(
        recipesResponse.data.length
      );

      const favoritesResponse =
        await api.get(
          `/favorites?user_id=${user.id}`
        );

      setFavoritesCount(
        favoritesResponse.data.length
      );

    } catch (error) {

      console.error(error);

      alert(
        "Erro ao carregar dados do perfil"
      );
    }
  }

  return (
    <main className="container py-5">

      <div className="row justify-content-center">

        <div className="col-12 col-lg-9">

          <div className="card border-0 shadow-lg rounded-5 overflow-hidden">

            <div
              className="p-5 text-center"
              style={{
                background:
                  "linear-gradient(135deg, #f7a10e, #ffd978)",
              }}
            >

              <div
                className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto shadow"
                style={{
                  width: "120px",
                  height: "120px",
                  fontSize: "3rem",
                }}
              >

                👨‍🍳

              </div>

              <h1 className="fw-bold mt-4 text-white">

                Meu Perfil

              </h1>

              <p className="text-white mb-0">

                Bem-vindo ao CookBoss ✨

              </p>

            </div>

            <div className="card-body p-5">

              <div className="row g-4">

                <div className="col-md-4">

                  <div className="border rounded-4 p-4 h-100">

                    <p className="text-muted mb-2">

                      Email

                    </p>

                    <h5 className="fw-bold text-break">

                      {user.email}

                    </h5>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="border rounded-4 p-4 h-100 text-center">

                    <p className="text-muted mb-2">

                      Receitas criadas

                    </p>

                    <h3 className="fw-bold text-warning">

                      {recipesCount}

                    </h3>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="border rounded-4 p-4 h-100 text-center">

                    <p className="text-muted mb-2">

                      Receitas favoritas

                    </p>

                    <h3 className="fw-bold text-danger">

                      {favoritesCount}

                    </h3>

                  </div>

                </div>

              </div>

              <div className="mt-5 text-center">

                <p className="text-muted">

                  Continue criando e salvando suas receitas favoritas 🍰✨

                </p>

                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4">

                  <Link
                    to="/add"
                    className="btn btn-warning rounded-pill px-4 fw-bold"
                  >
                    + Nova Receita
                  </Link>

                  <Link
                    to="/favorites"
                    className="btn btn-outline-danger rounded-pill px-4 fw-bold"
                  >
                    <i className="bi bi-heart-fill me-2"></i>
                    Ver Favoritos
                  </Link>

                  <Link
                    to="/recipes"
                    className="btn btn-outline-warning rounded-pill px-4 fw-bold"
                  >
                    <i class="bi bi-egg-fried m-1"></i>
                    Ver Minhas Receitas
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;