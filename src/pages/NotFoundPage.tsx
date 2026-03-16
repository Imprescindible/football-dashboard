import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          textAlign: "center",
          gap: "1rem",
        }}
      >
        <div style={{ fontSize: "72px", fontWeight: 500, color: "#e8ff3c" }}>
          404
        </div>
        <div
          style={{ fontSize: "13px", color: "#666", letterSpacing: "0.1em" }}
        >
          СТРАНИЦА НЕ НАЙДЕНА
        </div>
        <Link
          to="/"
          style={{
            marginTop: "1rem",
            fontSize: "11px",
            color: "#666",
            letterSpacing: "0.08em",
            textDecoration: "none",
            border: "0.5px solid #2a2a2a",
            borderRadius: "8px",
            padding: "8px 16px",
          }}
        >
          ← НА ГЛАВНУЮ
        </Link>
      </div>
    </PageTransition>
  );
}
