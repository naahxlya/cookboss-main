import {
  Link,
  useNavigate,
} from "react-router-dom";

import categories from "../data/categories";

import logo from "../assets/logo.svg";

function Home({
  setSelectedCategory,
}) {

  const navigate =
    useNavigate();

  const categoryData = {
    "Café da manhã": {
      icon: "🥞",
      description:
        "Receitas rápidas para começar bem o dia.",
    },

    "Prato principal": {
      icon: "🍛",
      description:
        "Pratos completos para qualquer ocasião.",
    },

    "Sobremesas": {
      icon: "🍰",
      description:
        "Doces, bolos e pequenas alegrias açucaradas.",
    },

    "Sopas": {
      icon: "🥣",
      description:
        "Receitas quentinhas e aconchegantes.",
    },

    "Assados": {
      icon: "🥧",
      description:
        "Pratos dourados e irresistíveis.",
    },

    "Massas": {
      icon: "🍝",
      description:
        "Massas clássicas para todos os gostos.",
    },

    "Bebidas": {
      icon: "🥤",
      description:
        "Sucos, cafés e bebidas especiais.",
    },

    "Saudáveis": {
      icon: "🥗",
      description:
        "Opções leves, práticas e equilibradas.",
    },

    "Diversos": {
      icon: "🍴",
      description:
        "Outras receitas especiais do CookBoss.",
    },
  };

  function handleCategoryClick(category) {

    setSelectedCategory(category);

    navigate("/recipes");
  }

  function handleAllRecipesClick() {

    setSelectedCategory("");

    navigate("/recipes");
  }

  return (
    <main>

      <section className="container py-1">

        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <span className="badge bg-warning text-dark rounded-pill px-3 py-2 mb-3">
              <i className="bi bi-journals m-1"></i>
              Seu livro de receitas digital
            </span>

            <h1 className="display-4 fw-bold mb-4">
              Organize suas receitas favoritas em um só lugar
            </h1>

            <p className="lead text-muted mb-4">
              Cadastre, edite, explore e gerencie receitas de forma simples,
              bonita e prática com o CookBoss.
            </p>

            <div className="d-flex flex-wrap gap-3">

              <button
                type="button"
                className="btn btn-warning btn-lg rounded-pill px-5 fw-bold"
                onClick={handleAllRecipesClick}
              >
                <i className="bi bi-egg-fried m-2"></i>
                Ver Receitas
              </button>

              <Link
                to="/add"
                className="btn btn-outline-warning btn-lg rounded-pill px-5 fw-bolder"
              >
                + Nova Receita
              </Link>

            </div>

          </div>

          <div className="col-lg-6">

            <div className="card border-0 shadow-lg rounded-5 overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1605851868183-7a4de52117fa?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Prato de comida saudável"
                className="img-fluid"
                style={{
                  height: "405px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />

            </div>

          </div>

        </div>

      </section>

      <section className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <span className="text-warning fw-bold">
              Categorias
            </span>

            <h2 className="fw-bold mb-0">
              Escolha pelo tipo de receita
            </h2>

          </div>

          <button
            type="button"
            className="btn btn-link text-warning fw-bold text-decoration-none"
            onClick={handleAllRecipesClick}
          >
            Ver todas
            <i className="bi bi-caret-right-fill m-1"></i>
          </button>

        </div>

        <div className="row g-4">

          {categories.map((category) => (

            <div
              key={category}
              className="col-12 col-md-6 col-lg-4"
            >

              <div
                className="card border-0 shadow-sm rounded-4 p-3 h-100 category-card"
                role="button"
                onClick={() =>
                  handleCategoryClick(category)
                }
              >

                <div className="fs-1 mb-0">
                  {categoryData[category]?.icon || "🍴"}
                </div>

                <h5 className="fw-bold">
                  {category}
                </h5>

                <p className="text-muted mb-0">
                  {
                    categoryData[category]?.description ||
                    "Receitas especiais do CookBoss."
                  }
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      <section className="container py-5">

        <div className="rounded-5 card-footer bg-opacity-25 p-4 text-center">

          <h2 className="fw-bold mb-3">
            Transforme sua cozinha em um painel de receitas inteligente ✨
          </h2>

          <p className="text-muted mb-4">
            O CookBoss foi criado para facilitar o cadastro, a busca e a
            organização das suas receitas preferidas.
          </p>

          <Link
            to="/add"
            className="btn btn-warning rounded-pill px-5 fw-bold"
          >
            <i className="bi bi-plus m-1"></i>
            Cadastrar minha primeira receita
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;