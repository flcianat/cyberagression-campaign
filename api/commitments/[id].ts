import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI as string;

let cachedClient: MongoClient | null = null;

async function connectDB() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);

  await client.connect();

  cachedClient = client;

  return client;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        error: "Missing commitment id",
      });
    }

    const client = await connectDB();

    const db = client.db("social_campaign");

    const result = await db.collection("commitments").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Commitment not found",
      });
    }

    return res.status(200).json({
      success: true,
      deletedId: id,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
