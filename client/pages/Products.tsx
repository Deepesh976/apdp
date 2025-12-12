import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS as ALL_PRODUCTS, CATEGORIES } from "@/data/products";

type CategoryKey = (typeof CATEGORIES)[number];

export default function Products() {
  const [active, setActive] = useState<CategoryKey>("All");

  const filtered = useMemo(() => {
    if (active === "All") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.category === active);
  }, [active]);

  return (
    <div>
      {/* Header */}
      <section className="container py-10 md:py-16">
        <div className="flex flex-col items-start gap-4">
          <div>
            <h1 className="text-3xl font-extrabold uppercase tracking-wide text-primary md:text-4xl">Our Products</h1>
            <p className="mt-2 max-w-2xl text-foreground/80">
              Explore our RO control panels and digital water regulating instruments engineered for performance, safety and reliability.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                  active === c
                    ? "border-accent bg-accent text-white"
                    : "border-input bg-background text-primary hover:border-accent hover:text-accent"
                }`}
                aria-pressed={active === c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-12 md:pb-20">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <article key={p.slug} className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:shadow-md">
                <Link to={`/products/${p.slug}`} className="aspect-[4/3] overflow-hidden bg-muted/20 flex items-center justify-center">
                  <img src={p.image} alt={p.title} className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105" />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/60">{p.category}</span>
                  </div>
                  <Link to={`/products/${p.slug}`} className="h-14 md:h-16 flex items-center font-semibold uppercase tracking-wide text-primary group-hover:text-accent">
                    {p.title}
                  </Link>
                  <div className="mt-auto flex items-center gap-2 pt-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center rounded-md bg-accent px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-accent/90"
                    >
                      Enquire
                    </Link>
                    <Link
                      to={`/products/${p.slug}`}
                      className="inline-flex items-center rounded-md border border-input px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:border-accent hover:text-accent"
                    >
                      Specs
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
