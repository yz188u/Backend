// savehwid.js (Vercel API)
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    // PARSE x-www-form-urlencoded
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const bodyString = Buffer.concat(buffers).toString();
    const params = new URLSearchParams(bodyString);

    const hwid = params.get("hwid");
    const token = params.get("token");
    const created = params.get("created");

    if (!hwid || !token || !created) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // Data yang akan dikirim ke Firebase
    const data = {
      token,
      created: Number(created),
      platform: "Roblox"
    };

    // Simpan ke tokens
    const tokensUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/tokens/${hwid}.json`;
    const validUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/valid_hwids/${hwid}.json`;

    await fetch(tokensUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    await fetch(validUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(true)
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
