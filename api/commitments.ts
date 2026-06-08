import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI as string;

let cachedClient: MongoClient | null = null;

async function connectDB() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);
  await client.connect();

  cachedClient = client;
  return client;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await connectDB();
    const db = client.db("social_campaign");
    const collection = db.collection("commitments");

    if (req.method === "GET") {
      const data = await collection.find({}).sort({ createdAt: -1 }).toArray();

      return res.status(200).json(
        data.map((item) => ({
          id: item._id.toString(),
          author: item.author,
          text: item.text,
          emoji: item.emoji,
          status: item.status,
          dateStr: item.dateStr,
          themeClass: item.themeClass,
          textColorClass: item.textColorClass,
        })),
      );
    }

    if (req.method === "POST") {
      const payload = req.body;

      const result = await collection.insertOne({
        ...payload,
        createdAt: new Date(),
      });

      return res.status(201).json({
        id: result.insertedId.toString(),
        ...payload,
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}
