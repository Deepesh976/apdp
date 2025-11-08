import { Link } from "react-router-dom";
import { Award, Factory, Lightbulb, Users } from "lucide-react";

const aboutCopy = {
  paragraphs: [
    "Accord Power Conversion Pvt Ltd (APCP) established in the year 2012, engaged into manufacturing of Power Supplies and Chargers for Water Purifiers, Set Top Boxes, Laptops, Office Automation and more.",
    "Accord Power Digital Products (APDP) is a Group company of APCP, engaged into manufacturing of RO Control Panels, Digital Water Regulating Instruments, Low Pressure Switch (LPS), High Pressure Switch (HPS) and Digital Flow Meter for Commercial/Industrial RO Plants.",
    "Right from inception, the manufacturing facilities and quality systems have been established in line with international product and quality standards. Accord products are approved by many states for their RO water plants.",
    "Accord philosophy is to focus on a specialized field of Power Conversion products with a commitment to serve global market needs with on-time services.",
    "Accord family is a 200-member highly motivated and qualified team with experienced functional heads. The R&D team continuously strives for innovative solutions, reliability and cost competitiveness.",
    "The team is headed by Mr. A. Venkat Reddy, who has an electronics background and over 20 years of experience in Power Electronics serving major OEMs in the country.",
  ],
};

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[32vh] w-full overflow-hidden md:h-[42vh]">
          <img
            src="https://accordpower.co.in/images/bg/about.jpg"
            alt="About Accord Power"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
          <div className="absolute inset-0">
            <div className="container flex h-full items-end pb-6">
              <div>
                <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white drop-shadow md:text-5xl">
                  About Us
                </h1>
                <nav className="mt-2 text-sm text-white/80">
                  <Link to="/" className="hover:text-white">Home</Link>
                  <span className="mx-2">/</span>
                  <span className="text-white">About</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="container py-12 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="mb-4 text-3xl font-extrabold uppercase tracking-wide text-primary">About Accord Power</h2>
            <div className="space-y-4 text-foreground/80">
              {aboutCopy.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-accent/90"
              >
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md border border-input px-5 py-2.5 font-semibold uppercase tracking-wide text-primary transition hover:border-accent hover:text-accent"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="order-1 overflow-hidden rounded-lg border border-border shadow-sm md:order-2">
            <img
              src="https://accordpower.co.in/images/bg/about.jpg"
              alt="Manufacturing and quality at Accord Power"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-primary/5 py-12 md:py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3 text-primary">
                <Factory className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">Established</h3>
              </div>
              <p className="text-3xl font-extrabold text-primary">2012</p>
              <p className="mt-1 text-sm text-foreground/70">Power supplies and chargers for RO, STB, laptops and more.</p>
            </div>
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3 text-primary">
                <Users className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">Team</h3>
              </div>
              <p className="text-3xl font-extrabold text-primary">200+</p>
              <p className="mt-1 text-sm text-foreground/70">Motivated and qualified team with experienced functional heads.</p>
            </div>
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3 text-primary">
                <Award className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">Quality</h3>
              </div>
              <p className="text-3xl font-extrabold text-primary">State-approved</p>
              <p className="mt-1 text-sm text-foreground/70">Facilities and systems aligned with global standards.</p>
            </div>
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3 text-primary">
                <Lightbulb className="h-5 w-5" />
                <h3 className="text-sm font-bold uppercase tracking-wide">Leadership</h3>
              </div>
              <p className="text-3xl font-extrabold text-primary">20+ yrs</p>
              <p className="mt-1 text-sm text-foreground/70">Led by Mr. A. Venkat Reddy with deep power electronics experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Capabilities */}
      <section className="container py-12 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xl font-bold uppercase tracking-wide text-primary">Our Philosophy</h3>
            <p className="text-foreground/80">
              We focus on a specialized field of Power Conversion products to meet global market needs with on-time services
              and dependable support. Our R&D relentlessly pursues innovation, reliability, and cost-effectiveness.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xl font-bold uppercase tracking-wide text-primary">Capabilities</h3>
            <ul className="space-y-2 text-foreground/80">
              <li>• RO Control Panels (AP LED, AP Aqua, AP GSM, AP 1:1/1:3/3:3)</li>
              <li>• Digital Water Regulating Instruments</li>
              <li>• Low/High Pressure Switches (LPS/HPS)</li>
              <li>• Digital Flow Meter for Commercial/Industrial RO Plants</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
