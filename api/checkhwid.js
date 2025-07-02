export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method Not Allowed' });
  }

  try {
    const hwid = req.body.hwid;

    if (!hwid) {
      return res.status(400).json({ valid: false, error: 'HWID is missing' });
    }

    const validHWIDs = ["5eaa7570-129a-47f9-8166-c8dcd002482c"];
    const isValid = validHWIDs.includes(hwid);

    return res.status(200).json({ valid: isValid });
  } catch (error) {
    console.error("Error:", error);
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
