import fetch from "node-fetch";  
  
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const firebaseUrl = "https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/platforms.json";
    const fbRes = await fetch(firebaseUrl);
    const data = await fbRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
