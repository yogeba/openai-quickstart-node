// pages/api/generate.js
import { fetchHealthData } from "../../lib/openai";

export default async function (req, res) {
  try {
    const health = req.body.health || "";
    const result = await fetchHealthData(health);
    return res.json({ result });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: { message: error.message } });
  }
}
