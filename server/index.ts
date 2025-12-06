// server/index.ts
import express from "express";
import cors from "cors";

import contactRouter from "./routes/contact";
import productEnquiryRouter from "./routes/productEnquiry";

export function createServer() {
  console.log("🟣 createServer(): creating Express app");

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/contact", contactRouter);
  app.use("/api/product-enquiry", productEnquiryRouter);

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  return app;
}
