import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method Not Allowed' });
  }

  try {
    const { hwid } = req.body;
    if (!hwid) return res.status(400).json({ valid: false, error: 'HWID missing' });

    const firebaseUrl = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/keys/${hwid}.json`;
    const firebaseResp = await fetch(firebaseUrl);
    const data = await firebaseResp.json();

    const isValid = data !== null;
    return res.status(200).json({ valid: isValid });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ valid: false, error: 'Server error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
