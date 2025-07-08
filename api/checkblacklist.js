import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const rawBody = await req.text();
    const params = new URLSearchParams(rawBody);
    const hwid = params.get("hwid");

    if (!hwid) {
      return res.status(400).json({ success: false, error: "Missing hwid" });
    }

    const firebaseUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/blacklist/${hwid}.json`;
    const firebaseRes = await fetch(firebaseUrl);

    if (!firebaseRes.ok) {
      return res.status(500).json({ success: false, error: "Failed to fetch from Firebase" });
    }

    const data = await firebaseRes.json();

    if (data && data.reason) {
      return res.status(200).json({
        blacklisted: true,
        reason: data.reason || "Unknown",
      });
    } else {
      return res.status(200).json({ blacklisted: false });
    }
  } catch (err) {
    console.error("checkblacklist.js error:", err);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
