export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const endpoint = req.query?.endpoint || "stats_all_time";

  const endpointMap = {
    stats_all_time:
      "https://wakapi.dev/api/compat/wakatime/v1/users/ryz772/stats/all_time",
    all_time_since_today:
      "https://wakapi.dev/api/compat/wakatime/v1/users/ryz772/all_time_since_today",
  };

  const targetUrl = endpointMap[endpoint];

  if (!targetUrl) {
    return res.status(400).json({ error: "Invalid endpoint" });
  }

  const apiKey = process.env.WAKAPI_API_KEY || process.env.VITE_WAKAPI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing WAKAPI_API_KEY on server" });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: "application/json",
        Authorization: apiKey,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Wakapi upstream error",
        status: response.status,
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: "Failed to fetch Wakapi" });
  }
}