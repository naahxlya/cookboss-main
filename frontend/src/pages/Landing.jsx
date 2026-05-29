import {
  Link,
} from "react-router-dom";

import logo from "../assets/logo-bg.svg";

function Landing() {

  return (
    <main className="min-vh-100">

      <section
        className="py-5"
        style={{
          background:
            "linear-gradient(135deg, #fff7d9 0%, #ffe990 45%, #fff3bd 100%)",
        }}
      >

        <div className="container py-1">

          <div className="row align-items-center g-5">

            <div className="col-12 col-lg-6">

              <img
                src={logo}
                alt="CookBoss"
                className="mb-3"
                style={{
                  width: "230px",
                  maxWidth: "100%",
                }}
              />

              <h1 className="display-4 fw-bold mb-4">

                Organize suas receitas favoritas
                de um jeito simples, rápido e prático

              </h1>

              <p className="lead text-muted mb-4">

                O CookBoss foi criado para quem quer guardar receitas,
                encontrar preparos rapidamente, favoritar pratos especiais
                e manter tudo organizado em um só lugar.

              </p>

              <div className="d-flex flex-column flex-sm-row gap-3">

                <Link
                  to="/register"
                  className="btn btn-warning btn-lg rounded-pill px-5 fw-bold"
                >
                    <i class="bi bi-box-arrow-in-right mx-2"></i>
                  Registrar-se
                </Link>

                <Link
                  to="/login"
                  className="btn btn-outline-warning btn-lg rounded-pill px-5 fw-bold"
                >
                    <i class="bi bi-box-arrow-in-left mx-2"></i>
                  Entrar
                </Link>

              </div>

            </div>

            <div className="col-12 col-lg-6">

              <div
                className="rounded-5 p-4 shadow-lg position-relative"
                style={{
                  background:
                    "rgba(255, 255, 255, 0.55)",
                  backdropFilter:
                    "blur(8px)",
                }}
              >

                <img
                  src="https://images.unsplash.com/photo-1531240062960-4842b265a1ad?q=80&w=641&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Receita organizada"
                  className="img-fluid rounded-5 shadow-sm"
                  style={{
                    width: "100%",
                    height: "430px",
                    objectFit: "cover",
                  }}
                />

                <div
                  className="bg-white rounded-4 shadow p-3 position-absolute d-none d-md-block"
                  style={{
                    left: "-20px",
                    bottom: "40px",
                    maxWidth: "250px",
                  }}
                >

                  <div className="d-flex align-items-center gap-3">

                    <div
                      className="bg-opacity-25 d-flex align-items-center justify-content-center"
                      style={{
                        width: "54px",
                        height: "54px",
                        fontSize: "1.5rem",
                      }}
                    >
                      <i class="bi bi-heart-fill"></i>
                    </div>

                    <div>

                      <h6 className="fw-bold mb-1">
                        Favoritos
                      </h6>

                      <p className="text-muted small mb-0">
                        Salve receitas especiais para acessar depois.
                      </p>

                    </div>

                  </div>

                </div>

                <div
                  className="bg-white rounded-4 shadow p-3 position-absolute d-none d-md-block"
                  style={{
                    right: "-15px",
                    top: "35px",
                    maxWidth: "250px",
                  }}
                >

                  <div className="d-flex align-items-center gap-3">

                    <div
                      className="bg-opacity-25 d-flex align-items-center justify-content-center"
                      style={{
                        width: "54px",
                        height: "54px",
                        fontSize: "1.5rem",
                      }}
                    >
                      <i class="bi bi-journal"></i>
                    </div>

                    <div>

                      <h6 className="fw-bold mb-1">
                        Livro digital
                      </h6>

                      <p className="text-muted small mb-0">
                        Suas receitas organizadas no seu perfil.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="container py-5">

        <div className="text-center mb-5">

          <span className="text-warning fw-bold">
            Funcionalidades
          </span>

          <h2 className="fw-bold mt-2">
            Tudo que você precisa para cuidar das suas receitas
          </h2>

          <p className="text-muted">
            O CookBoss reúne organização, praticidade e uma pitada de charme culinário.
          </p>

        </div>

        <div className="row g-4">

          <div className="col-12 col-md-4">

            <div className="card border-0 shadow-sm rounded-5 h-100 p-4 text-center">

              <div className="text-warning display-4 mb-3">
                <i class="bi bi-journal-bookmark-fill"></i>
              </div>

              <h4 className="fw-bold">
                Cadastre receitas
              </h4>

              <p className="text-muted mb-0">
                Salve nome, categoria, tempo, ingredientes,
                modo de preparo e imagem.
              </p>

            </div>

          </div>

          <div className="col-12 col-md-4">

            <div className="card border-0 shadow-sm rounded-5 h-100 p-4 text-center">

              <div className="display-4 mb-3">
                <i class="text-warning bi bi-search-heart-fill"></i>
              </div>

              <h4 className="fw-bold">
                Encontre rápido
              </h4>

              <p className="text-muted mb-0">
                Use busca e categorias para encontrar
                suas receitas sem perder tempo.
              </p>

            </div>

          </div>

          <div className="col-12 col-md-4">

            <div className="card border-0 shadow-sm rounded-5 h-100 p-4 text-center">

              <div className="display-4 mb-3">
                <i class="text-warning bi bi-heart-fill"></i>
              </div>

              <h4 className="fw-bold">
                Favorite receitas
              </h4>

              <p className="text-muted mb-0">
                Guarde suas receitas preferidas em uma área especial.
              </p>

            </div>

          </div>

        </div>

      </section>

      <section className="container py-5">

        <div
          className="rounded-5 p-5 text-center shadow-sm"
          style={{
            background:
              "linear-gradient(135deg, #f7a10e, #b48100)",
          }}
        >

          <h2 className="fw-bold text-white mb-3">
            Pronta para montar seu livro de receitas?
          </h2>

          <p className="text-white fs-5 mb-4">
            Crie sua conta gratuitamente e comece a organizar suas receitas no CookBoss.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">

            <Link
              to="/register"
              className="btn btn-light rounded-pill px-5 fw-bold text-warning"
            >
                <i class="bi bi-box-arrow-in-right mx-2"></i>
              Registrar-se
            </Link>

            <Link
              to="/login"
              className="btn btn-outline-light rounded-pill px-5 fw-bold"
            >
                <i class="bi bi-box-arrow-in-left mx-2"></i>
              Entrar
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Landing;