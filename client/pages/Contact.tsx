import React, { useState } from "react";
import {
  Mail,
  Phone,
  User,
  MessageSquareText,
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
import ProductDivisionContacts from "../components/ProductDivisionContacts";

/* =====================
   Types
===================== */
type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

/* =====================
   Config
===================== */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/* =====================
   Component
===================== */
export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* =====================
     Handlers
  ===================== */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setSuccessMsg("");
    setErrorMsg("");

    /* ===== Frontend Validation ===== */
    if (form.name.trim().length < 2) {
      setErrorMsg("Please enter a valid name (min 2 characters).");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (form.message.trim().length < 5) {
      setErrorMsg("Message must be at least 5 characters long.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Submission failed");
      }

      setSuccessMsg("Thank you! Your message has been sent successfully.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setErrorMsg(
        err?.message || "Unable to send message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     JSX
  ===================== */
  return (
    <div className="min-h-screen">
      {/* ===== Hero ===== */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-12 md:py-16">
        <div className="container max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-white/90">
            Have questions? We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* ===== Contact Form ===== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h2 className="mb-2 text-3xl font-black uppercase tracking-tighter text-primary">
              Send us a Message
            </h2>
            <p className="mb-8 text-foreground/70">
              Our team will get back to you shortly
            </p>

            {/* Alerts */}
            {successMsg && (
              <div className="mb-6 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700">
                <CheckCircle className="h-5 w-5" />
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
                <XCircle className="h-5 w-5" />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                name="name"
                icon={<User />}
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Phone Number"
                name="phone"
                icon={<Phone />}
                placeholder="Your phone number"
                value={form.phone}
                onChange={handleChange}
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                icon={<Mail />}
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Textarea
                label="Message"
                name="message"
                icon={<MessageSquareText />}
                placeholder="Your message (minimum 5 characters)"
                value={form.message}
                onChange={handleChange}
                minLength={5}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent/90 px-6 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && (
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              <p className="text-xs text-foreground/60 text-center">
                We usually respond within 24 hours
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== Product Contacts ===== */}
      <ProductDivisionContacts />

      {/* ===== Map ===== */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-200">
        <div className="container max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-primary">
              Visit Us
            </h2>
            <p className="text-lg text-foreground/70">
              Accord Power Digital Products Headquarters
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
            <iframe
              title="Accord Power Digital Products Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.563995686657!2d78.56908481487764!3d17.48057038802282"
              width="100%"
              height="500"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* =====================
   Reusable Inputs
===================== */
function Input({
  label,
  icon,
  ...props
}: {
  label: string;
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-foreground/70 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">
          {icon}
        </span>
        <input
          {...props}
          className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
      </div>
    </div>
  );
}

function Textarea({
  label,
  icon,
  ...props
}: {
  label: string;
  icon: React.ReactNode;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wide text-foreground/70 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-4 text-primary/40">
          {icon}
        </span>
        <textarea
          {...props}
          rows={5}
          className="w-full resize-none rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
      </div>
    </div>
  );
}
