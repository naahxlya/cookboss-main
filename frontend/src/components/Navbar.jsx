import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">

        <Link
          className="navbar-brand fw-bold text-warning fs-3"
          to="/"
        >
          🍳 CookBoss
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

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;