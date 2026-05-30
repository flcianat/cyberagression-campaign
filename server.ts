import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory fallback dataset
let memoryCommitments = [
  {
    id: "card-1",
    author: "Dimas Anggara",
    text: "Saya berjanji menarik napas 5 detik sebelum mengetik balasan di Twitter/X dan Instagram.",
    emoji: "🧘‍♂️",
    status: "PERSISTEN",
    dateStr: "24/5/2026, 14.15",
    themeClass: "bg-cream border-yellow-800/20",
    textColorClass: "text-amber-950"
  },
  {
    id: "card-2",
    author: "Rania Wardhana",
    text: "Bertekad menyebarkan energi positif di internet, kurangi nimbrung drama rujak massal tak produktif.",
    emoji: "✨",
    status: "PERSISTEN",
    dateStr: "24/5/2026, 13.50",
    themeClass: "bg-rose-50 border-rose-200",
    textColorClass: "text-rose-950"
  },
  {
    id: "card-3",
    author: "Rizky F.",
    text: "Mulai detik ini, saya tidak akan menghakimi penampilan fisik konten kreator dengan dalih candaan receh.",
    emoji: "🛡️",
    status: "PERSISTEN",
    dateStr: "24/5/2026, 11.22",
    themeClass: "bg-blue-50 border-blue-200",
    textColorClass: "text-blue-950"
  }
];

// Lazy database connection state & fast fallback protection
let isConnected = false;
let isConnecting = false;
let connectionFailedPermanently = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("MY_GEMINI_API_KEY") || uri.includes("username:password")) {
    return false;
  }
  if (connectionFailedPermanently) {
    return false; // Fast exit to avoid repeated timeouts/errors and keep UI crisp
  }
  if (isConnected) return true;
  if (isConnecting) return false;

  isConnecting = true;
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000, // Timeout sooner to prevent slow responses in case of bad connection
    });
    isConnected = true;
    connectionFailedPermanently = false;
    console.log("✅ Connected to MongoDB successfully.");
    return true;
  } catch (err: any) {
    console.error("❌ Failed to connect to MongoDB (Will fallback to high-speed memory storage):", err.message || err);
    isConnected = false;
    // If it's an auth error or timeout, we flag it so we don't block subsequent user actions
    connectionFailedPermanently = true;
    return false;
  } finally {
    isConnecting = false;
  }
}

// Schemas & Models
const commitmentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  emoji: { type: String, default: "🧘‍♂️" },
  status: { type: String, default: "PERSISTEN" },
  dateStr: { type: String, required: true },
  themeClass: { type: String, default: "bg-cream border-yellow-800/20" },
  textColorClass: { type: String, default: "text-amber-950" }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret: any) => {
      if (ret._id) {
        ret.id = ret._id.toString();
      }
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const Commitment = mongoose.model<any>("Commitment", commitmentSchema);

// Seeding standard data into MongoDB if it is empty
async function seedInitialDataIfNeeded() {
  try {
    const count = await Commitment.countDocuments();
    if (count === 0) {
      console.log("Seeding initial commitments into MongoDB...");
      await Commitment.insertMany(memoryCommitments.map(({ id, ...rest }) => rest) as any[]);
      console.log("✅ Seeding completed.");
    }
  } catch (err) {
    console.error("Error seeding initial data to MongoDB:", err);
  }
}

// API Routes
app.get("/api/db-status", async (req, res) => {
  const retry = req.query.retry === "true";
  if (retry) {
    connectionFailedPermanently = false;
    isConnected = false;
    await connectDB();
  }
  const uri = process.env.MONGODB_URI;
  const isDefaultUri = !uri || uri.includes("MY_GEMINI_API_KEY") || uri.includes("username:password");
  return res.json({
    connected: isConnected,
    fallbackMode: connectionFailedPermanently || isDefaultUri,
    uriConfigured: !isDefaultUri,
    error: connectionFailedPermanently ? "Authentication failed or connection timed out. Please check your MONGODB_URI credentials." : null
  });
});

app.get("/api/commitments", async (req, res) => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    try {
      await seedInitialDataIfNeeded();
      const dbCommitments = await Commitment.find().sort({ createdAt: -1 });
      return res.json(dbCommitments);
    } catch (err) {
      console.error("MongoDB get failed, falling back to memory:", err);
    }
  }
  return res.json(memoryCommitments);
});

app.post("/api/commitments", async (req, res) => {
  const { author, text, emoji, status, dateStr, themeClass, textColorClass } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const dbConnected = await connectDB();
  if (dbConnected) {
    try {
      const savedDoc = await Commitment.create({
        author: author || "Netizen Mindful",
        text,
        emoji: emoji || "🧘‍♂️",
        status: status || "PERSISTEN",
        dateStr: dateStr || new Date().toLocaleString(),
        themeClass: themeClass || "bg-cream border-yellow-800/20",
        textColorClass: textColorClass || "text-amber-950"
      });
      return res.status(201).json(savedDoc);
    } catch (err) {
      console.error("MongoDB save failed, falling back to memory:", err);
    }
  }

  // Fallback to memory saving
  const newMemoryDoc = {
    id: `card-${Date.now()}`,
    author: author || "Netizen Mindful",
    text,
    emoji: emoji || "🧘‍♂️",
    status: status || "PERSISTEN",
    dateStr: dateStr || new Date().toLocaleString(),
    themeClass: themeClass || "bg-cream border-yellow-800/20",
    textColorClass: textColorClass || "text-amber-950"
  };
  memoryCommitments.unshift(newMemoryDoc);
  return res.status(201).json(newMemoryDoc);
});

app.delete("/api/commitments/:id", async (req, res) => {
  const { id } = req.params;
  const dbConnected = await connectDB();

  if (dbConnected) {
    try {
      const isMongooseId = mongoose.Types.ObjectId.isValid(id);
      if (isMongooseId) {
        await Commitment.findByIdAndDelete(id);
        return res.json({ success: true, message: "Deleted from database." });
      } else {
        // Handle seeded cards delete using fields search
        await Commitment.deleteOne({ $or: [{ id: id }, { dateStr: id }, { author: id }] });
      }
    } catch (err) {
      console.error("MongoDB delete failed, falling back to memory:", err);
    }
  }

  // Delete from memory array
  memoryCommitments = memoryCommitments.filter(c => c.id !== id && c.dateStr !== id);
  return res.json({ success: true, message: "Deleted from memory." });
});

// Start Express + Vite Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
