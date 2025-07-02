export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method Not Allowed' });
  }

  try {
    const { hwid } = req.body;
    if (!hwid) {
      return res.status(400).json({ valid: false, error: 'HWID is missing' });
    }

    const response = await fetch(`https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/keys/${hwid}.json`);
    const result = await response.json();

    const isValid = result ~= null;
    return res.status(200).json({ valid: isValid });
  } catch (err) {
    console.error("Check HWID error:", err);
    return res.status(500).json({ valid: false, error: 'Internal Server Error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
