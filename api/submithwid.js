import fetch from "node-fetch";

export default async function handler(req, res) {
  // ✅ Tambahkan CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ valid: false, error: "Method Not Allowed" });
  }

  try {
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const bodyString = Buffer.concat(buffers).toString();
    const body = JSON.parse(bodyString);
    const hwid = body.hwid;

    if (!hwid) {
      return res.status(400).json({ valid: false, error: "Missing HWID" });
    }

    const firebaseUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/valid_hwids/${hwid}.json`;
    const fbRes = await fetch(firebaseUrl);
    const fbData = await fbRes.text();

    const isValid = fbData !== "null";
    return res.status(200).json({ valid: isValid });
  } catch (err) {
    return res.status(500).json({ valid: false, error: "Internal Server Error" });
  }
}
