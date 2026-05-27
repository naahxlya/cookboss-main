import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

function Profile() {

  const [recipesCount, setRecipesCount] =
    useState(0);

  const user = JSON.parse(
    localStorage.getItem(
      "cookboss_user"
    )
  );

  useEffect(() => {

    loadRecipes();

  }, []);

  async function loadRecipes() {

    try {

      const response =
        await api.get("/recipes");

      const userRecipes =
        response.data.filter(
          (recipe) =>

            Number(recipe.user_id) ===
            Number(user.id)
        );

      setRecipesCount(
        userRecipes.length
      );

    } catch (error) {

      console.error(error);
    }
  }

  return (
    <main className="container py-5">

      <div className="row justify-content-center">

        <div className="col-12 col-lg-8">

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

                <div className="col-md-6">

                  <div className="border rounded-4 p-4 h-100">

                    <p className="text-muted mb-2">

                      Email

                    </p>

                    <h5 className="fw-bold">

                      {user.email}

                    </h5>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="border rounded-4 p-4 h-100">

                    <p className="text-muted mb-2">

                      Receitas criadas

                    </p>

                    <h3 className="fw-bold text-warning">

                      {recipesCount}

                    </h3>

                  </div>

                </div>

              </div>

              <div className="mt-5 text-center">

                <p className="text-muted">

                  Continue criando receitas incríveis 🍰✨

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;