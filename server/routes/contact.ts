import { Router, Request, Response } from "express";
import mongoose, { Schema, Document, Model } from "mongoose";

const router = Router();

/** Contact document shape */
interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// avoid model overwrite in dev / hot reload
const Contact: Model<IContact> =
  (mongoose.models.Contact as Model<IContact>) ||
  mongoose.model<IContact>("Contact", ContactSchema);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body as Partial<IContact>;

    // simple validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "name, email and message are required" });
    }

    const saved = await Contact.create({ name, email, phone, message });
    return res.status(201).json(saved);
  } catch (error: any) {
    console.error("Contact save error:", error);
    return res
      .status(500)
      .json({ error: error?.message || "Internal server error" });
  }
});

export default router;
