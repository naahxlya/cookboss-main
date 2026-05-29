import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo-horizontal.svg";

import { confirmDialog } from "../utils/confirmDialog";

function Navbar({
  search,
  setSearch,

  user,
  setUser,

  setSelectedCategory,
}) {

  const navigate =
    useNavigate();

  async function handleLogout() {

    const confirmed =
      await confirmDialog({
        title:
          "Sair da conta?",
        text:
          "Tem certeza que deseja sair?",
        confirmButtonText:
          "Sim, sair",
        cancelButtonText:
          "Não, ficar",
        icon:
          "question",
      });

    if (!confirmed) return;

    localStorage.removeItem(
      "cookboss_user"
    );

    setUser(null);

    alert(
      "Você saiu da conta"
    );

    navigate("/login");
  }

  function handleRecipesClick() {

    setSelectedCategory("");

    navigate("/recipes");
  }

  function handleSearchChange(e) {

    setSearch(
      e.target.value
    );

    setSelectedCategory("");

    navigate("/recipes");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-1">

      <div className="container">

        <Link
          className="navbar-brand fw-bold text-warning fs-3"
          to="/home"
        >

          <img
            src={logo}
            alt="CookBoss"
            style={{
              height: "60px",
              objectFit: "contain",
            }}
          />

        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Abrir menu"
        >

          <span className="navbar-toggler-icon"></span>

        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <form
            className="d-flex mx-lg-4 my-3 my-lg-0 flex-grow-1"
            onSubmit={(e) =>
              e.preventDefault()
            }
          >

            <input
              className="form-control rounded-pill px-4"
              type="search"
              placeholder="Buscar receitas..."
              value={search}
              onChange={handleSearchChange}
            />

          </form>

          <ul className="navbar-nav align-items-lg-center gap-2">

            {user && (

              <li className="nav-item">

                <Link
                  className="btn btn-warning fw-bold px-4 rounded-pill"
                  to="/add"
                >
                  + Nova Receita
                </Link>

              </li>

            )}

            <li className="nav-item">

              <Link
                className="nav-link fw-semibold"
                to="/home"
              >
                Home
              </Link>

            </li>

            <li className="nav-item">

              <button
                type="button"
                className="nav-link fw-semibold btn btn-link text-decoration-none"
                onClick={handleRecipesClick}
              >
                Receitas
              </button>

            </li>

            {user && (

              <li className="nav-item">

                <Link
                  className="nav-link fw-semibold"
                  to="/favorites"
                >
                  Favoritos
                </Link>

              </li>

            )}

            {user ? (

              <>

                <li className="nav-item">

                  <Link
                    className="nav-link fw-semibold"
                    to="/profile"
                  >
                    Perfil
                  </Link>

                </li>

                <li className="nav-item">

                  <button
                    type="button"
                    className="nav-link fw-semibold"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Sair
                  </button>

                </li>

              </>

            ) : (

              <li className="nav-item">

                <Link
                  className="btn btn-outline-warning rounded-pill px-4 fw-bold"
                  to="/login"
                >
                  Entrar
                </Link>

              </li>

            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;