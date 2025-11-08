import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const heroSlides = [
  "https://accordpower.co.in/images/header-slide/slide-1.jpg",
  "https://accordpower.co.in/images/header-slide/slide-2.jpg",
  "https://accordpower.co.in/images/header-slide/slide-3.jpg",
  "https://accordpower.co.in/images/header-slide/slide-4.jpg",
];

export default function Index() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);


  useEffect(() => {
    if (!emblaApi) return;
    let raf: number | undefined;
    const play = () => {
      raf = window.setTimeout(() => {
        emblaApi.scrollNext();
        play();
      }, 4500);
    };
    play();
    return () => raf && window.clearTimeout(raf);
  }, [emblaApi]);

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {heroSlides.map((src, idx) => (
              <div key={idx} className="relative min-w-0 shrink-0 grow-0 basis-full">
                <div className="relative w-full bg-black">
                  <img src={src} alt="Accord Power banner" className="block h-auto w-full max-h-[80vh] object-contain" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/0" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Overlay content */}
        <div className="pointer-events-none absolute inset-0">
          <div className="container flex h-full flex-col items-start justify-center gap-4 px-4">
            <h1 className="pointer-events-auto max-w-[85%] text-2xl font-extrabold uppercase leading-tight tracking-wide text-white drop-shadow sm:max-w-[70%] md:text-4xl md:max-w-[55%]">
              Control Panels & Digital Water Instruments
            </h1>
            <p className="pointer-events-auto max-w-[80%] text-sm text-white/90 sm:max-w-[60%] md:text-base">
              Reliable RO control panels, GSM-enabled systems and metering solutions engineered for performance and safety.
            </p>
            <div className="pointer-events-auto mt-2 flex flex-wrap gap-2">
              <Link
                to="/products"
                className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                View Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Phone className="h-4 w-4" /> Contact Sales
              </Link>
            </div>
          </div>
        </div>
        {/* Dots */}
        <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              className={`pointer-events-auto h-2.5 w-2.5 rounded-full border border-white/70 transition ${
                selectedIndex === i ? "bg-white" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container py-14 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg shadow-sm">
            <img
              src="https://accordpower.co.in/images/bg/about.jpg"
              alt="About Accord Power"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-extrabold uppercase tracking-wide text-primary">About Accord Power</h2>
            <p className="mb-4 text-foreground/80">
              ACCORD POWER CONVERSION PVT LTD (APCP) established in 2012, manufacturing Power Supplies and Chargers for
              Water Purifiers, Set Top Boxes, Laptops, Office Automation and more.
            </p>
            <p className="mb-6 text-foreground/80">
              Accord Power Digital Products (APDP) is a Group company of APCP, manufacturing RO Control Panels, Digital
              Water Regulating Instruments, LPS, HPS and Digital Flow Meter for RO Plants.
            </p>
            <Link
              to="/about"
              className="inline-block rounded bg-accent px-5 py-2.5 font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent/90"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-primary/5 py-14 md:py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-extrabold uppercase tracking-wide text-primary">Our Products</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* RO Control Panel */}
            <div>
              <h3 className="mb-4 border-b-2 border-accent pb-2 text-xl font-bold uppercase tracking-wide text-primary">RO Control Panel</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: "AP LED", image: "https://accordpower.co.in/images/products/01.jpg" },
                  { title: "AP Aqua", image: "https://accordpower.co.in/images/products/03.jpg" },
                  { title: "AP (1:1 1:3 3:3)", image: "https://accordpower.co.in/images/products/02.jpg" },
                  { title: "AP GSM", image: "https://accordpower.co.in/images/products/04.jpg" },
                ].map((p) => (
                  <Link
                    key={p.title}
                    to="/products"
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="max-h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="h-14 md:h-16 p-4 text-center text-sm font-semibold uppercase tracking-wide text-primary group-hover:text-accent flex items-center justify-center">
                      {p.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* Digital Water Regulating Instruments */}
            <div>
              <h3 className="mb-4 border-b-2 border-accent pb-2 text-xl font-bold uppercase tracking-wide text-primary">Digital Water Regulating Instruments</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: "Time Based – Single & Multi Coin", image: "https://accordpower.co.in/images/products/h5.jpg" },
                  { title: "Flow Based – Single & Multi Coin", image: "https://accordpower.co.in/images/products/h6.jpg" },
                  { title: "Flow Based – RFID Card", image: "https://accordpower.co.in/images/products/h7.jpg" },
                  { title: "Flow Based – RFID Card+Coin", image: "https://accordpower.co.in/images/products/h8.jpg" },
                ].map((p) => (
                  <Link
                    key={p.title}
                    to="/products"
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="max-h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="h-14 md:h-16 p-4 text-center text-sm font-semibold uppercase tracking-wide text-primary group-hover:text-accent flex items-center justify-center">
                      {p.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map + Contact Section */}
      <section className="container py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border shadow-sm">
            <iframe
              title="Accord Power Location"
              src="https://www.google.com/maps?q=ACCORD%20POWER%20CONVERSION%20PVT%20LTD&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-center rounded-lg border border-border bg-primary/5 p-6">
            <h3 className="mb-3 text-2xl font-bold uppercase tracking-wide text-primary">Talk to Us</h3>
            <p className="mb-4 text-foreground/80">
              Reach out for product details, specifications or custom requirements.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-accent/90"
              >
                Contact Form
              </Link>
              <a
                href="tel:+911234567890"
                className="inline-flex items-center rounded-md border border-input px-5 py-2.5 font-semibold uppercase tracking-wide text-primary transition hover:border-accent hover:text-accent"
              >
                Call +91 12345 67890
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
