import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Upcoming from "./components/Upcoming";
import PodcastList from "./components/PodcastList";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import AdminPage from "./pages/AdminPage";

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const isAdmin = currentPath === "/admin";

  if (isAdmin) {
    return <AdminPage />;
  }

  return (
    <div className="site-shell min-h-screen">
      <Navbar />
      <main className="site-main">
        <Hero />
        <About />
        <Upcoming />
        <PodcastList />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
