// pages/api/getplatforms.js
import { initializeApp, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import serviceAccount from "../../../serviceAccountKey.json"; // file credentials dari Firebase

const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app"
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const db = getDatabase();
    const snapshot = await db.ref("platforms").once("value");
    const data = snapshot.val();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
