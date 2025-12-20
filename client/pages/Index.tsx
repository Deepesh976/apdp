import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Phone, Zap, Shield, Droplets, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "../components/StatCard";

import L, { LatLngExpression, Map as LeafletMap } from "leaflet";
// IMPORTANT: keep this in App.tsx (not here):
// import "leaflet/dist/leaflet.css";

const heroSlides = [
  "/slides/1.png",
  "/slides/2.png",
  "/slides/3.png",
  "/slides/4.png",
  "/slides/5.png"
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

// type for API data
type CustomerLocation = {
  id: string | number;
  name: string;
  lat: number;
  lng: number;
};

// 🔹 Approximate centres for major Indian states (you can add/remove as needed)
const indiaStateCenters: { name: string; lat: number; lng: number }[] = [
  { name: "Jammu & Kashmir", lat: 33.5, lng: 76.0 },
  { name: "Himachal Pradesh", lat: 31.7, lng: 77.2 },
  { name: "Punjab", lat: 31.0, lng: 75.0 },
  { name: "Haryana", lat: 29.0, lng: 76.0 },
  { name: "Uttarakhand", lat: 30.0, lng: 79.0 },
  { name: "Uttar Pradesh", lat: 26.8, lng: 80.9 },
  { name: "Rajasthan", lat: 26.9, lng: 73.9 },
  { name: "Gujarat", lat: 22.3, lng: 72.6 },
  { name: "Madhya Pradesh", lat: 23.3, lng: 77.4 },
  { name: "Bihar", lat: 25.6, lng: 85.1 },
  { name: "Jharkhand", lat: 23.6, lng: 85.3 },
  { name: "West Bengal", lat: 22.5, lng: 88.3 },
  { name: "Odisha", lat: 20.9, lng: 85.1 },
  { name: "Chhattisgarh", lat: 21.3, lng: 82.0 },
  { name: "Maharashtra", lat: 19.7, lng: 75.7 },
  { name: "Telangana", lat: 18.1, lng: 79.0 },
  { name: "Andhra Pradesh", lat: 15.9, lng: 79.7 },
  { name: "Karnataka", lat: 15.3, lng: 75.7 },
  { name: "Tamil Nadu", lat: 11.1, lng: 78.6 },
  { name: "Kerala", lat: 10.3, lng: 76.2 },
  { name: "Assam", lat: 26.2, lng: 92.9 },
  { name: "Nagaland", lat: 26.0, lng: 94.2 },
  { name: "Manipur", lat: 24.8, lng: 93.9 },
  { name: "Meghalaya", lat: 25.5, lng: 91.3 },
  { name: "Tripura", lat: 23.8, lng: 91.3 },
  { name: "Mizoram", lat: 23.2, lng: 92.9 },
  { name: "Sikkim", lat: 27.3, lng: 88.6 },
  { name: "Goa", lat: 15.3, lng: 74.1 },
];

// 🔹 Modern custom marker icon with gradient background
const createModernMarker = (color: string = "#176fb7") => {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 48" width="24" height="29">
      <defs>
        <linearGradient id="markerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustColorBrightness(color, -20)};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
      <path d="M 20 0 C 12.27 0 6 6.27 6 14 C 6 23 20 48 20 48 C 20 48 34 23 34 14 C 34 6.27 27.73 0 20 0 Z"
            fill="url(#markerGradient)" filter="url(#shadow)" stroke="white" stroke-width="2"/>
      <circle cx="20" cy="14" r="6" fill="white" opacity="0.95"/>
      <circle cx="20" cy="14" r="4" fill="${color}" opacity="0.9"/>
    </svg>
  `;
  const encodedSvg = encodeURIComponent(svgString);
  return L.icon({
    iconUrl: `data:image/svg+xml;charset=UTF-8,${encodedSvg}`,
    iconSize: [24, 29],
    iconAnchor: [12, 29],
    popupAnchor: [0, -29],
    shadowSize: [0, 0],
  });
};

// Helper function to adjust color brightness
const adjustColorBrightness = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
};

const DefaultIcon = createModernMarker("#176fb7");
L.Marker.prototype.options.icon = DefaultIcon;

// ---------- MAP COMPONENT (plain Leaflet) ----------

function CustomerMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return; // already created

    // init map centered on India
    const map = L.map(containerRef.current).setView([22.5, 79], 5);
    mapRef.current = map;

    // base tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // when user clicks → show marker with coordinates
    let clickMarker: L.Marker | null = null;
    map.on("click", (e: L.LeafletMouseEvent) => {
      if (clickMarker) {
        clickMarker.remove();
      }
      clickMarker = L.marker(e.latlng, { icon: createModernMarker("#d6412c") }).addTo(map);
      clickMarker
        .bindPopup(
          `<div class="text-sm"><strong class="block text-primary mb-1">Clicked Location</strong>Lat: ${e.latlng.lat.toFixed(4)}<br/>Lng: ${e.latlng.lng.toFixed(4)}</div>`
        )
        .openPopup();
    });

    // 🔸 1) fetch customer locations from API and add markers
    fetch("/api/customer-locations")
      .then((res) => res.json())
      .then((data: CustomerLocation[]) => {
        data.forEach((loc) => {
          const pos: LatLngExpression = [loc.lat, loc.lng];
          L.marker(pos, { icon: createModernMarker("#176fb7") })
            .addTo(map)
            .bindPopup(
              `<div class="text-sm"><strong class="block text-primary mb-1">${loc.name}</strong>Lat: ${loc.lat.toFixed(
                4
              )}, Lng: ${loc.lng.toFixed(4)}</div>`
            );
        });
      })
      .catch((err) => {
        console.error("Error loading customer locations:", err);
      });

    // 🔸 2) auto-generate random “customers” for each India state
    indiaStateCenters.forEach((state) => {
      // number of demo customers per state (change as needed)
      const numCustomers = 3 + Math.floor(Math.random() * 3); // 3–5 customers

      for (let i = 0; i < numCustomers; i++) {
        const jitterLat = (Math.random() - 0.5) * 0.6; // small random offset
        const jitterLng = (Math.random() - 0.5) * 0.6;

        const lat = state.lat + jitterLat;
        const lng = state.lng + jitterLng;

        const customerIcon = createModernMarker("#018fd1");
        L.marker([lat, lng], { icon: customerIcon })
          .addTo(map)
          .bindPopup(`<div class="text-sm"><strong class="block text-primary mb-1">Customer</strong>State: ${state.name}</div>`);
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative z-0 w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

// ---------- PAGE COMPONENT ----------

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
    return () => {
      if (raf) window.clearTimeout(raf);
    };
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
                    className="block w-full h-auto object-cover object-center"
                    decoding="async"
                    loading="eager"
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
                  <div
                    className={`mb-3 flex justify-center rounded-lg ${accentColors[idx]} p-3 transition group-hover:scale-110`}
                  >
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
          {/* About Us Content with Image */}
          <div className="mb-16 grid gap-12 items-center md:grid-cols-2">
            <div>
              <div className="mb-2 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-accent">
                About Us
              </div>
              <h2 className="mb-6 text-4xl font-black uppercase leading-tight tracking-tight text-primary md:text-5xl">
                A House Of Power Solutions
              </h2>
              <p className="mb-4 text-lg text-foreground/80 leading-relaxed">
                Accord Power Conversion Pvt. Ltd established in 2012. Specializes in manufacturing Electric Vehicle Chargers
                for 2-wheelers, 3-wheelers, and 4-wheelers, along with a diverse range of Power Supplies, Chargers, and Water
                Purifier Controllers. Set-Top-Boxes, Laptops, Office automation, and more.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Accord's products have received strong market acceptance, serving diverse sectors such as Electric Vehicles,
                Telecom, Water Purification, Set-Top Boxes, Laptops, and Industrial sectors. Accord Power is established as a
                trusted and reliable name in the power supply and EV charger manufacturing industry.
              </p>
              <Link
                to="/about"
                className="group mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold uppercase tracking-wide text-white transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
              >
                Read More
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="flex justify-center">
<img
  src="/slides/main.png"
  alt="Accord Power Digital Products"
  className="w-full max-w-md h-auto"
 />
            </div>
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

      {/* CTA Section with Map */}
      <section className="bg-gradient-to-r from-primary via-primary/90 to-accent py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase leading-tight tracking-tight text-white">
                Ready to Transform Your Water Solutions?
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Get in touch with our team to explore how our innovative control panels and metering solutions can optimize
                your operations.
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
                  href="tel:040-27148666"
                  className="group inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="mb-8 text-center text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
                Our Client Locations
              </h3>
              <div className="hidden md:block rounded-2xl overflow-hidden shadow-2xl">
                <CustomerMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Map */}
      <section className="md:hidden bg-white py-12 border-t border-slate-200">
        <div className="container">
          <h3 className="mb-6 text-center text-3xl font-bold uppercase tracking-tight text-primary">Our Client Locations</h3>
          <div className="overflow-hidden rounded-xl shadow-lg">
            <CustomerMap />
          </div>
        </div>
      </section>
    </div>
  );
}
