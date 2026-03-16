import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../store/store";
import PageTransition from "../components/PageTransition";
import Breadcrumbs from "../components/Breadcrumbs";
import useWindowWidth from "../hooks/useWindowWidth";

type Filter = "all" | "home" | "away";

export default function TeamPage() {
  const { id } = useParams();
  const allMatches = useSelector((state: RootState) => state.matches.items);
  const status = useSelector((state: RootState) => state.matches.status);
  const [filter, setFilter] = useState<Filter>("all");
  const width = useWindowWidth();
  const isMobile = width < 600;

  if (status === "loading")
    return (
      <p style={{ color: "#888", fontSize: "13px", letterSpacing: "0.08em" }}>
        Загрузка...
      </p>
    );

  const teamId = Number(id);

  const teamMatches = allMatches.filter(
    (m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId,
  );

  if (teamMatches.length === 0)
    return <p style={{ color: "#888" }}>Команда не найдена</p>;

  const firstMatch = teamMatches[0];
  const team =
    firstMatch.homeTeam.id === teamId
      ? firstMatch.homeTeam
      : firstMatch.awayTeam;

  let wins = 0,
    draws = 0,
    losses = 0,
    goalsFor = 0,
    goalsAgainst = 0;

  teamMatches.forEach((match) => {
    const isHome = match.homeTeam.id === teamId;
    const scored = isHome
      ? match.score.fullTime.home
      : match.score.fullTime.away;
    const conceded = isHome
      ? match.score.fullTime.away
      : match.score.fullTime.home;
    if (scored !== null && conceded !== null) {
      goalsFor += scored;
      goalsAgainst += conceded;
      if (scored > conceded) wins++;
      else if (scored < conceded) losses++;
      else draws++;
    }
  });

  const lastFive = [...teamMatches]
    .filter((m) => {
      const isHome = m.homeTeam.id === teamId;
      const scored = isHome ? m.score.fullTime.home : m.score.fullTime.away;
      const conceded = isHome ? m.score.fullTime.away : m.score.fullTime.home;
      return scored !== null && conceded !== null;
    })
    .slice(-5);

  const filteredMatches = teamMatches.filter((match) => {
    if (filter === "home") return match.homeTeam.id === teamId;
    if (filter === "away") return match.awayTeam.id === teamId;
    return true;
  });

  return (
    <PageTransition>
      <div>
        <Breadcrumbs
          crumbs={[
            { label: "ТАБЛИЦА", to: "/standings" },
            { label: team.name.toUpperCase() },
          ]}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            marginBottom: "1.5rem",
          }}
        >
          {team.crest && (
            <img
              src={team.crest}
              alt={team.name}
              style={{
                width: isMobile ? "60px" : "80px",
                height: isMobile ? "60px" : "80px",
                objectFit: "contain",
              }}
            />
          )}
          <div>
            <div
              style={{
                fontSize: isMobile ? "22px" : "28px",
                fontWeight: 500,
                color: "#fff",
              }}
            >
              {team.name}
            </div>
            <div style={{ fontSize: "13px", color: "#666", marginTop: "6px" }}>
              {team.shortName}
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "12px" }}>
              {lastFive.map((match, i) => {
                const isHome = match.homeTeam.id === teamId;
                const scored = isHome
                  ? match.score.fullTime.home
                  : match.score.fullTime.away;
                const conceded = isHome
                  ? match.score.fullTime.away
                  : match.score.fullTime.home;
                let color = "#888";
                let letter = "Н";
                if (scored !== null && conceded !== null) {
                  if (scored > conceded) {
                    color = "#ffffff";
                    letter = "В";
                  } else if (scored < conceded) {
                    color = "#ff4d4d";
                    letter = "П";
                  } else {
                    color = "#e8ff3c";
                    letter = "Н";
                  }
                }
                return (
                  <div
                    key={i}
                    title={`${match.homeTeam.shortName} ${match.score.fullTime.home}:${match.score.fullTime.away} ${match.awayTeam.shortName}`}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background:
                        color === "#ffffff"
                          ? "rgba(255,255,255,0.15)"
                          : color === "#ff4d4d"
                            ? "rgba(255,77,77,0.15)"
                            : "rgba(232,255,60,0.15)",
                      border: `1.5px solid ${color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: color,
                    }}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)",
            gap: "1px",
            background: "#2a2a2a",
            border: "0.5px solid #2a2a2a",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "ПОБЕДЫ", value: wins, color: "#ffffff" },
            { label: "НИЧЬИ", value: draws, color: "#e8ff3c" },
            { label: "ПОРАЖЕНИЯ", value: losses, color: "#ff4d4d" },
            { label: "ЗАБИТО", value: goalsFor, color: "#fff" },
            { label: "ПРОПУЩЕНО", value: goalsAgainst, color: "#fff" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#0e0e0e",
                padding: isMobile ? "1rem 0.5rem" : "1.25rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "20px" : "24px",
                  fontWeight: 500,
                  color: stat.color,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: "#555",
                  letterSpacing: "0.08em",
                  marginTop: "6px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "6px", marginBottom: "2rem" }}>
          {(["all", "home", "away"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? "#e8ff3c" : "transparent",
                border: `0.5px solid ${filter === f ? "#e8ff3c" : "#2a2a2a"}`,
                borderRadius: "6px",
                padding: "4px 14px",
                color: filter === f ? "#000" : "#666",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: filter === f ? 500 : 400,
                letterSpacing: "0.08em",
              }}
            >
              {f === "all" ? "ВСЕ" : f === "home" ? "ДОМА" : "В ГОСТЯХ"}
            </button>
          ))}
        </div>

        <div style={{ borderTop: "0.5px solid #2a2a2a", paddingTop: "2rem" }}>
          <div
            style={{
              fontSize: "11px",
              color: "#666",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}
          >
            МАТЧИ СЕЗОНА 2023/24
          </div>

          {filteredMatches.map((match) => {
            const isHome = match.homeTeam.id === teamId;
            const scored = isHome
              ? match.score.fullTime.home
              : match.score.fullTime.away;
            const conceded = isHome
              ? match.score.fullTime.away
              : match.score.fullTime.home;
            const opponent = isHome ? match.awayTeam.name : match.homeTeam.name;
            const opponentShort = isHome
              ? match.awayTeam.shortName
              : match.homeTeam.shortName;

            let result = "–";
            let resultColor = "#666";
            if (scored !== null && conceded !== null) {
              if (scored > conceded) {
                result = "В";
                resultColor = "#ffffff";
              } else if (scored < conceded) {
                result = "П";
                resultColor = "#ff4d4d";
              } else {
                result = "Н";
                resultColor = "#e8ff3c";
              }
            }

            return (
              <Link
                to={`/match/${match.id}`}
                key={match.id}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "30px 1fr auto",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 0",
                    borderBottom: "0.5px solid #1a1a1a",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: resultColor,
                    }}
                  >
                    {result}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: isMobile ? "13px" : "15px",
                        color: "#fff",
                      }}
                    >
                      {isMobile ? opponentShort : opponent}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#555",
                        marginTop: "3px",
                      }}
                    >
                      {isHome ? "Дома" : "В гостях"} ·{" "}
                      {match.utcDate.slice(0, 10)}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "15px" : "18px",
                      fontWeight: 500,
                      color: resultColor,
                    }}
                  >
                    {scored ?? "–"} : {conceded ?? "–"}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
