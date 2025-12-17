import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary/5">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:gap-8">
        <div className="flex items-center gap-4">
          <img
            src="https://accordpower.co.in/images/logo.png"
            alt="Accord Power"
            className="h-8 w-auto"
          />
          <div className="hidden border-l border-border pl-4 md:block">
            <p className="text-xs text-foreground/70">© {new Date().getFullYear()} Accord Power</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link to="/" className="text-xs font-semibold uppercase tracking-wide text-foreground/80 hover:text-accent transition">Home</Link>
          <Link to="/about" className="text-xs font-semibold uppercase tracking-wide text-foreground/80 hover:text-accent transition">About</Link>
          <Link to="/products" className="text-xs font-semibold uppercase tracking-wide text-foreground/80 hover:text-accent transition">Products</Link>
          <Link to="/contact" className="text-xs font-semibold uppercase tracking-wide text-foreground/80 hover:text-accent transition">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:040-27148666"
            className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 hover:text-accent transition"
          >
            <Phone className="h-3.5 w-3.5" />
            040-27148666
          </a>
          <a
            href="mailto:info@accordpower.co.in"
            className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 hover:text-accent transition"
          >
            <Mail className="h-3.5 w-3.5" />
            apcpl@accordpower.in
          </a>
        </div>
      </div>

      <div className="md:hidden border-t border-border py-3 text-center text-xs text-foreground/70">
        © {new Date().getFullYear()} Accord Power
      </div>
    </footer>
  );
}
