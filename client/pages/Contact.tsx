import React, { useState } from "react";
import {
  Mail,
  Phone,
  User,
  MessageSquareText,
  Warehouse,
  Zap,
  Factory,
  ArrowRight,
  Users,
} from "lucide-react";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

// 👇 Change is here: base URL for backend
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      console.log("Submitting contact form to:", `${API_BASE_URL}/api/contact`);
      console.log("Payload:", form);

      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("Failed to submit contact form", res.status);
        alert("Something went wrong. Please try again.");
        return;
      }

      alert("Thank you! Your message has been sent.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Unable to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex gap-2">
              <div className="h-1.5 w-8 bg-white/70 rounded-full"></div>
              <div className="h-1.5 w-8 bg-white/70 rounded-full"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-white/90">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as quickly as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="container">
          <div className="space-y-12">
            {/* Contact Form - Top */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg max-w-4xl mx-auto w-full">
              <h2 className="mb-2 text-3xl font-black uppercase tracking-tighter text-primary">
                Send us a Message
              </h2>
              <p className="mb-8 text-foreground/70">
                Our team will get back to you shortly
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="group">
                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-wide text-foreground/70 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 group-focus-within:text-primary transition" />
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold uppercase tracking-wide text-foreground/70 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 group-focus-within:text-primary transition" />
                    <input
                      id="phone"
                      name="phone"
                      required
                      placeholder="Your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wide text-foreground/70 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40 group-focus-within:text-primary transition" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wide text-foreground/70 mb-2"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquareText className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-primary/40 group-focus-within:text-primary transition" />
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Your message here..."
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent/90 px-6 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95 mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && (
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  )}
                </button>

                <p className="text-xs text-foreground/60 text-center mt-4">
                  We'll respond within 24 hours
                </p>
              </form>
            </div>

            {/* (rest of your UI unchanged) */}
            {/* ... all your Product Division / Customer Care / Map sections ... */}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-200">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter text-primary">
              Visit Us
            </h2>
            <p className="text-lg text-foreground/70">
              Accord Power Digital Products Headquarters
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
            <iframe
              title="Accord Power Digital Products Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.563995686657!2d78.56908481487764!3d17.48057038802282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9c80b1235693%3A0x4fd5d867de73bcd4!2sAccord+Power+Digital+Products!5e0!3m2!1sen!2s!4v1502946530630"
              width="100%"
              height="500"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
