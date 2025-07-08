import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed Yeah" });
  }

  try {
    // BACA RAW BODY
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const rawBody = Buffer.concat(buffers).toString();

    // PARSE x-www-form-urlencoded
    const params = new URLSearchParams(rawBody);
    const hwid = params.get("hwid");

    if (!hwid) {
      return res.status(400).json({ success: false, error: "Missing hwid" });
    }

    const firebaseUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/blacklist/${hwid}.json`;
    const response = await fetch(firebaseUrl);
    const data = await response.json();

    if (data && data.reason) {
      return res.status(200).json({
        blacklisted: true,
        reason: data.reason || "Unknown"
      });
    } else {
      return res.status(200).json({ blacklisted: false });
    }

  } catch (e) {
    console.error("🔥 checkblacklist ERROR:", e);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
