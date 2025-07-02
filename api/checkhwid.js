// checkhwid.js (Vercel API)
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ valid: false, error: "Method Not Allowed" });
  }

  try {
    // Ambil body x-www-form-urlencoded
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const bodyString = Buffer.concat(buffers).toString();
    const params = new URLSearchParams(bodyString);

    const hwid = params.get("hwid");
    if (!hwid) {
      return res.status(400).json({ valid: false, error: "Missing HWID" });
    }

    // Cek di path /keys/<hwid>.json
    const firebaseUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/keys/${hwid}.json`;

    const fbRes = await fetch(firebaseUrl);
    const fbData = await fbRes.text(); // bisa null string

    const isValid = fbData !== "null";

    return res.status(200).json({ valid: isValid });
  } catch (error) {
    return res.status(500).json({ valid: false, error: "Internal Server Error" });
  }
}
