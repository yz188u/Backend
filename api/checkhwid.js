// checkhwid.js (Vercel API)
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ valid: false, error: "Method Not Allowed" });
  }

  try {
    const { hwid } = req.body;

    if (!hwid) {
      return res.status(400).json({ valid: false, error: "Missing HWID" });
    }

    // URL Firebase kamu
    const firebaseUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/valid_hwids/${hwid}.json`;

    const fbRes = await fetch(firebaseUrl);
    const fbData = await fbRes.json();

    const isValid = fbData === true;

    return res.status(200).json({ valid: isValid });
  } catch (error) {
    return res.status(500).json({ valid: false, error: "Internal Server Error" });
  }
}
