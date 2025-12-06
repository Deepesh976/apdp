// server/api-server.ts
import "dotenv/config";
import mongoose from "mongoose";
import { createServer } from "./index";

console.log("🟡 api-server.ts: starting...");

async function start() {
  try {
    const PORT = Number(process.env.PORT) || 5000;

    // 🔹 Connect to MongoDB (Atlas)
    if (!process.env.MONGO_URI) {
      console.warn("⚠️ MONGO_URI is not set in .env");
    } else {
      console.log("⏳ Connecting to MongoDB...");
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log("✅ MongoDB connected");
    }

    const app = createServer();
    console.log("🟢 Express app created, starting listener...");

    app.listen(PORT, () => {
      console.log(`🚀 DEV API running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start API server:", err);
    process.exit(1);
  }
}

start().catch((err) => {
  console.error("❌ Unhandled error in start():", err);
});
