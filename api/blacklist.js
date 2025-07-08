// blacklist.js (Vercel API) - FIXED VERSION
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    // 🧠 FIXED: Parse JSON body secara manual
    const raw = await req.text();
    const body = JSON.parse(raw); // Hindari req.json()!

    const { hwid, user, userid, reason, timestamp } = body;

    if (!hwid || !reason) {
      return res.status(400).json({ success: false, error: "Missing required fields (hwid, reason)" });
    }

    const blacklistUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/blacklist/${hwid}.json`;

    const data = {
      hwid,
      user: user || "unknown",
      userid: userid || 0,
      reason,
      timestamp: timestamp || Date.now()
    };

    const response = await fetch(blacklistUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return res.status(500).json({ success: false, error: "Failed to save to Firebase" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Blacklist error:", err);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
