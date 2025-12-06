import { useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function NavItem({
  to,
  children,
  variant = "default",
}: {
  to: string;
  children: ReactNode;
  variant?: "default" | "highlight";
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        if (variant === "highlight") {
          return `inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            isActive ? "bg-accent/90" : "bg-accent"
          }`;
        }
        return `relative px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary/90 transition-colors hover:text-primary after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100 ${
          isActive ? "text-accent after:scale-x-100" : ""
        }`;
      }}
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-[1px_2px_7px_-2px_#1678bf]">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://accordpower.co.in/images/logo.png"
            alt="Accord Power"
            className="h-12 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About Us</NavItem>
          <NavItem to="/quality">Quality</NavItem>
          <a
            href="http://accordpower.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-4 py-2 text-sm font-semibold uppercase tracking-wide text-primary/90 transition-colors hover:text-primary after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
          >
            SMPS Division
          </a>
          <NavItem to="/products">Products</NavItem>
          <NavItem to="/contact" variant="highlight">
            Contact Us
          </NavItem>
        </nav>
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container flex flex-col py-2">
            <NavLink onClick={() => setOpen(false)} to="/" className="px-2 py-3 text-primary hover:text-accent">Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className="px-2 py-3 text-primary hover:text-accent">About Us</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/quality" className="px-2 py-3 text-primary hover:text-accent">Quality</NavLink>
            <a
              href="http://accordpower.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="px-2 py-3 text-primary hover:text-accent"
            >
              SMPS Division
            </a>
            <NavLink onClick={() => setOpen(false)} to="/products" className="px-2 py-3 text-primary hover:text-accent">Products</NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/contact"
              className={({ isActive }) =>
                `mt-2 inline-flex items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors ${
                  isActive ? "bg-accent/90" : "bg-accent"
                }`
              }
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
