import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./config/db.js";
import app from "./app.js";
import ensureAdmin from "./utils/ensureAdmin.js";
import { seedFlights } from "./utils/seedFlights.js";


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();      // 1️⃣ connect MongoDB
    await ensureAdmin();    // 2️⃣ create default admin if needed
    await seedFlights(); 
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server startup error:", err.message);
    process.exit(1);
  }
};

startServer();
