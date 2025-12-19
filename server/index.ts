// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import contactRouter from "./routes/contact";
import productEnquiryRouter from "./routes/productEnquiry";
import customerLocations from "./routes/customerLocations";

export function createServer() {
  console.log("🟣 createServer(): creating Express app");

  const app = express();

  /* ============================
     CORS Configuration
  ============================ */
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:8081",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  /* ============================
     Body Parsers
  ============================ */
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  /* ============================
     Request Logger (Dev only)
  ============================ */
  if (process.env.NODE_ENV !== "production") {
    app.use((req: Request, _res: Response, next: NextFunction) => {
      console.log(`➡️  ${req.method} ${req.originalUrl}`);
      next();
    });
  }

  /* ============================
     API Routes
  ============================ */
  app.use("/api/contact", contactRouter);
  app.use("/api/product-enquiry", productEnquiryRouter);
  app.use("/api/customer-locations", customerLocations);

  /* ============================
     Health Check
  ============================ */
  app.get("/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  /* ============================
     404 Handler
  ============================ */
  app.use((_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  });

  /* ============================
     Global Error Handler
  ============================ */
  app.use(
    (
      err: any,
      _req: Request,
      res: Response,
      _next: NextFunction
    ) => {
      console.error("❌ Global Error:", err);

      res.status(err.status || 500).json({
        success: false,
        message:
          err.message || "Internal server error",
      });
    }
  );

  return app;
}
