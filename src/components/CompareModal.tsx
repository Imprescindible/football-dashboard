import { useState } from "react";
import type { Match } from "../store/matchesSlice";

interface Props {
  onClose: () => void;
  matches: Match[];
}

const TEAMS = [
  { id: 65, name: "Manchester City" },
  { id: 57, name: "Arsenal" },
  { id: 64, name: "Liverpool" },
  { id: 58, name: "Aston Villa" },
  { id: 73, name: "Tottenham" },
  { id: 61, name: "Chelsea" },
  { id: 67, name: "Newcastle" },
  { id: 66, name: "Manchester United" },
  { id: 563, name: "West Ham" },
  { id: 397, name: "Brighton" },
  { id: 1044, name: "Bournemouth" },
  { id: 63, name: "Fulham" },
  { id: 354, name: "Crystal Palace" },
  { id: 76, name: "Wolverhampton" },
  { id: 62, name: "Everton" },
  { id: 402, name: "Brentford" },
  { id: 351, name: "Nottingham Forest" },
  { id: 389, name: "Luton" },
  { id: 328, name: "Burnley" },
  { id: 356, name: "Sheffield United" },
];

function getStats(matches: Match[], teamId: number) {
  let wins = 0,
    draws = 0,
    losses = 0,
    goalsFor = 0,
    goalsAgainst = 0;
  const teamMatches = matches.filter(
    (m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId,
  );
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
  const crest = teamMatches[0]
    ? teamMatches[0].homeTeam.id === teamId
      ? teamMatches[0].homeTeam.crest
      : teamMatches[0].awayTeam.crest
    : null;
  return { wins, draws, losses, goalsFor, goalsAgainst, crest };
}

export default function CompareModal({ onClose, matches }: Props) {
  const [teamA, setTeamA] = useState(TEAMS[0].id);
  const [teamB, setTeamB] = useState(TEAMS[1].id);

  const statsA = getStats(matches, teamA);
  const statsB = getStats(matches, teamB);

  const nameA = TEAMS.find((t) => t.id === teamA)?.name ?? "";
  const nameB = TEAMS.find((t) => t.id === teamB)?.name ?? "";

  const rows = [
    {
      label: "ПОБЕДЫ",
      a: statsA.wins,
      b: statsB.wins,
      colorA: statsA.wins > statsB.wins ? "#e8ff3c" : "#fff",
      colorB: statsB.wins > statsA.wins ? "#e8ff3c" : "#fff",
    },
    {
      label: "НИЧЬИ",
      a: statsA.draws,
      b: statsB.draws,
      colorA: statsA.draws > statsB.draws ? "#e8ff3c" : "#fff",
      colorB: statsB.draws > statsA.draws ? "#e8ff3c" : "#fff",
    },
    {
      label: "ПОРАЖЕНИЯ",
      a: statsA.losses,
      b: statsB.losses,
      colorA: statsA.losses < statsB.losses ? "#e8ff3c" : "#fff",
      colorB: statsB.losses < statsA.losses ? "#e8ff3c" : "#fff",
    },
    {
      label: "ЗАБИТО",
      a: statsA.goalsFor,
      b: statsB.goalsFor,
      colorA: statsA.goalsFor > statsB.goalsFor ? "#e8ff3c" : "#fff",
      colorB: statsB.goalsFor > statsA.goalsFor ? "#e8ff3c" : "#fff",
    },
    {
      label: "ПРОПУЩЕНО",
      a: statsA.goalsAgainst,
      b: statsB.goalsAgainst,
      colorA: statsA.goalsAgainst < statsB.goalsAgainst ? "#e8ff3c" : "#fff",
      colorB: statsB.goalsAgainst < statsA.goalsAgainst ? "#e8ff3c" : "#fff",
    },
  ];

  const selectStyle = {
    background: "#161616",
    border: "0.5px solid #2a2a2a",
    borderRadius: "8px",
    padding: "8px 12px",
    color: "#fff",
    fontSize: "13px",
    outline: "none",
    width: "100%",
    cursor: "pointer",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0e0e0e",
          border: "0.5px solid #2a2a2a",
          borderRadius: "16px",
          padding: "2rem",
          width: "100%",
          maxWidth: "520px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{ fontSize: "11px", color: "#666", letterSpacing: "0.1em" }}
          >
            СРАВНЕНИЕ КОМАНД
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#666",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <select
            value={teamA}
            onChange={(e) => setTeamA(Number(e.target.value))}
            style={selectStyle}
          >
            {TEAMS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <select
            value={teamB}
            onChange={(e) => setTeamB(Number(e.target.value))}
            style={selectStyle}
          >
            {TEAMS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {statsA.crest && (
              <img
                src={statsA.crest}
                alt={nameA}
                style={{ width: "32px", height: "32px", objectFit: "contain" }}
              />
            )}
            <div style={{ fontSize: "14px", fontWeight: 500, color: "#fff" }}>
              {nameA}
            </div>
          </div>
          <div
            style={{ fontSize: "11px", color: "#555", letterSpacing: "0.08em" }}
          >
            VS
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#fff",
                textAlign: "right",
              }}
            >
              {nameB}
            </div>
            {statsB.crest && (
              <img
                src={statsB.crest}
                alt={nameB}
                style={{ width: "32px", height: "32px", objectFit: "contain" }}
              />
            )}
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid #2a2a2a" }}>
          {rows.map((row) => (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                padding: "0.875rem 0",
                borderBottom: "0.5px solid #1a1a1a",
              }}
            >
              <div
                style={{ fontSize: "20px", fontWeight: 500, color: row.colorA }}
              >
                {row.a}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#555",
                  letterSpacing: "0.08em",
                  textAlign: "center",
                  padding: "0 1rem",
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: row.colorB,
                  textAlign: "right",
                }}
              >
                {row.b}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
