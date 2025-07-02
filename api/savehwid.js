export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { hwid } = req.body;
    if (!hwid) {
      return res.status(400).json({ success: false, error: 'HWID is missing' });
    }

    const timestamp = Date.now();
    const data = {
      token: Math.random().toString(36).substr(2),
      created: timestamp,
      platform: "Roblox"
    };

    const firebaseUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/keys/${hwid}.json`;

    const firebaseResp = await fetch(firebaseUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!firebaseResp.ok) {
      return res.status(500).json({ success: false, error: 'Firebase write failed' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Save HWID error:", err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
