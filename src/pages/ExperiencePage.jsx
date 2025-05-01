import { Link, Outlet, useOutlet } from "react-router-dom";

export default function ExperiencePage() {
  const outlet = useOutlet();

  return (
    <>
      <nav className="d-flex justify-content-center gap-3 my-3">
        <button type="button" className="btn btn-primary">
          <Link to="./log" className="text-dark text-decoration-none">
            Log
          </Link>
        </button>
        <button type="button" className="btn btn-primary">
          <Link to="./roll" className="text-dark text-decoration-none">
            Roll
          </Link>
        </button>
        <button type="button" className="btn btn-primary">
          <Link to="./shop" className="text-dark text-decoration-none">
            Shop
          </Link>
        </button>
        <button type="button" className="btn btn-primary">
          <Link to="/exp" className="text-dark text-decoration-none">
            Dashboard
          </Link>
        </button>
      </nav>

      {!outlet && (
        <>
          <section className="d-flex justify-content-center align-items-center my-5">
            <h1>Sei nella Dashboard, qui puoi fare alcune cose. Cosa? Boh!</h1>
          </section>
        </>
      )}

      <Outlet />
    </>
  );
}
