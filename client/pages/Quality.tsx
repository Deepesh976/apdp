import { Award, FileText, X } from "lucide-react";
import { useState } from "react";

export default function Quality() {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const certificates = [
    {
      id: 1,
      name: "Accord CE Certificate",
      description: "AC-DC SMPS Based Charger - Compliance with European safety and health requirements for our products and manufacturing standards.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2Fbbc93858493b4b02b9468b1d7e0a9941?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2F5fe1fc70c5ff48959503a03edce4fc0e?format=webp&width=800",
      ],
      viewUrl: "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2Fbbc93858493b4b02b9468b1d7e0a9941?format=webp&width=800",
      color: "accent",
    },
    {
      id: 2,
      name: "ISO 9001:2015 Certificate",
      description: "Management system certification ensuring consistent product and service quality across all operations.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2Fe0a5b1011e0c4da6b1d7eb2b7eb43c6c?format=webp&width=800",
      ],
      viewUrl: "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2Fe0a5b1011e0c4da6b1d7eb2b7eb43c6c?format=webp&width=800",
      color: "primary",
    },
    {
      id: 3,
      name: "RoHS Compliance Certificate",
      description: "Restriction of Hazardous Substances compliance for environmental safety and sustainability of our products.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2Ff2fc7d47c2fe4ba9afb50c370c22f019?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2F00e3a1e2a0ce4cf1998f76f460e32bb7?format=webp&width=800",
      ],
      viewUrl: "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2Ff2fc7d47c2fe4ba9afb50c370c22f019?format=webp&width=800",
      color: "accent",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-accent py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex gap-2">
              <div className="h-1.5 w-8 bg-white/70 rounded-full"></div>
              <div className="h-1.5 w-8 bg-white/70 rounded-full"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">Quality Excellence</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              We are committed to delivering products and services of the highest quality that exceed our customers' expectations and meet international standards.
            </p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image on the Left */}
            <div className="flex justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2F72e6538ac5394874a8d09579db144341?format=webp&width=800"
                alt="Quality Commitment"
                className="w-full max-w-sm h-auto object-contain"
              />
            </div>

            {/* Content on the Right */}
            <div>
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 md:p-12">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-primary mb-6">Our Commitment to Quality</h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    At Accord Power, quality is not just a promise—it's a fundamental principle that guides every aspect of our business. From raw material procurement to final product delivery, we maintain rigorous standards and systematic quality control processes.
                  </p>
                  <p>
                    Our state-of-the-art manufacturing facilities are equipped with advanced testing and inspection equipment to ensure that every product meets or exceeds international quality standards. We invest continuously in technology, training, and processes to maintain the highest levels of excellence.
                  </p>
                  <p>
                    We hold multiple international certifications and comply with all relevant industry regulations, demonstrating our unwavering commitment to delivering reliable, safe, and high-performance products to our valued customers worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex gap-2">
              <div className="h-1.5 w-8 bg-accent rounded-full"></div>
              <div className="h-1.5 w-8 bg-accent rounded-full"></div>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-primary mb-4">Certifications & Standards</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our certifications demonstrate our commitment to international quality and safety standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:border-accent/50"
              >
                {/* Certificate Header */}
                <div className={`bg-gradient-to-r ${cert.color === 'primary' ? 'from-primary/10 to-primary/5' : 'from-accent/10 to-accent/5'} px-6 py-6`}>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-md group-hover:shadow-lg transition">
                    <FileText className={`h-6 w-6 ${cert.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                  </div>
                  <h3 className={`text-lg font-black uppercase tracking-tight ${cert.color === 'primary' ? 'text-primary' : 'text-accent'} line-clamp-2`}>
                    {cert.name}
                  </h3>
                </div>

                {/* Certificate Image with Hover Overlay */}
                <div className="p-4 border-t border-slate-200 flex justify-center">
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 group/image max-w-xs w-full">
                    <img
                      src={cert.images[0]}
                      alt={`${cert.name} - Preview`}
                      className="w-full h-auto object-cover"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setSelectedCertificate(cert)}
                        className={`inline-flex items-center gap-2 rounded-xl font-bold uppercase tracking-wide px-6 py-3 text-white transition-all ${
                          cert.color === 'primary'
                            ? 'bg-primary hover:bg-primary/90'
                            : 'bg-accent hover:bg-accent/90'
                        }`}
                      >
                        <FileText className="h-5 w-5" />
                        View Certificate
                      </button>
                    </div>
                  </div>
                </div>

                {/* Certificate Description */}
                <div className="p-4 border-t border-slate-200">
                  <p className="text-foreground/70 leading-relaxed text-sm line-clamp-3">
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className="sticky top-4 right-4 float-right z-10 flex items-center justify-center h-10 w-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>

            {/* Certificate Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-primary mb-6">{selectedCertificate.name}</h2>

              {/* Certificate Pages */}
              <div className="space-y-6">
                {selectedCertificate.images.map((image: string, idx: number) => (
                  <div key={idx} className="flex flex-col items-center">
                    <p className="text-sm text-foreground/60 mb-3 font-semibold uppercase tracking-wide">Page {idx + 1}</p>
                    <img
                      src={image}
                      alt={`${selectedCertificate.name} - Page ${idx + 1}`}
                      className="w-full h-auto object-contain rounded-lg border border-slate-300 shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
