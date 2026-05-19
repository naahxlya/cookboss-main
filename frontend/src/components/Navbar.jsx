import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning px-4">
      <Link className="navbar-brand fw-bold" to="/">
        CookBoss
      </Link>

      <div className="navbar-nav">
        <Link className="nav-link text-dark" to="/">
          Home
        </Link>
        <Link className="nav-link text-dark" to="/recipes">
          Receitas
        </Link>
        <Link className="nav-link text-dark" to="/add">
          Adicionar
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;