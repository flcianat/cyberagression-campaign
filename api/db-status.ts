import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      return res.status(500).json({
        connected: false,
        fallbackMode: true,
        uriConfigured: false,
        error: "MONGODB_URI is not configured",
      });
    }

    const client = new MongoClient(uri);
    await client.connect();
    await client.db("social_campaign").command({ ping: 1 });
    await client.close();

    return res.status(200).json({
      connected: true,
      fallbackMode: false,
      uriConfigured: true,
      error: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      connected: false,
      fallbackMode: true,
      uriConfigured: true,
      error: error.message,
    });
  }
}
