import { Link, Outlet } from "react-router-dom";

export default function ExperiencePage() {
  return (
    <section>
      <nav className="d-flex justify-content-center gap-3 my-3">
        <button type="button" className="btn btn-primary">
          <Link to="./log" className="text-dark text-decoration-none">
            Cronologia Esperienza
          </Link>
        </button>
        <button type="button" className="btn btn-primary">
          <Link to="./roll" className="text-dark text-decoration-none">
            Ruota di Jaamal
          </Link>
        </button>
        <button type="button" className="btn btn-primary">
          <Link to="./shop" className="text-dark text-decoration-none">
            Shop
          </Link>
        </button>
      </nav>
      <Outlet />
    </section>
  );
}
