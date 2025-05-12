import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.jsx";
import { ShopContextProvider } from "./contexts/ShaZamShop.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ShopContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ShopContextProvider>
    </AuthProvider>
  </StrictMode>
);
