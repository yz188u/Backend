export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method Not Allowed' });
  }

  try {
    // Baca body JSON
    const body = await req.json();
    const hwid = body.hwid;

    if (!hwid) {
      return res.status(400).json({ valid: false, error: 'HWID is missing' });
    }

    // Ganti isi validHWIDs sesuai database kamu nanti
    const validHWIDs = [
      "5eaa7570-129a-47f9-8166-c8dcd002482c",
      "contoh-hwid-2"
    ];

    const isValid = validHWIDs.includes(hwid);

    return res.status(200).json({ valid: isValid });
  } catch (error) {
    return res.status(500).json({ valid: false, error: 'JSON parse error or server issue' });
  }
}
