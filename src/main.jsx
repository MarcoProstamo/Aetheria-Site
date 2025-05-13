import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.jsx";
import { ShopContextProvider } from "./contexts/ShaZamShop.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ExperienceProvider } from "./contexts/ExperienceContext.jsx";
import { BestiaryContextProvider } from "./contexts/BestiaryContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BestiaryContextProvider>
      <ShopContextProvider>
        <ExperienceProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ExperienceProvider>
      </ShopContextProvider>
    </BestiaryContextProvider>
  </AuthProvider>
);
