import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.headers.accept?.includes("text/html")) {
    // Kalau diakses langsung via browser
    return res.status(403).send("❌ This endpoint is for API use only.");
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const firebaseUrl = "https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/platforms.json";
    const fbRes = await fetch(firebaseUrl);
    const data = await fbRes.json();

    const filtered = {};
    for (const [key, value] of Object.entries(data)) {
      if (value.enabled === true) {
        filtered[key] = value;
      }
    }

    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
