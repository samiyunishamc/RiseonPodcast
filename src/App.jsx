import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const EpisodesPage = lazy(() => import("./pages/EpisodesPage"));
const SessionsPage = lazy(() => import("./pages/SessionsPage"));
const GuestPage = lazy(() => import("./pages/GuestPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

const PageLoader = () => (
  <div className="site-container section-space flex items-center justify-center" aria-live="polite" aria-busy="true">
    <div className="stat-card" style={{ padding: "2rem 3rem" }}>
      <div className="waveform waveform--hero" aria-hidden="true">
        {[...Array(5)].map((_, i) => <span key={i} />)}
      </div>
      <p className="text-sm font-semibold mt-4 text-center" style={{ color: "var(--muted)" }}>Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
