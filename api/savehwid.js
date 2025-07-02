import fetch from "node-fetch";

const FIREBASE = "https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { hwid, token, created, platform = "Roblox" } = req.body || {};

  if (!hwid) {
    return res.status(400).json({ ok: false, error: "HWID missing" });
  }

  try {
    const url = `${FIREBASE}/tokens/${encodeURIComponent(hwid)}.json`;
    const firebaseRes = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hwid, token, created, platform })
    });

    if (!firebaseRes.ok) {
      throw new Error("Firebase error");
    }

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}
