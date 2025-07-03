import fetch from "node-fetch";  
  
export default async function handler(_, res) {  
  try {  
    const platformURL = `https://xzuyaxhubkey-default-rtdb.asia-southeast1.firebasedatabase.app/platforms.json`;  
    const fbRes = await fetch(platformURL);  
    const data = await fbRes.json();  
    return res.status(200).json(data || {});  
  } catch (err) {  
    return res.status(500).json({ error: "Failed to load platforms" });  
  }  
}
