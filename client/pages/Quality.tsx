import { Award, FileText } from "lucide-react";
import CertificateCard from "@/components/CertificateCard";

export default function Quality() {
  const certificates = [
    {
      id: 1,
      name: "ISO 9001:2015",
      description: "Quality Management System certification ensuring consistent product and service quality across all operations",
      icon: Award,
      color: "primary" as const,
      images: [
        "https://cdn.builder.io/api/v1/image/assets%2Fb796bbaf4f9e4df49c0919506476eef0%2F3f532e6e98ef40d49b9c9be718120590?format=webp&width=800",
      ],
    },
    {
      id: 2,
      name: "CE Certification",
      description: "Compliance with European safety and health requirements for our products and manufacturing standards",
      icon: FileText,
      color: "accent" as const,
      images: [
        "https://cdn.builder.io/api/v1/image/assets%2Fb796bbaf4f9e4df49c0919506476eef0%2F25abae0d94be4a0cb159a23f91de85f1?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2Fb796bbaf4f9e4df49c0919506476eef0%2F9f9de6f7bd644339b59dbd1dd0140e01?format=webp&width=800",
      ],
    },
    {
      id: 3,
      name: "RoHS Compliance",
      description: "Restriction of Hazardous Substances compliance for environmental safety and sustainability",
      icon: Award,
      color: "primary" as const,
      images: [
        "https://cdn.builder.io/api/v1/image/assets%2Fb796bbaf4f9e4df49c0919506476eef0%2F669aa43b25204f07818a10fe4bf4643f?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2Fb796bbaf4f9e4df49c0919506476eef0%2F27b1f075c1f5486db35d05958875ba7b?format=webp&width=800",
      ],
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
            {/* Image Side */}
            <div className="flex justify-center order-2 md:order-1">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fb796bbaf4f9e4df49c0919506476eef0%2F9990711c794c4b25a632ab9a1b736d55?format=webp&width=800"
                alt="Quality Assurance Checkmark"
                className="w-full max-w-sm object-contain"
              />
            </div>

            {/* Content Side */}
            <div className="order-1 md:order-2">
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
              <CertificateCard
                key={cert.id}
                id={cert.id}
                name={cert.name}
                description={cert.description}
                icon={cert.icon}
                color={cert.color}
                images={cert.images}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
