import fetch from "node-fetch";

const FIREBASE = "https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ valid: false, error: "Method Not Allowed" });
  }

  const { hwid } = req.body || {};
  if (!hwid) {
    return res.status(400).json({ valid: false, error: "HWID missing" });
  }

  try {
    const url = `${FIREBASE}/keys/${encodeURIComponent(hwid)}.json`;
    const fb = await fetch(url);
    const data = await fb.text();          // “null” kalau tidak ada

    res.json({ valid: data !== "null" });
  } catch (err) {
    res.status(500).json({ valid: false, error: err.message });
  }
}
