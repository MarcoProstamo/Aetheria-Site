import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { useExperience } from "../contexts/ExperienceContext";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";

const players = {
  master: { email: "master@email.com", password: "master" },
  avventuriero: { email: "avventuriero@email.com", password: "avventuriero" },
  elenys: { email: "elenys@email.com", password: "elenys" },
  wigraas: { email: "wigraas@email.com", password: "wigraas" },
};

function Login() {
  const handleAutoLogin = async (player) => {
    const { email, password } = players[player];
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-3">
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
  );
}

function LogoutButton() {
  const { user } = useAuth();
  const { totalExp } = useExperience();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  let nomeGiocatore = user?.email?.split("@")[0];
  nomeGiocatore =
    nomeGiocatore.charAt(0).toUpperCase() + nomeGiocatore.slice(1);

  return (
    <div className="text-center d-flex gap-3 align-items-center">
      <div className="alert alert-success m-0 py-1 px-3">
        Ciao, <strong>{nomeGiocatore}</strong>! 👋
      </div>
      <button className="btn btn-secondary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default function Header() {
  const { user } = useAuth();

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
              <Link to={"/exp/roll"} className="nav-link">
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

        {user ? <LogoutButton /> : <Login />}
      </div>
    </nav>
  );
}
