import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const body = req.body;

    const { hwid, user, userid, reason, timestamp } = body;

    if (!hwid || !user || !userid || !reason || !timestamp) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const data = {
      hwid,
      user,
      userid,
      reason,
      timestamp
    };

    const blacklistUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/blacklist.json`;

    const firebaseRes = await fetch(blacklistUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await firebaseRes.json();

    return res.status(200).json({ success: true, id: result.name });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
