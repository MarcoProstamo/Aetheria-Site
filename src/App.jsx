import { Routes, Route } from "react-router-dom";
import PagesLayout from "./layouts/PagesLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExperiencePage from "./pages/ExperiencePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<PagesLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/exp" element={<ExperiencePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
