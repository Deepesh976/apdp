import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Phone, Zap, Shield, Droplets, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "../components/StatCard";

const heroSlides = [
  "https://accordpower.co.in/images/header-slide/slide-1.jpg",
  "https://accordpower.co.in/images/header-slide/slide-2.jpg",
  "https://accordpower.co.in/images/header-slide/slide-3.jpg",
  "https://accordpower.co.in/images/header-slide/slide-4.jpg",
];

const features = [
  {
    icon: Zap,
    title: "High Performance",
    description: "Engineered for optimal efficiency and reliability",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description: "Durable construction designed for demanding environments",
  },
  {
    icon: Droplets,
    title: "Water Smart",
    description: "Advanced metering and regulation solutions",
  },
];

const roProducts = [
  { title: "AP LED", image: "https://accordpower.co.in/images/products/01.jpg" },
  { title: "AP Aqua", image: "https://accordpower.co.in/images/products/03.jpg" },
  { title: "AP (1:1 1:3 3:3)", image: "https://accordpower.co.in/images/products/02.jpg" },
  { title: "AP GSM", image: "https://accordpower.co.in/images/products/04.jpg" },
];

const waterProducts = [
  { title: "Time Based – Single & Multi Coin", image: "https://accordpower.co.in/images/products/h5.jpg" },
  { title: "Flow Based – Single & Multi Coin", image: "https://accordpower.co.in/images/products/h6.jpg" },
  { title: "Flow Based – RFID Card", image: "https://accordpower.co.in/images/products/h7.jpg" },
  { title: "Flow Based – RFID Card+Coin", image: "https://accordpower.co.in/images/products/h8.jpg" },
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
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative overflow-hidden bg-black">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {heroSlides.map((src, idx) => (
              <div key={idx} className="relative min-w-0 shrink-0 grow-0 basis-full">
                <div className="relative w-full bg-black">
                  <img
                    src={src}
                    alt="Accord Power banner"
                    className="block h-auto w-full max-h-[90vh] object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="pointer-events-none absolute bottom-8 left-0 right-0 flex justify-center gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              className={`pointer-events-auto transition-all duration-300 ${
                selectedIndex === i
                  ? "h-3 w-8 bg-white rounded-full"
                  : "h-2.5 w-2.5 bg-white/40 rounded-full hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 py-12 md:py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const accentColors = ["bg-accent/10", "bg-primary/10", "bg-secondary/10"];
              const textColors = ["text-accent", "text-primary", "text-secondary"];
              return (
                <div
                  key={feature.title}
                  className="group relative flex flex-col items-center rounded-xl bg-white p-6 transition duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="absolute top-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-primary transition group-hover:w-16" />
                  <div className={`mb-3 flex justify-center rounded-lg ${accentColors[idx]} p-3 transition group-hover:scale-110`}>
                    <Icon className={`h-6 w-6 ${textColors[idx]}`} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-primary">{feature.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us & Statistics Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16 md:py-28">
        <div className="container">
          {/* About Us Content */}
          <div className="mb-16 max-w-3xl">
            <div className="mb-2 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-accent">
              About Us
            </div>
            <h2 className="mb-6 text-4xl font-black uppercase leading-tight tracking-tight text-primary md:text-5xl">
              A House Of Power Solutions
            </h2>
            <p className="mb-4 text-lg text-foreground/80 leading-relaxed">
              Accord Power Conversion Pvt. Ltd established in 2012. Specializes in manufacturing Electric Vehicle Chargers for 2-wheelers, 3-wheelers, and 4-wheelers, along with a diverse range of Power Supplies, Chargers, and Water Purifier Controllers. Set-Top-Boxes, Laptops, Office automation, and more.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Accord's products have received strong market acceptance, serving diverse sectors such as Electric Vehicles, Telecom, Water Purification, Set-Top Boxes, Laptops, and Industrial sectors. Accord Power is established as a trusted and reliable name in the power supply and EV charger manufacturing industry.
            </p>
            <Link
              to="/about"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold uppercase tracking-wide text-white transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
            >
              Read More
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Statistics Section */}
          <div>
            <h3 className="mb-12 text-center text-2xl font-bold uppercase tracking-tight text-foreground">
              Our Statistics
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard value={3} label="Manufacturing Units" />
              <StatCard value={50} suffix="+" label="Certified Products" />
              <StatCard value={500} suffix="+" label="Products" />
              <StatCard value={30} suffix="+" label="Industry Experience" />
              <StatCard value={700} suffix="+" label="Team" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-primary/90 to-accent py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase leading-tight tracking-tight text-white">
                Ready to Transform Your Water Solutions?
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Get in touch with our team to explore how our innovative control panels and metering solutions can optimize your operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold uppercase tracking-wide text-primary shadow-lg transition hover:shadow-xl hover:bg-slate-100 active:scale-95"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+911234567890"
                  className="group inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>
            <div className="hidden md:block rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                title="Accord Power Location"
                src="https://www.google.com/maps?q=ACCORD%20POWER%20CONVERSION%20PVT%20LTD&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Map */}
      <section className="md:hidden bg-white py-12 border-t border-slate-200">
        <div className="container">
          <h3 className="mb-6 text-2xl font-bold text-primary">Find Us</h3>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <iframe
              title="Accord Power Location"
              src="https://www.google.com/maps?q=ACCORD%20POWER%20CONVERSION%20PVT%20LTD&output=embed"
              width="100%"
              height="300"
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
