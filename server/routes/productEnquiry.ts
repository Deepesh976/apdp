// server/routes/productEnquiry.ts
import { Router, Request, Response } from "express";
import mongoose, { Schema, Document, Model } from "mongoose";

const router = Router();

export type InquiryActionType = "enquire" | "pdf" | "brochure";

interface IProductEnquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  actionType: InquiryActionType;
  productSlug?: string;
  productTitle?: string;
}

const ProductEnquirySchema = new Schema<IProductEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    actionType: {
      type: String,
      enum: ["enquire", "pdf", "brochure"],
      required: true,
    },
    productSlug: { type: String, trim: true },
    productTitle: { type: String, trim: true },
  },
  { timestamps: true }
);

const ProductEnquiry: Model<IProductEnquiry> =
  (mongoose.models.ProductEnquiry as Model<IProductEnquiry>) ||
  mongoose.model<IProductEnquiry>("ProductEnquiry", ProductEnquirySchema);

// POST /api/product-enquiry
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("📩 Incoming enquiry body:", req.body);

    const { name, email, phone, actionType, productSlug, productTitle } =
      req.body;

    if (!name || !email || !actionType) {
      return res
        .status(400)
        .json({ error: "name, email and actionType are required fields" });
    }

    const saved = await ProductEnquiry.create({
      name,
      email,
      phone,
      actionType,
      productSlug,
      productTitle,
    });

    console.log("✅ Enquiry saved:", saved._id);
    return res.status(201).json(saved);
  } catch (error: any) {
    console.error("Product enquiry save error:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
});

export default router;
  