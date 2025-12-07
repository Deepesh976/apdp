// server/index.ts
import express from "express";
import cors from "cors";

import contactRouter from "./routes/contact";
import productEnquiryRouter from "./routes/productEnquiry";
import customerLocations from "./routes/customerLocations";


export function createServer() {
  console.log("🟣 createServer(): creating Express app");

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/contact", contactRouter);
  app.use("/product-enquiry", productEnquiryRouter);
  app.use("/customer-locations", customerLocations);


  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  return app;
}
