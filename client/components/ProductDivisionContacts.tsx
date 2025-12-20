import React from "react";
import { Phone, Building2, Leaf } from "lucide-react";

interface RegionalContact {
  region: string;
  name: string;
  phone: string;
}

interface ProductDivision {
  title: string;
  icon: React.ReactNode;
  description?: string;
  contacts: RegionalContact[];
  bgColor: string;
  iconBgColor: string;
}

interface RegionalSupportState {
  states: string;
  languages: string;
  contact: string;
}

export default function ProductDivisionContacts() {
  const divisions: ProductDivision[] = [
    {
      title: "INDUSTRIAL & COMMERCIAL",
      description: "(RO, Water ATM, Auto Wells, etc)",
      icon: <Building2 className="h-6 w-6" />,
      bgColor: "bg-red-50",
      iconBgColor: "bg-blue-100 text-blue-600",
      contacts: [
        { region: "NORTH & WEST", name: "Shiva (Assistant Sales Manager)", phone: "+91 98765 43210" },
        { region: "SOUTH & EAST", name: "T Vinod (Assistant Sales Manager)", phone: "+91 98765 43211" },
      ],
    },
    {
      title: "WATER ATM PRODUCTS",
      icon: <Leaf className="h-6 w-6" />,
      bgColor: "bg-pink-50",
      iconBgColor: "bg-blue-100 text-blue-600",
      contacts: [
        { region: "NORTH & WEST", name: "Vamshi (Assistant Sales Manager)", phone: "+91 98765 43212" },
        { region: "SOUTH & EAST", name: "Sampath (Assistant Sales Manager)", phone: "+91 98765 43213" },
      ],
    },
    {
      title: "STARTERS PRODUCT",
      description: "(Domestic, Commercial, Agriculture)",
      icon: <Leaf className="h-6 w-6" />,
      bgColor: "bg-orange-50",
      iconBgColor: "bg-blue-100 text-blue-600",
      contacts: [
        { region: "ALL REGIONS", name: "Ranjit (Regional Manager)", phone: "+91 98765 43214" },
      ],
    },
  ];

  const regionalSupport: RegionalSupportState[] = [
    {
      states: "MH, OD, AP, TS, WB, GJ",
      languages: "Hindi / Telugu / English",
      contact: "7337363699",
    },
    {
      states: "KA, TN, KL",
      languages: "Tamil / English / Hindi",
      contact: "8977034147",
    },
    {
      states: "JM, HR, HP, DL, UP, BH, RJ, MP",
      languages: "Hindi / English",
      contact: "8977034148",
    },
  ];

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-primary mb-2">
            Product Division Contacts
          </h2>
          <p className="text-foreground/70">
            Specialized teams for each product line
          </p>
        </div>

        {/* Product Division Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {divisions.map((division, idx) => (
            <div
              key={idx}
              className={`${division.bgColor} rounded-2xl p-6 shadow-md border border-slate-200`}
            >
              {/* Card Header */}
              <div className="flex items-start gap-3 mb-6">
                <div className={`${division.iconBgColor} p-3 rounded-lg`}>
                  {division.icon}
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-accent mb-1">
                    {division.title}
                  </h3>
                  {division.description && (
                    <p className="text-xs text-foreground/60">
                      {division.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Contacts */}
              <div className="space-y-4">
                {division.contacts.map((contact, contactIdx) => (
                  <div key={contactIdx}>
                    <p className="text-xs font-bold uppercase text-accent mb-1">
                      {contact.region}
                    </p>
                    <p className="text-sm font-semibold text-primary mb-1">
                      {contact.name}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {contact.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Regional Support (Customer Care REMOVED) */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-md border border-blue-100">
            <h3 className="text-sm font-black uppercase tracking-wide text-secondary mb-2">
              Regional Support
            </h3>
            <p className="text-xs text-foreground/60 mb-6">
              Multi-language support across regions
            </p>

            <div className="overflow-hidden rounded-lg border border-blue-200">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-secondary to-secondary/80 p-4 text-white font-bold text-xs uppercase tracking-wide">
                <div>States</div>
                <div>Languages</div>
                <div className="text-right">Contact</div>
              </div>

              {/* Table Rows */}
              <div>
                {regionalSupport.map((support, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-3 gap-4 p-4 text-sm border-t border-blue-100 ${
                      idx % 2 === 0 ? "bg-white" : "bg-blue-50/50"
                    } hover:bg-blue-100/30 transition`}
                  >
                    <div className="font-semibold text-foreground">
                      {support.states}
                    </div>
                    <div className="text-foreground/70">
                      {support.languages}
                    </div>
                    <div className="text-right">
                      <a
                        href={`tel:${support.contact}`}
                        className="inline-flex items-center gap-2 font-bold text-secondary hover:text-secondary/80 transition"
                      >
                        <Phone className="h-4 w-4" />
                        {support.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
