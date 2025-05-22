import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { useExperience } from "../contexts/ExperienceContext";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRef, useEffect } from "react";
import { useState } from "react";

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
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative">
      <button
        type="button"
        onClick={() => setShowPopover((prev) => !prev)}
        className="rounded-circle border-0 bg-transparent p-0"
        style={{ width: "50px", height: "50px", overflow: "hidden" }}
      >
        <img
          src="https://i.pravatar.cc/50"
          alt="Profile"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </button>

      {showPopover && (
        <div
          ref={popoverRef}
          className="popover bs-popover-bottom show position-absolute translate-middle-x"
          style={{
            top: "100%",
            left: "50%",
            zIndex: 9999,
            minWidth: "200px",
          }}
        >
          <div className="popover-arrow" />
          <div className="popover-body text-center">
            <p>
              <span>
                <strong>
                  {user.email.split("@")[0].charAt(0).toUpperCase() +
                    user.email.split("@")[0].slice(1)}
                </strong>
              </span>
            </p>
            <button className="btn btn-sm btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { user } = useAuth();

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
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
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <Link to={"/bestiary"} className="nav-link">
                  Tabella Creature
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/log"} className="nav-link">
                  Cronologia Esperienza
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/shop"} className="nav-link">
                  Shop dell'Esperienza
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/roll"} className="nav-link">
                  Ruota della Fortuna
                </Link>
              </li>
            </ul>
            {user ? <LogoutButton /> : <Login />}
          </div>
        </div>
      </nav>
    </header>
  );
}
