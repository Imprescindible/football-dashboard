import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import PageTransition from "../components/PageTransition";
import CompareModal from "../components/CompareModal";
import useWindowWidth from "../hooks/useWindowWidth";

const FULL_TABLE = [
  {
    pos: 1,
    id: 65,
    team: "Manchester City",
    played: 38,
    win: 28,
    draw: 7,
    loss: 3,
    gf: 96,
    ga: 34,
    pts: 91,
  },
  {
    pos: 2,
    id: 57,
    team: "Arsenal",
    played: 38,
    win: 28,
    draw: 5,
    loss: 5,
    gf: 91,
    ga: 29,
    pts: 89,
  },
  {
    pos: 3,
    id: 64,
    team: "Liverpool",
    played: 38,
    win: 24,
    draw: 10,
    loss: 4,
    gf: 86,
    ga: 41,
    pts: 82,
  },
  {
    pos: 4,
    id: 58,
    team: "Aston Villa",
    played: 38,
    win: 20,
    draw: 8,
    loss: 10,
    gf: 76,
    ga: 61,
    pts: 68,
  },
  {
    pos: 5,
    id: 73,
    team: "Tottenham",
    played: 38,
    win: 20,
    draw: 6,
    loss: 12,
    gf: 74,
    ga: 61,
    pts: 66,
  },
  {
    pos: 6,
    id: 61,
    team: "Chelsea",
    played: 38,
    win: 18,
    draw: 9,
    loss: 11,
    gf: 77,
    ga: 63,
    pts: 63,
  },
  {
    pos: 7,
    id: 67,
    team: "Newcastle",
    played: 38,
    win: 18,
    draw: 6,
    loss: 14,
    gf: 85,
    ga: 62,
    pts: 60,
  },
  {
    pos: 8,
    id: 66,
    team: "Manchester United",
    played: 38,
    win: 14,
    draw: 8,
    loss: 16,
    gf: 57,
    ga: 58,
    pts: 50,
  },
  {
    pos: 9,
    id: 563,
    team: "West Ham",
    played: 38,
    win: 14,
    draw: 6,
    loss: 18,
    gf: 60,
    ga: 74,
    pts: 48,
  },
  {
    pos: 10,
    id: 397,
    team: "Brighton",
    played: 38,
    win: 12,
    draw: 12,
    loss: 14,
    gf: 55,
    ga: 62,
    pts: 48,
  },
  {
    pos: 11,
    id: 1044,
    team: "Bournemouth",
    played: 38,
    win: 13,
    draw: 6,
    loss: 19,
    gf: 54,
    ga: 65,
    pts: 45,
  },
  {
    pos: 12,
    id: 63,
    team: "Fulham",
    played: 38,
    win: 13,
    draw: 6,
    loss: 19,
    gf: 55,
    ga: 76,
    pts: 45,
  },
  {
    pos: 13,
    id: 354,
    team: "Crystal Palace",
    played: 38,
    win: 10,
    draw: 11,
    loss: 17,
    gf: 40,
    ga: 52,
    pts: 41,
  },
  {
    pos: 14,
    id: 76,
    team: "Wolverhampton",
    played: 38,
    win: 11,
    draw: 8,
    loss: 19,
    gf: 50,
    ga: 74,
    pts: 41,
  },
  {
    pos: 15,
    id: 62,
    team: "Everton",
    played: 38,
    win: 13,
    draw: 9,
    loss: 16,
    gf: 40,
    ga: 51,
    pts: 40,
  },
  {
    pos: 16,
    id: 402,
    team: "Brentford",
    played: 38,
    win: 10,
    draw: 9,
    loss: 19,
    gf: 56,
    ga: 65,
    pts: 39,
  },
  {
    pos: 17,
    id: 351,
    team: "Nottingham Forest",
    played: 38,
    win: 9,
    draw: 9,
    loss: 20,
    gf: 49,
    ga: 67,
    pts: 32,
  },
  {
    pos: 18,
    id: 389,
    team: "Luton",
    played: 38,
    win: 6,
    draw: 8,
    loss: 24,
    gf: 52,
    ga: 85,
    pts: 26,
  },
  {
    pos: 19,
    id: 328,
    team: "Burnley",
    played: 38,
    win: 5,
    draw: 9,
    loss: 24,
    gf: 35,
    ga: 87,
    pts: 24,
  },
  {
    pos: 20,
    id: 356,
    team: "Sheffield United",
    played: 38,
    win: 3,
    draw: 7,
    loss: 28,
    gf: 35,
    ga: 104,
    pts: 16,
  },
];

