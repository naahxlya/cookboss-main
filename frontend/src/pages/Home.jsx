import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="badge bg-warning text-dark rounded-pill px-3 py-2 mb-3">
              🍳 Seu livro de receitas digital
            </span>

            <h1 className="display-4 fw-bold mb-4">
              Organize suas receitas favoritas em um só lugar
            </h1>

            <p className="lead text-muted mb-4">
              Cadastre, edite, explore e gerencie receitas de forma simples,
              bonita e prática com o CookBoss.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link
                to="/recipes"
                className="btn btn-warning btn-lg rounded-pill px-5 fw-bold"
              >
                Ver Receitas
              </Link>

              <Link
                to="/add"
                className="btn btn-outline-warning btn-lg rounded-pill px-5 fw-bold"
              >
                Nova Receita
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                alt="Prato de comida saudável"
                className="img-fluid"
                style={{
                  height: "420px",
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

          <Link
            to="/recipes"
            className="text-warning fw-bold text-decoration-none"
          >
            Ver todas →
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-3">
            <Link to="/recipes" className="text-decoration-none text-dark">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 category-card">
                <div className="fs-1 mb-3">🥞</div>

                <h5 className="fw-bold">
                  Café da manhã
                </h5>

                <p className="text-muted mb-0">
                  Receitas rápidas para começar bem o dia.
                </p>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <Link to="/recipes" className="text-decoration-none text-dark">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 category-card">
                <div className="fs-1 mb-3">🍝</div>

                <h5 className="fw-bold">
                  Almoço
                </h5>

                <p className="text-muted mb-0">
                  Pratos completos para o dia a dia.
                </p>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <Link to="/recipes" className="text-decoration-none text-dark">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 category-card">
                <div className="fs-1 mb-3">🍰</div>

                <h5 className="fw-bold">
                  Sobremesas
                </h5>

                <p className="text-muted mb-0">
                  Doces, bolos e pequenas alegrias açucaradas.
                </p>
              </div>
            </Link>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <Link to="/recipes" className="text-decoration-none text-dark">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 category-card">
                <div className="fs-1 mb-3">🥗</div>

                <h5 className="fw-bold">
                  Saudáveis
                </h5>

                <p className="text-muted mb-0">
                  Opções leves, práticas e equilibradas.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="rounded-5 bg-warning bg-opacity-25 p-5 text-center">
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
            Cadastrar minha primeira receita
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;