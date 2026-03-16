import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import PageTransition from "../components/PageTransition";
import Breadcrumbs from "../components/Breadcrumbs";
import useWindowWidth from "../hooks/useWindowWidth";

export default function MatchPage() {
  const { id } = useParams();
  const width = useWindowWidth();
  const isMobile = width < 600;

  const match = useSelector((state: RootState) =>
    state.matches.items.find((m) => String(m.id) === id),
  );

  if (!match) return <p style={{ color: "#888" }}>Матч не найден</p>;

  return (
    <PageTransition>
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "МАТЧИ", to: "/" },
            {
              label: `${match.homeTeam.shortName} — ${match.awayTeam.shortName}`,
            },
          ]}
        />

        <div
          style={{
            marginTop: "2.5rem",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#666",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}
          >
            {match.utcDate.slice(0, 10)}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: isMobile ? "0.75rem" : "2rem",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <Link
                to={`/team/${match.homeTeam.id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={match.homeTeam.crest}
                  alt={match.homeTeam.name}
                  style={{
                    width: isMobile ? "40px" : "60px",
                    height: isMobile ? "40px" : "60px",
                    objectFit: "contain",
                    marginBottom: "12px",
                  }}
                />
                <div
                  style={{
                    fontSize: isMobile ? "16px" : "28px",
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {isMobile ? match.homeTeam.shortName : match.homeTeam.name}
                </div>
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "32px" : "48px",
                  fontWeight: 500,
                  color: "#e8ff3c",
                  letterSpacing: "0.05em",
                }}
              >
                {match.score.fullTime.home ?? "–"} :{" "}
                {match.score.fullTime.away ?? "–"}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#666",
                  letterSpacing: "0.1em",
                }}
              >
                {match.status}
              </div>
            </div>

            <div>
              <Link
                to={`/team/${match.awayTeam.id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={match.awayTeam.crest}
                  alt={match.awayTeam.name}
                  style={{
                    width: isMobile ? "40px" : "60px",
                    height: isMobile ? "40px" : "60px",
                    objectFit: "contain",
                    marginBottom: "12px",
                  }}
                />
                <div
                  style={{
                    fontSize: isMobile ? "16px" : "28px",
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {isMobile ? match.awayTeam.shortName : match.awayTeam.name}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
