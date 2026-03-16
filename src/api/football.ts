const BASE_URL = "/api/v4";
const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

const headers = {
  "X-Auth-Token": API_KEY,
};

export const fetchMatches = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/competitions/PL/matches?season=2023`,
      { headers },
    );
    console.log("status:", response.status);
    const data = await response.json();
    console.log("data:", data);
    return data;
  } catch (e) {
    console.error("fetch error:", e);
    throw e;
  }
};

export const fetchStandings = async () => {
  const response = await fetch(
    `${BASE_URL}/competitions/PL/standings?season=2023`,
    { headers },
  );
  const data = await response.json();
  return data;
};

export const fetchTeam = async (id: string) => {
  const response = await fetch(`${BASE_URL}/teams/${id}`, { headers });
  const data = await response.json();
  return data;
};
