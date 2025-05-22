import { Routes, Route } from "react-router-dom";
import PagesLayout from "./layouts/PagesLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ExperienceShopPage from "./pages/ExperienceShopPage.jsx";
import ExperienceLogPage from "./pages/ExperienceLogPage.jsx";
import ExperienceRollPage from "./pages/ExperienceRollPage.jsx";
import BestiaryPage from "./pages/BestiaryPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<PagesLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/log" element={<ExperienceLogPage />} />
        <Route path="/shop" element={<ExperienceShopPage />} />
        <Route path="/roll" element={<ExperienceRollPage />} />
        <Route path="/bestiary" element={<BestiaryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
