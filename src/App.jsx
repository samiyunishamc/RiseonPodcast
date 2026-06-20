import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EpisodesPage from "./pages/EpisodesPage";
import SessionsPage from "./pages/SessionsPage";
import GuestPage from "./pages/GuestPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="episodes" element={<EpisodesPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="guest" element={<GuestPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
