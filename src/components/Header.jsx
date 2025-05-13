import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-neon-green">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          Aetheria
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/exp"} className="nav-link">
                Esperienza
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/bestiary"} className="nav-link">
                Bestiario
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
