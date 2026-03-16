import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import type { RootState } from "../store/store";
import PageTransition from "../components/PageTransition";
import Skeleton from "../components/Skeleton";
import useWindowWidth from "../hooks/useWindowWidth";

export default function MatchesPage() {
  const matches = useSelector((state: RootState) => state.matches.items);
  const status = useSelector((state: RootState) => state.matches.status);
  const [searchParams, setSearchParams] = useSearchParams();
  const width = useWindowWidth();
  const isMobile = width < 600;

  const roundParam = searchParams.get("round");
  const searchParam = searchParams.get("search") || "";

  const [search, setSearch] = useState(searchParam);
  const [date, setDate] = useState("");

  const rounds = Array.from(new Set(matches.map((m) => m.matchday))).sort(
    (a, b) => a - b,
  );

  const round = roundParam ? Number(roundParam) : (rounds[0] ?? 1);

  const setRound = (r: number) => {
    const params: Record<string, string> = { round: String(r) };
    if (search) params.search = search;
    setSearchParams(params);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const params: Record<string, string> = { round: String(round) };
    if (value) params.search = value;
    setSearchParams(params);
  };

  if (status === "loading")
    return (
      <div>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            style={{
              borderTop: "0.5px solid #2a2a2a",
              padding: "1.25rem 0",
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Skeleton width="28px" height="28px" borderRadius="50%" />
              <Skeleton width="140px" height="18px" />
            </div>
            <Skeleton width="60px" height="22px" borderRadius="6px" />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Skeleton width="140px" height="18px" />
              <Skeleton width="28px" height="28px" borderRadius="50%" />
            </div>
          </div>
        ))}
      </div>
    );

  if (status === "failed")
    return <p style={{ color: "#888" }}>Ошибка загрузки</p>;

  const filtered = matches.filter((match) => {
    const matchesSearch =
      match.homeTeam.name.toLowerCase().includes(search.toLowerCase()) ||
      match.awayTeam.name.toLowerCase().includes(search.toLowerCase());
    const matchDate = match.utcDate.slice(0, 10);
    const matchesDate = date ? matchDate === date : true;
    const matchesRound = match.matchday === round;
    return matchesSearch && matchesDate && matchesRound;
  });

  return (
    <PageTransition>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            marginBottom: "1rem",
            gap: "1rem",
          }}
        >
          <div
            style={{ fontSize: "11px", color: "#666", letterSpacing: "0.1em" }}
          >
            PREMIER LEAGUE · 2023/24
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Поиск команды..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                background: "#161616",
                border: "0.5px solid #2a2a2a",
                borderRadius: "8px",
                padding: "6px 12px",
                color: "#fff",
                fontSize: "13px",
                outline: "none",
                width: isMobile ? "100%" : "160px",
              }}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                background: "#161616",
                border: "0.5px solid #2a2a2a",
                borderRadius: "8px",
                padding: "6px 12px",
                color: date ? "#fff" : "#555",
                fontSize: "13px",
                outline: "none",
                colorScheme: "dark",
              }}
            />
            {date && (
              <button
                onClick={() => setDate("")}
                style={{
                  background: "transparent",
                  border: "0.5px solid #2a2a2a",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  color: "#666",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {rounds.map((r) => (
            <button
              key={r}
              onClick={() => setRound(r)}
              style={{
                background: round === r ? "#e8ff3c" : "transparent",
                border: `0.5px solid ${round === r ? "#e8ff3c" : "#2a2a2a"}`,
                borderRadius: "6px",
                padding: "4px 10px",
                color: round === r ? "#000" : "#666",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: round === r ? 500 : 400,
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {filtered.map((match) => (
          <Link
            to={`/match/${match.id}`}
            key={match.id}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                borderTop: "0.5px solid #2a2a2a",
                padding: "1.25rem 0",
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: isMobile ? "0.5rem" : "1rem",
                cursor: "pointer",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "8px" : "12px",
                }}
              >
                <img
                  src={match.homeTeam.crest}
                  alt={match.homeTeam.name}
                  style={{
                    width: isMobile ? "20px" : "28px",
                    height: isMobile ? "20px" : "28px",
                    objectFit: "contain",
                  }}
                />
                <div
                  style={{
                    fontSize: isMobile ? "13px" : "18px",
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {isMobile ? match.homeTeam.shortName : match.homeTeam.name}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "16px" : "22px",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: "#e8ff3c",
                  }}
                >
                  {match.score.fullTime.home ?? "–"} :{" "}
                  {match.score.fullTime.away ?? "–"}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#666",
                    letterSpacing: "0.08em",
                  }}
                >
                  {match.utcDate.slice(0, 10)}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? "8px" : "12px",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "13px" : "18px",
                    fontWeight: 500,
                    color: "#fff",
                    textAlign: "right",
                  }}
                >
                  {isMobile ? match.awayTeam.shortName : match.awayTeam.name}
                </div>
                <img
                  src={match.awayTeam.crest}
                  alt={match.awayTeam.name}
                  style={{
                    width: isMobile ? "20px" : "28px",
                    height: isMobile ? "20px" : "28px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div
            style={{
              color: "#555",
              fontSize: "13px",
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            Матчи не найдены
          </div>
        )}
      </div>
    </PageTransition>
  );
}