type SortKey = "pos" | "win" | "draw" | "loss" | "gf" | "ga" | "pts";

function BarChart({
  title,
  data,
  color,
}: {
  title: string;
  data: { team: string; value: number; id: number }[];
  color: string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div>
      <div
        style={{
          fontSize: "11px",
          color: "#666",
          letterSpacing: "0.1em",
          marginBottom: "1rem",
        }}
      >
        {title}
      </div>
      {data.map((item) => (
        <Link
          key={item.id}
          to={`/team/${item.id}`}
          style={{ textDecoration: "none" }}
        >
          <div
            style={{ marginBottom: "10px" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#fff" }}>{item.team}</div>
              <div style={{ fontSize: "12px", color: color, fontWeight: 500 }}>
                {item.value}
              </div>
            </div>
            <div
              style={{
                background: "#1a1a1a",
                borderRadius: "4px",
                height: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(item.value / max) * 100}%`,
                  height: "100%",
                  background: color,
                  borderRadius: "4px",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function StandingsPage() {
  const allMatches = useSelector((state: RootState) => state.matches.items);
  const width = useWindowWidth();
  const isMobile = width < 600;
  const [showCompare, setShowCompare] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("pos");
  const [sortAsc, setSortAsc] = useState(true);
  const [hoveredCol, setHoveredCol] = useState<SortKey | null>(null);

  const getCrest = (teamId: number) => {
    const match = allMatches.find(
      (m) => m.homeTeam.id === teamId || m.awayTeam.id === teamId,
    );
    if (!match) return null;
    return match.homeTeam.id === teamId
      ? match.homeTeam.crest
      : match.awayTeam.crest;
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const sorted = [...FULL_TABLE].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey];
    return sortAsc ? diff : -diff;
  });

  const colStyle = (key: SortKey): React.CSSProperties => ({
    cursor: "pointer",
    color: sortKey === key ? "#e8ff3c" : hoveredCol === key ? "#fff" : "#555",
    userSelect: "none",
    transition: "color 0.15s",
  });

  const topScoring = [...FULL_TABLE]
    .sort((a, b) => b.gf - a.gf)
    .slice(0, 5)
    .map((t) => ({ team: t.team, value: t.gf, id: t.id }));

  const topConceding = [...FULL_TABLE]
    .sort((a, b) => b.ga - a.ga)
    .slice(0, 5)
    .map((t) => ({ team: t.team, value: t.ga, id: t.id }));

  return (
    <PageTransition>
      <div>
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
            PREMIER LEAGUE · 2023/24
          </div>
          <button
            onClick={() => setShowCompare(true)}
            style={{
              background: "transparent",
              border: "0.5px solid #2a2a2a",
              borderRadius: "8px",
              padding: "6px 14px",
              color: "#666",
              fontSize: "11px",
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#e8ff3c";
              (e.currentTarget as HTMLButtonElement).style.color = "#e8ff3c";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#2a2a2a";
              (e.currentTarget as HTMLButtonElement).style.color = "#666";
            }}
          >
            СРАВНИТЬ
          </button>
        </div>

        <div style={{ borderTop: "0.5px solid #2a2a2a" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "30px 1fr 40px 50px"
                : "30px 1fr 40px 40px 40px 40px 40px 50px",
              padding: "0.75rem 0",
              fontSize: "10px",
              letterSpacing: "0.08em",
              borderBottom: "0.5px solid #2a2a2a",
            }}
          >
            <div
              title="Позиция"
              style={colStyle("pos")}
              onClick={() => handleSort("pos")}
              onMouseEnter={() => setHoveredCol("pos")}
              onMouseLeave={() => setHoveredCol(null)}
            >
              #
            </div>
            <div style={{ color: "#555" }}>КОМАНДА</div>
            {!isMobile && (
              <>
                <div
                  title="Победы"
                  style={{ ...colStyle("win"), textAlign: "center" }}
                  onClick={() => handleSort("win")}
                  onMouseEnter={() => setHoveredCol("win")}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  В
                </div>
                <div
                  title="Ничьи"
                  style={{ ...colStyle("draw"), textAlign: "center" }}
                  onClick={() => handleSort("draw")}
                  onMouseEnter={() => setHoveredCol("draw")}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  Н
                </div>
                <div
                  title="Поражения"
                  style={{ ...colStyle("loss"), textAlign: "center" }}
                  onClick={() => handleSort("loss")}
                  onMouseEnter={() => setHoveredCol("loss")}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  П
                </div>
                <div
                  title="Забито"
                  style={{ ...colStyle("gf"), textAlign: "center" }}
                  onClick={() => handleSort("gf")}
                  onMouseEnter={() => setHoveredCol("gf")}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  ЗБ
                </div>
              </>
            )}
            <div
              title="Разница голов"
              style={{ ...colStyle("ga"), textAlign: "center" }}
              onClick={() => handleSort("ga")}
              onMouseEnter={() => setHoveredCol("ga")}
              onMouseLeave={() => setHoveredCol(null)}
            >
              РГ
            </div>
            <div
              title="Очки"
              style={{ ...colStyle("pts"), textAlign: "right" }}
              onClick={() => handleSort("pts")}
              onMouseEnter={() => setHoveredCol("pts")}
              onMouseLeave={() => setHoveredCol(null)}
            >
              ОЧКИ
            </div>
          </div>

          {sorted.map((team) => {
            const crest = getCrest(team.id);
            return (
              <div
                key={team.pos}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "30px 1fr 40px 50px"
                    : "30px 1fr 40px 40px 40px 40px 40px 50px",
                  padding: "1rem 0",
                  borderBottom: "0.5px solid #1a1a1a",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color:
                      team.pos <= 4
                        ? "#e8ff3c"
                        : team.pos >= 18
                          ? "#ff4d4d"
                          : "#555",
                  }}
                >
                  {team.pos}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "13px" : "15px",
                    fontWeight: 500,
                  }}
                >
                  <Link
                    to={`/team/${team.id}`}
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {crest && (
                      <img
                        src={crest}
                        alt={team.team}
                        style={{
                          width: "20px",
                          height: "20px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                    {team.team}
                  </Link>
                </div>
                {!isMobile && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      textAlign: "center",
                    }}
                  >
                    {team.win}
                  </div>
                )}
                {!isMobile && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      textAlign: "center",
                    }}
                  >
                    {team.draw}
                  </div>
                )}
                {!isMobile && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      textAlign: "center",
                    }}
                  >
                    {team.loss}
                  </div>
                )}
                {!isMobile && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      textAlign: "center",
                    }}
                  >
                    {team.gf}
                  </div>
                )}
                <div
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    textAlign: "center",
                  }}
                >
                  {team.gf}:{team.ga}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "13px" : "15px",
                    fontWeight: 500,
                    color: "#e8ff3c",
                    textAlign: "right",
                  }}
                >
                  {team.pts}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "3rem",
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "0.5px solid #2a2a2a",
          }}
        >
          <BarChart
            title="ТОП-5 ПО ЗАБИТЫМ"
            data={topScoring}
            color="#e8ff3c"
          />
          <BarChart
            title="ТОП-5 ПО ПРОПУЩЕННЫМ"
            data={topConceding}
            color="#ff4d4d"
          />
        </div>

        {showCompare && (
          <CompareModal
            onClose={() => setShowCompare(false)}
            matches={allMatches}
          />
        )}
      </div>
    </PageTransition>
  );
}
