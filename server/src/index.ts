import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, MONGODB_URI, getCorsOrigins } from "./config.js";
import adminRouter from "./routes/admin.js";
import apiRouter from "./routes/api.js";
import authRouter from "./routes/auth.js";

const app = express();
const corsOrigins = getCorsOrigins();
app.use(cors({ origin: corsOrigins, credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api", apiRouter);

async function main() {
  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
