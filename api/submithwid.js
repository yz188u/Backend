import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ valid: false, error: "Method Not Allowed" });
  }

  const { hwid } = req.body;
  if (!hwid) {
    return res.status(400).json({ valid: false, error: "Missing HWID" });
  }

  try {
    const firebaseCheckURL = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/valid_hwids/${hwid}.json`;
    const checkRes = await fetch(firebaseCheckURL);
    const checkData = await checkRes.text();

    const isValid = checkData !== "null";
    if (!isValid) return res.status(200).json({ valid: false });

    // Tambahkan ke pending
    const pendingURL = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/pending/${hwid}.json`;
    await fetch(pendingURL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ created: Date.now() })
    });

    return res.status(200).json({ valid: true });
  } catch (err) {
    return res.status(500).json({ valid: false, error: "Server Error" });
  }
}
