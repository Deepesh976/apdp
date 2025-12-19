import { Router, Request, Response } from "express";
import mongoose, { Schema, Document, Model } from "mongoose";

const router = Router();

/* ============================
   Contact Interface
============================ */
export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

/* ============================
   Contact Schema
============================ */
const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 15,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

/* ============================
   Prevent Model Overwrite
============================ */
const Contact: Model<IContact> =
  mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);

/* ============================
   POST /api/contact
   Save contact form message
============================ */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    /* ---- Basic Validation ---- */
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    /* ---- Save to MongoDB ---- */
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Contact message saved successfully",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        message: contact.message,
        createdAt: contact.createdAt,
      },
    });
  } catch (error: any) {
    console.error("❌ Contact save error:", error);

    /* ---- Mongoose Validation Errors ---- */
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// GET /api/admin/contacts
router.get("/admin/all", async (_req: Request, res: Response) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Fetch contacts error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
});


export default router;
