import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-primary/5">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <img
            src="https://accordpower.co.in/images/logo.png"
            alt="Accord Power"
            className="mb-4 h-10 w-auto"
          />
          <p className="text-sm text-foreground/80">
            ACCORD POWER CONVERSION PVT LTD (APCP) established in 2012, manufacturing Power Supplies and Chargers for
            Water Purifiers, Set Top Boxes, Laptops, Office Automation and more.
          </p>
          <Link
            to="/about"
            className="mt-4 inline-block rounded bg-accent px-4 py-2 text-white shadow-sm transition-colors hover:bg-accent/90"
          >
            Read More
          </Link>
        </div>

        <div>
          <h4 className="mb-4 text-base font-bold uppercase tracking-wide text-primary">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/products" className="hover:text-accent">Products</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base font-bold uppercase tracking-wide text-primary">Contact</h4>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> 123 Industrial Estate, City, State, India</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-accent" /> <a href="tel:+911234567890" className="hover:text-accent">+91 12345 67890</a></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-accent" /> <a href="mailto:info@accordpower.co.in" className="hover:text-accent">info@accordpower.co.in</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base font-bold uppercase tracking-wide text-primary">Newsletter</h4>
          <p className="mb-3 text-sm text-foreground/80">Subscribe for updates.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-sm gap-2">
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-foreground/70">
        © {new Date().getFullYear()} Accord Power
      </div>
    </footer>
  );
}
