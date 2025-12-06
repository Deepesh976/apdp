import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  User,
  FileText,
  Download,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface InquiryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: "enquire" | "pdf" | "brochure";
  onSubmitSuccess?: (
    actionType: "enquire" | "pdf" | "brochure"
  ) => void | Promise<void>;
  productSlug?: string;
  productTitle?: string;
}

interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
}

// You can also move this to env later:
// VITE_API_BASE_URL = "http://localhost:5000"
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function InquiryDialog({
  isOpen,
  onOpenChange,
  actionType,
  onSubmitSuccess,
  productSlug,
  productTitle,
}: InquiryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const getDialogConfig = () => {
    switch (actionType) {
      case "pdf":
        return {
          title: "Download Product PDF",
          description: "Get comprehensive product specifications and details",
          icon: Download,
          color: "text-primary",
          bgColor: "bg-primary/10",
          buttonText: "Download PDF",
        };
      case "brochure":
        return {
          title: "Download Brochure",
          description:
            "Access the complete product brochure and marketing materials",
          icon: FileText,
          color: "text-primary",
          bgColor: "bg-primary/10",
          buttonText: "Download Brochure",
        };
      case "enquire":
      default:
        return {
          title: "Send an Inquiry",
          description:
            "Our team will get back to you with detailed information",
          icon: MessageSquare,
          color: "text-accent",
          bgColor: "bg-accent/10",
          buttonText: "Send Inquiry",
        };
    }
  };

  const config = getDialogConfig();
  const IconComponent = config.icon;

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // 1️⃣ Send data to backend (store in MongoDB)
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        actionType,
        productSlug,
        productTitle,
      };

      console.log("📩 Submitting enquiry payload:", payload);

      const res = await fetch(`${API_BASE_URL}/api/product-enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("🔴 Backend error:", res.status, text);
        throw new Error(text || "Failed to submit enquiry");
      }

      console.log("🟢 Enquiry saved successfully");
      setSubmitMessage("Details submitted successfully.");

      // 2️⃣ After successful save -> trigger download / enquiry flow
      if (onSubmitSuccess) {
        await onSubmitSuccess(actionType);
      }

      // 3️⃣ Clear form (keep popup open so user can see message)
      reset();
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      alert("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-md w-[92vw]
          border-border/60 shadow-2xl rounded-2xl bg-white
          top-[18vh] translate-y-0
          max-h-[70vh] overflow-y-auto
        "
      >
        {/* Header Background */}
        <div
          className={`-mx-6 -mt-6 rounded-t-xl ${config.bgColor} px-6 py-6 border-b border-border/40`}
        >
          <div className="flex items-start gap-4">
            <div className={`rounded-xl ${config.bgColor} p-3`}>
              <IconComponent className={`h-6 w-6 ${config.color}`} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-foreground">
                {config.title}
              </DialogTitle>
              <DialogDescription className="mt-1.5 text-sm text-foreground/70">
                {config.description}
              </DialogDescription>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 px-6 py-6"
        >
          {/* Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground/70"
            >
              <User className="h-4 w-4" />
              Full Name
            </Label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              id="name"
              placeholder="John Doe"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                errors.name
                  ? "border-destructive bg-destructive/5 focus:ring-2 focus:ring-destructive/30"
                  : "border-border/60 bg-white hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            {errors.name && (
              <p className="flex items-center gap-1.5 text-xs text-destructive font-medium">
                <span className="h-1 w-1 rounded-full bg-destructive" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground/70"
            >
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\-\s()]+$/,
                  message: "Please enter a valid phone number",
                },
              })}
              id="phone"
              placeholder="+91 98765 43210"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                errors.phone
                  ? "border-destructive bg-destructive/5 focus:ring-2 focus:ring-destructive/30"
                  : "border-border/60 bg-white hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            {errors.phone && (
              <p className="flex items-center gap-1.5 text-xs text-destructive font-medium">
                <span className="h-1 w-1 rounded-full bg-destructive" />
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-foreground/70"
            >
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              id="email"
              type="email"
              placeholder="john@company.com"
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                errors.email
                  ? "border-destructive bg-destructive/5 focus:ring-2 focus:ring-destructive/30"
                  : "border-border/60 bg-white hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
            />
            {errors.email && (
              <p className="flex items-center gap-1.5 text-xs text-destructive font-medium">
                <span className="h-1 w-1 rounded-full bg-destructive" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group w-full rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] transition flex items-center justify-center gap-2 ${
              actionType === "enquire"
                ? "bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40"
                : "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
            } disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 transition group-hover:scale-110" />
                {config.buttonText}
              </>
            )}
          </button>

          {/* Info Message */}
          <div className="rounded-lg bg-foreground/5 px-4 py-3 border border-border/40 space-y-2">
            <p className="text-xs leading-relaxed text-foreground/70">
              {actionType === "enquire"
                ? "We'll contact you within 24 hours with detailed product information and support options."
                : "Your document will be available for download immediately after submission."}
            </p>

            {submitMessage && (
              <div className="mt-1 rounded-md bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700 border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                {submitMessage}
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
