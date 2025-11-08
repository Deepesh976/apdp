import { useCallback, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { PRODUCTS, PRODUCTS_BY_SLUG } from "@/data/products";
import { createProductPdf } from "@/lib/create-product-pdf";
import { ArrowRight, CheckCircle2, Download, PhoneCall } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? PRODUCTS_BY_SLUG[slug] : undefined;
  const [isGenerating, setIsGenerating] = useState(false);

  const featureCount = product?.features?.length ?? 0;
  const specCount = product?.specs.length ?? 0;
  const galleryCount = product?.gallery?.length ?? 0;

  const heroHighlights = useMemo(() => {
    if (!product) {
      return [] as Array<{ label: string; value: string }>;
    }

    const items: Array<{ label: string; value: string }> = [];

    if (featureCount) {
      items.push({ label: "Key Features", value: `${featureCount}` });
    }

    items.push({ label: "Specification Items", value: `${specCount}` });

    if (galleryCount) {
      items.push({ label: "Gallery Views", value: `${galleryCount}` });
    }

    return items;
  }, [featureCount, galleryCount, product, specCount]);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [] as typeof PRODUCTS;
    }

    return PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);
  }, [product]);

  const handleDownload = useCallback(async () => {
    if (!product) {
      return;
    }

    try {
      setIsGenerating(true);
      await createProductPdf(product);
    } catch (error) {
      console.error("Failed to generate product PDF", error);
      window.alert("Sorry, we couldn't prepare the PDF right now. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [product]);

  if (!product) {
    return (
      <section className="container py-20 text-center">
        <h1 className="mb-4 text-3xl font-extrabold uppercase tracking-wide text-primary">Product not found</h1>
        <p className="text-foreground/80">The product you are looking for does not exist. Please browse our catalog.</p>
        <div className="mt-6">
          <Link to="/products" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-semibold uppercase tracking-wide text-white hover:bg-accent/90">
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="relative bg-white">
      <section className="relative">
        <div className="relative h-[36vh] w-full overflow-hidden rounded-b-[40px] md:h-[46vh]">
          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0">
            <div className="container flex h-full flex-col justify-end gap-6 pb-12">
              <div className="max-w-2xl text-white">
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur">
                  {product.category}
                </span>
                <h1 className="mt-4 text-3xl font-extrabold uppercase tracking-wide drop-shadow md:text-5xl">{product.title}</h1>
                <nav className="mt-3 text-sm text-white/80">
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                  <span className="mx-2">/</span>
                  <Link to="/products" className="hover:text-white">
                    Products
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="text-white">{product.title}</span>
                </nav>
              </div>

              {heroHighlights.length ? (
                <div className="flex flex-wrap gap-3">
                  {heroHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="inline-flex min-w-[160px] flex-col rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] backdrop-blur transition hover:bg-white/15"
                    >
                      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/60">{item.label}</span>
                      <span className="mt-1 text-lg font-semibold leading-none text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 pb-16 pt-20 md:-mt-24 md:pb-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-white to-white" />
        <div className="container">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:items-start">
            <div className="space-y-10">
              <article className="flex items-center justify-center rounded-3xl border border-border/60 bg-white/95 p-6 shadow-lg shadow-primary/5 backdrop-blur">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[360px] w-full object-contain"
                />
              </article>
              <article className="rounded-3xl border border-border/60 bg-white/90 p-8 shadow-lg shadow-primary/5 backdrop-blur">
                <h2 className="text-lg font-bold uppercase tracking-[0.25em] text-primary">Overview</h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/80">{product.description}</p>
              </article>

              {featureCount ? (
                <article className="rounded-3xl border border-border/60 bg-white/95 p-8 shadow-lg shadow-primary/5 backdrop-blur">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-base font-bold uppercase tracking-[0.3em] text-primary">Key Features</h3>
                    <span className="rounded-full bg-primary/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-primary">
                      {featureCount} Highlights
                    </span>
                  </div>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {product.features?.map((feature) => (
                      <li
                        key={feature}
                        className="group flex h-full flex-col rounded-2xl border border-border/60 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <CheckCircle2 className="h-5 w-5" />
                          </span>
                          <p className="text-sm font-medium leading-relaxed text-primary/90">{feature}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              ) : null}

              {galleryCount ? (
                <article className="rounded-3xl border border-border/60 bg-white/95 p-8 shadow-lg shadow-primary/5 backdrop-blur">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-base font-bold uppercase tracking-[0.3em] text-primary">Gallery</h3>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">Swipe through deployments</span>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {product.gallery?.map((src) => (
                      <div key={src} className="overflow-hidden rounded-2xl border border-border/50">
                        <img src={src} alt={product.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                      </div>
                    ))}
                  </div>
                </article>
              ) : null}
            </div>

            <aside className="xl:sticky xl:top-32">
              <div className="rounded-3xl border border-border/60 bg-white/95 p-8 shadow-xl shadow-primary/10 backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/60">Technical Specifications</div>
                <dl className="mt-6 space-y-4">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="rounded-2xl border border-border/60 bg-white/90 p-4">
                      <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/60">{spec.label}</dt>
                      <dd className="mt-2 text-sm font-semibold text-primary">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-col gap-3">
                  <Link className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-sm transition hover:bg-accent/90" to="/contact">
                    Enquire Now
                  </Link>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-input px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Download className="h-4 w-4" /> {isGenerating ? "Preparing..." : "Download PDF"}
                  </button>
                </div>
                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-primary/5 px-4 py-3 text-xs font-medium text-primary/80">
                  <PhoneCall className="h-4 w-4 text-accent" />
                  Dedicated engineering support for custom plant automation projects.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="relative overflow-hidden py-14">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
          <div className="container">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold uppercase tracking-[0.3em] text-primary">Complementary Solutions</h3>
                <p className="mt-1 text-sm text-foreground/70">Explore additional systems that pair perfectly with {product.title}.</p>
              </div>
              <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-accent hover:text-accent/80">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.slug}
                  to={`/products/${related.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white/95 shadow-sm transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-foreground/60">{related.category}</div>
                    <div className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary transition group-hover:text-accent">
                      {related.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
