// blacklist.js (Full Compatible with curl, Roblox, Postman, etc)
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    // TERIMA SEMUA FORMAT BODY: JSON ataupun Text
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const rawBody = Buffer.concat(buffers).toString();
    let body = {};

    try {
      body = JSON.parse(rawBody);
    } catch {
      return res.status(400).json({ success: false, error: "Invalid JSON format." });
    }

    const { hwid, user, userid, reason, timestamp } = body;

    if (!hwid || !reason) {
      return res.status(400).json({ success: false, error: "Missing hwid or reason" });
    }

    const firebaseURL = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/blacklist/${hwid}.json`;

    const firebaseData = {
      hwid,
      user: user || "unknown",
      userid: userid || 0,
      reason,
      timestamp: timestamp || Date.now()
    };

    const firebaseRes = await fetch(firebaseURL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(firebaseData)
    });

    if (!firebaseRes.ok) {
      return res.status(500).json({ success: false, error: "Failed to save to Firebase" });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
