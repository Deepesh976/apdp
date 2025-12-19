import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS_BY_SLUG } from "@/data/products";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  PhoneCall,
  X,
} from "lucide-react";

/* =========================
   Types
========================= */
type ActionType = "pdf" | "brochure";

type EnquiryForm = {
  name: string;
  email: string;
  phone: string;
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? PRODUCTS_BY_SLUG[slug] : undefined;

  const featureCount = product?.features?.length ?? 0;

  /* =========================
     Modal State
  ========================= */
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<EnquiryForm>({
    name: "",
    email: "",
    phone: "",
  });

  const heroHighlights = useMemo(() => {
    if (!product) return [];
    const items: { label: string; value: string }[] = [];
    if (featureCount) {
      items.push({ label: "Key Features", value: `${featureCount}` });
    }
    return items;
  }, [featureCount, product]);

  /* =========================
     No product
  ========================= */
  if (!product) {
    return (
      <section className="container py-20 text-center">
        <h1 className="mb-4 text-3xl font-extrabold uppercase text-primary">
          Product not found
        </h1>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-semibold uppercase text-white"
        >
          Browse Products <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  /* =========================
     Handlers
  ========================= */
  const openModal = (type: ActionType) => {
    setActionType(type);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setActionType(null);
    setForm({ name: "", email: "", phone: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!product || !actionType) return;

    if (!form.name || !form.email) {
      alert("Name and Email are required");
      return;
    }

    try {
      setLoading(true);

      /* =========================
         1️⃣ Save enquiry
      ========================= */
      const res = await fetch("/api/product-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          actionType,
          productSlug: product.slug,
          productTitle: product.title,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save enquiry");
      }

      /* =========================
         2️⃣ Resolve file safely
      ========================= */
      const filePath =
        actionType === "pdf"
          ? product.pdfUrl
          : product.brochureUrl;

      if (!filePath) {
        throw new Error("File not available");
      }

      // ✅ IMPORTANT FIX:
      // Extract ONLY the filename (backend expects this)
      const fileName = filePath.split("/").pop();

      if (!fileName) {
        throw new Error("Invalid file path");
      }

      /* =========================
         3️⃣ Trigger backend download
      ========================= */
      window.location.href = `/api/download?type=${actionType}&file=${encodeURIComponent(
        fileName
      )}`;

      closeModal();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="relative bg-white">
      {/* HERO */}
      <section className="relative h-[40vh] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 container flex flex-col justify-end pb-10 text-white">
          <span className="text-xs uppercase tracking-widest">
            {product.category}
          </span>
          <h1 className="mt-2 text-4xl font-extrabold uppercase">
            {product.title}
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container py-16 grid gap-12 xl:grid-cols-[2fr_1fr]">
        {/* LEFT */}
        <div className="space-y-10">
          {/* Overview */}
          <article className="rounded-3xl border p-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-primary">
              Overview
            </h2>
            <p className="mt-4 text-foreground/80">
              {product.description}
            </p>
          </article>

          {/* Features */}
          {featureCount > 0 && (
            <article className="rounded-3xl border p-8">
              <h3 className="text-base font-bold uppercase tracking-widest text-primary">
                Key Features
              </h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </article>
          )}

          {/* Documents */}
          <article className="rounded-3xl border p-8">
            <h3 className="text-base font-bold uppercase tracking-widest text-primary">
              Documents
            </h3>

            <div className="mt-6 grid gap-3">
              {product.pdfUrl && (
                <button
                  onClick={() => openModal("pdf")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-sm font-semibold uppercase text-white"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </button>
              )}

              {product.category !== "Accessories" &&
                product.brochureUrl && (
                  <button
                    onClick={() => openModal("brochure")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-4 text-sm font-semibold uppercase"
                  >
                    <FileText className="h-5 w-5" />
                    Download Brochure
                  </button>
                )}
            </div>

            <div className="mt-6 flex gap-3 rounded-xl bg-primary/10 p-4">
              <PhoneCall className="h-4 w-4 text-accent" />
              <p className="text-xs">
                Need customized info? Our engineers can help.
              </p>
            </div>
          </article>
        </div>

        {/* RIGHT */}
        <aside className="sticky top-32 rounded-3xl border p-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-full object-contain"
          />
        </aside>
      </section>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4"
            >
              <X />
            </button>

            <h3 className="mb-4 text-lg font-bold uppercase text-primary">
              Download {actionType === "pdf" ? "PDF" : "Brochure"}
            </h3>

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
              <input
                name="phone"
                placeholder="Phone No"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-lg bg-accent py-3 font-semibold text-white"
              >
                {loading ? "Processing..." : "Submit & Download"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
