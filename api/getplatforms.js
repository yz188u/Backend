import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // Kalau akses dari browser langsung (Accept = text/html)
  if (req.headers.accept?.includes("text/html")) {
    res.status(404).setHeader("Content-Type", "text/html").send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>404 Not Found</title>
        <style>
          body {
            background-color: #0c0014;
            color: white;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            flex-direction: column;
          }
          h1 {
            font-size: 3rem;
            color: #ff77c6;
          }
          p {
            opacity: 0.8;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The resource you're looking for does not exist,fuck yeah.</p>
      </body>
      </html>
    `);
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const firebaseUrl = "https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/platforms.json";
    const fbRes = await fetch(firebaseUrl);
    const data = await fbRes.json();

    // Hanya return platform yang enabled
    const filtered = {};
    for (const [key, value] of Object.entries(data)) {
      if (value.enabled === true) {
        filtered[key] = value;
      }
    }

    return res.status(200).json(filtered);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
