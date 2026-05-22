import {
  Link,
  useNavigate,
} from "react-router-dom";

import logo from "../assets/logo-horizontal.svg";

function Navbar({
  search,
  setSearch,
  user,
  setUser,
}) {

  const navigate = useNavigate();

  function handleLogout() {

    localStorage.removeItem(
      "cookboss_user"
    );

    setUser(null);

    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-1">

      <div className="container">

        <Link
          className="navbar-brand fw-bold text-warning fs-3"
          to="/"
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
        >

          <span className="navbar-toggler-icon"></span>

        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <form className="d-flex mx-lg-4 my-3 my-lg-0 flex-grow-1">

            <input
              className="form-control rounded-pill px-4"
              type="search"
              placeholder="Buscar receitas..."
              value={search}

              onChange={(e) => {

                setSearch(
                  e.target.value
                );

                navigate("/recipes");
              }}
            />

          </form>

          <ul className="navbar-nav align-items-lg-center gap-2">

            <li className="nav-item">

              <Link
                className="nav-link fw-semibold"
                to="/"
              >
                Home
              </Link>

            </li>

            <li className="nav-item">

              <Link
                className="nav-link fw-semibold"
                to="/recipes"
              >
                Receitas
              </Link>

            </li>

            <li className="nav-item">

              <Link
                className="btn btn-warning fw-bold px-4 rounded-pill"
                to="/add"
              >
                + Nova Receita
              </Link>

            </li>

            {user && (

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
                    className="btn btn-outline-warning rounded-pill px-4 fw-bold"
                    onClick={handleLogout}
                  >
                    Sair
                  </button>

                </li>
              </>

            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;