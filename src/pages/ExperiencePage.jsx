import { Link, Outlet, useOutlet } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";

const players = {
  master: { email: "master@email.com", password: "master" },
  avventuriero: { email: "avventuriero@email.com", password: "avventuriero" },
  elenys: { email: "elenys@email.com", password: "elenys" },
  wigraas: { email: "wigraas@email.com", password: "wigraas" },
};

function Login() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const fullEmail = `${email}@email.com`;
      await signInWithEmailAndPassword(auth, fullEmail, password);
    } catch (err) {
      setError("Nome o password errati");
    }
  };

  const handleAutoLogin = async (player) => {
    try {
      const { email, password } = players[player];
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Errore durante il login automatico");
    }
  };

  if (user) {
    return (
      <div className="alert alert-success">
        Ciao, {user.email}! Sei loggato con successo.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center text-light">Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-center align-items-center mt-4 gap-3 mb-3">
        {Object.keys(players).map((player) => (
          <button
            key={player}
            className="btn btn-info fw-semibold"
            onClick={() => handleAutoLogin(player)}
          >
            {player.charAt(0).toUpperCase() + player.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function LogoutButton() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Utente disconnesso");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  let nomeGiocatore = user?.email?.split("@")[0];
  nomeGiocatore =
    nomeGiocatore.charAt(0).toUpperCase() + nomeGiocatore.slice(1);

  return (
    <div className="text-center">
      <div className="alert alert-success mb-3">
        Ciao, <strong>{nomeGiocatore}</strong>! 👋
      </div>
      <button className="btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default function ExperiencePage() {
  const { user } = useAuth();
  const outlet = useOutlet();

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
            Emporio di Sha-Zam
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
            {user ? <LogoutButton /> : <Login />}
          </section>
        </>
      )}

      <Outlet />
    </section>
  );
}
