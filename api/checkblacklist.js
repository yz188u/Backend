import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const body = await req.text();
    const params = new URLSearchParams(body);
    const hwid = params.get("hwid");

    if (!hwid) {
      return res.status(400).json({ success: false, error: "Missing hwid" });
    }

    const url = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/blacklist/${hwid}.json`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.reason) {
      return res.status(200).json({ blacklisted: true, reason: data.reason });
    } else {
      return res.status(200).json({ blacklisted: false });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
