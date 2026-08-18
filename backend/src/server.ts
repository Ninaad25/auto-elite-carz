import "dotenv/config";

import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";

import carRoutes from "./routes/car.routes.js";

import adminRoutes from "./routes/admin.routes.js";

import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";

import favouriteRoutes from "./routes/favourite.routes.js";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/cars", carRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiryRoutes);

app.use("/api/favourites", favouriteRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (_req, res) => {
  res.json({
    message: "Auto Elite Carz API is running 🚗",
  });
});

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "OK",
      database: "Connected",
      message: "Auto Elite Carz backend is healthy",
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      status: "ERROR",
      database: "Disconnected",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚗 Auto Elite Carz API running on port ${PORT}`);
});
