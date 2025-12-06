import { Award, Download, FileText } from "lucide-react";

export default function Quality() {
  const certificates = [
    {
      id: 1,
      name: "ISO 9001:2015",
      description: "Quality Management System certification ensuring consistent product and service quality across all operations",
      icon: Award,
      color: "primary",
      downloadUrl: "#", // Add actual PDF URL here
    },
    {
      id: 2,
      name: "CE Certification",
      description: "Compliance with European safety and health requirements for our products and manufacturing standards",
      icon: FileText,
      color: "accent",
      downloadUrl: "#", // Add actual PDF URL here
    },
    {
      id: 3,
      name: "RoHS Compliance",
      description: "Restriction of Hazardous Substances compliance for environmental safety and sustainability",
      icon: Award,
      color: "primary",
      downloadUrl: "#", // Add actual PDF URL here
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
          <div className="max-w-3xl mx-auto">
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
                <div className={`bg-gradient-to-r ${cert.color === 'primary' ? 'from-primary/10 to-primary/5' : 'from-accent/10 to-accent/5'} px-8 py-8`}>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-md group-hover:shadow-lg transition">
                    <Award className={`h-8 w-8 ${cert.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                  </div>
                  <h3 className={`text-2xl font-black uppercase tracking-tight ${cert.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                    {cert.name}
                  </h3>
                </div>

                {/* Certificate Body */}
                <div className="p-8">
                  <p className="text-foreground/70 leading-relaxed mb-8">
                    {cert.description}
                  </p>

                  {/* Download Button */}
                  <a
                    href={cert.downloadUrl}
                    download
                    className={`inline-flex items-center gap-2 rounded-xl font-bold uppercase tracking-wide px-6 py-3 transition-all duration-300 ${
                      cert.color === 'primary'
                        ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg'
                        : 'bg-accent text-white hover:bg-accent/90 hover:shadow-lg'
                    }`}
                  >
                    <Download className="h-5 w-5" />
                    Download Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Info */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-4 inline-flex gap-2">
                <div className="h-1.5 w-8 bg-accent rounded-full"></div>
                <div className="h-1.5 w-8 bg-accent rounded-full"></div>
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-primary mb-6">Quality Assurance Process</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed mb-8">
                <p>
                  Every product undergoes rigorous testing and quality control procedures to ensure it meets our high standards before reaching our customers.
                </p>
                <p>
                  Our comprehensive QA process includes component testing, performance validation, environmental stress testing, and safety verification at every stage.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "Comprehensive component testing",
                  "Performance validation under various conditions",
                  "Environmental stress testing",
                  "Safety and compliance verification",
                  "Final inspection and packaging quality",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-2"></div>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-12 flex items-center justify-center min-h-96">
              <div className="text-center">
                <Award className="h-24 w-24 text-primary/40 mx-auto mb-6" />
                <p className="text-lg font-semibold text-primary/60">International Quality Standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
