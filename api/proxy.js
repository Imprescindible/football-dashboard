export default async function handler(req, res) {
  const path = req.url.replace("/api", "");
  const url = `https://api.football-data.org${path}`;

  const response = await fetch(url, {
    headers: {
      "X-Auth-Token": process.env.VITE_FOOTBALL_API_KEY,
    },
  });

  const data = await response.json();
  res.json(data);
}
