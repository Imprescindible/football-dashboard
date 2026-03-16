import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "2rem",
      }}
    >
      {crumbs.map((crumb, i) => (
        <div
          key={i}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {i > 0 && <span style={{ fontSize: "11px", color: "#444" }}>›</span>}
          {crumb.to ? (
            <Link
              to={crumb.to}
              style={{
                fontSize: "11px",
                color: "#666",
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              {crumb.label}
            </Link>
          ) : (
            <span
              style={{
                fontSize: "11px",
                color: "#fff",
                letterSpacing: "0.08em",
              }}
            >
              {crumb.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
