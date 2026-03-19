import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadMatches } from "./store/matchesSlice";
import type { AppDispatch } from "./store/store";
import { AnimatePresence } from "framer-motion";
import MatchesPage from "./pages/MatchesPage";
import StandingsPage from "./pages/StandingsPage";
import MatchPage from "./pages/MatchPage";
import TeamPage from "./pages/TeamPage";
import NotFoundPage from "./pages/NotFoundPage";

function Nav() {
  const location = useLocation();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2.5rem",
        paddingBottom: "1rem",
        borderBottom: "0.5px solid #1a1a1a",
      }}
    >
      <div style={{ fontSize: "12px", letterSpacing: "0.15em", color: "#555" }}>
        PREMIER LEAGUE
      </div>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <Link
          to="/matches"
          style={{
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: location.pathname === "/matches" ? "#fff" : "#555",
            textDecoration: "none",
          }}
        >
          МАТЧИ
        </Link>
        <Link
          to="/standings"
          style={{
            fontSize: "12px",
            letterSpacing: "0.08em",
            color: location.pathname === "/standings" ? "#fff" : "#555",
            textDecoration: "none",
          }}
        >
          ТАБЛИЦА
        </Link>
      </div>
    </nav>
  );
}

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadMatches());
  }, [dispatch]);

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/standings" replace />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/match/:id" element={<MatchPage />} />
          <Route path="/team/:id" element={<TeamPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function Layout() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "3rem 2rem",
        minHeight: "100vh",
      }}
    >
      <AppContent />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
