import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, Factory, Lightbulb, Users, ArrowRight, CheckCircle, Zap, Shield, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const aboutCopy = {
  paragraphs: [
    "Accord Power Conversion Pvt Ltd (APCP) established in the year 2012, engaged into manufacturing of Power Supplies and Chargers for Water Purifiers, Set Top Boxes, Laptops, Office Automation and more.",
    "Accord Power Digital Products (APDP) is a Group company of APCP, engaged into manufacturing of RO Control Panels, Digital Water Regulating Instruments, Low Pressure Switch (LPS), High Pressure Switch (HPS) and Digital Flow Meter for Commercial/Industrial RO Plants.",
  ],
  vision: "To focus on specialized Power Conversion products meeting global market needs with on-time services and dependable support.",
  mission: "Continuous innovation, reliability, and cost-competitiveness through dedicated R&D and a passionate team.",
  values: "Driven by integrity, responsibility, excellence, innovation, and unity—creating sustainable value for people, partners, and the planet.",
};

const achievements = [
  { icon: Factory, title: "Established 2012", description: "Over a decade of excellence in power solutions" },
  { icon: Users, title: "200+ Team Members", description: "Experienced professionals driving innovation" },
  { icon: Award, title: "State Approved", description: "Quality systems aligned with global standards" },
  { icon: Zap, title: "20+ Years Experience", description: "Led by power electronics industry veterans" },
];

const capabilities = [
  "RO Control Panels (AP LED, AP Aqua, AP GSM, AP 1:1/1:3/3:3)",
  "Digital Water Regulating Instruments",
  "Low & High Pressure Switches (LPS/HPS)",
  "Digital Flow Meter for Commercial/Industrial RO",
];

const standards = [
  "ISO Certified Manufacturing",
  "International Quality Standards",
  "Global Market Approved",
  "24/7 Quality Assurance",
];

const milestones = [
  {
    year: 2012,
    title: "Genesis of the Journey",
    description: "Marking the genesis of its journey, Accord embarked on crafting adapters for water purifying & telecom applications. 5000 sft area.",
    position: "right",
    color: "bg-red-400",
  },
  {
    year: 2013,
    title: "ISO Certification",
    description: "Accord gets ISO 9001:2008 'certified, a testament' to its commitment to excellence.",
    position: "left",
    color: "bg-blue-400",
  },
  {
    year: 2014,
    title: "Preferred Vendor Status",
    description: "Accord became as the preferred vendor for 'the top 10 OEMs, solidifying its position within the industry'.",
    position: "right",
    color: "bg-green-400",
  },
  {
    year: 2015,
    title: "APDP Launch",
    description: "Initiated APDP towards produ cing products tailored for commercial water plants.",
    position: "left",
    color: "bg-orange-400",
  },
  {
    year: 2017,
    title: "BIS Certification",
    description: "Accord becomes the first 'India in company to secure approval for over 50 products from BIS, a testament to its unwavering dedication to quality'.",
    position: "right",
    color: "bg-red-400",
  },
  {
    year: 2021,
    title: "Facility Expansion",
    description: "The company expanded by 'establish ing a state-of-the-art facility, encompassing 'an additional 20,000 sft area' dedicated to Adapters and a separate division for EV products.",
    position: "left",
    color: "bg-blue-400",
  },
  {
    year: 2022,
    title: "EV Unit Transition",
    description: "EV unit transitioned to a grand '50,000 sft space, achieving approval from ARAI & ICAT for its line of prod ucts, marking a' milestone in innovation & compliance.",
    position: "right",
    color: "bg-green-400",
  },
  {
    year: 2023,
    title: "SMT Facility",
    description: "Development of a fully automatic 'SMT facility, enabling the prod uction of 1.0L EV Chargers per month,' underscoring the company's commitment to cutting-edge manufacturing.",
    position: "left",
    color: "bg-orange-400",
  },
  {
    year: 2024,
    title: "Expansion",
    description: "Manufacturing facility added another 40,000 sft with this 1 million adapters and charger can be produced.",
    position: "right",
    color: "bg-red-400",
  },
];

const featuredDirector = {
  name: "MR. Adla Venkat Reddy",
  title: "Managing Director",
  email: "venkatreddy@accordpower.in",
  image: "https://cdn.builder.io/api/v1/image/assets%2Fa66adcbac1bb4c45a49f85c01e8b6cac%2Fbb98cb5564b54c40b6977b07f8b5e1a2?format=webp&width=800",
  bio: "Mr. Adla Venkat Reddy boasts an impressive 30-year tenure in the manufacturing sector. Drawing from his extensive experience and firm understanding of the industry, he took the bold step to establish his own venture in 2012. Since then, Accord has blossomed under his visionary leadership, transforming from a nascent startup into an entrepreneurial powerhouse. Mr. Reddy excels in positioning Accord Power Group's Power Conversion as a beacon of inspiration for aspiring business leaders worldwide.",
};

const directors = [
  {
    name: "Sampath Reddy",
    title: "Technical Director",
    email: "sampath@accordpower.in",
    avatar: "SR",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fa66adcbac1bb4c45a49f85c01e8b6cac%2Fa8923a2db39f48f69d365eeaded5da93?format=webp&width=800",
  },
  {
    name: "Gaurav Saini",
    title: "Managing Partner",
    email: "gaurav@accordpower.in",
    avatar: "GS",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fa66adcbac1bb4c45a49f85c01e8b6cac%2F2b0ede6a28f7435091fdce8315da9d7a?format=webp&width=800",
  },
  {
    name: "Ritu Saini",
    title: "Director",
    email: "ritu@accordpower.in",
    avatar: "RS",
  },
];

const coreTeam = [
  {
    name: "Ch. Ramesh",
    title: "GM-VD",
    email: "ramesh@accordpower.in",
    phone: "+91 9963800655",
    avatar: "CR",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fa66adcbac1bb4c45a49f85c01e8b6cac%2F5357034d867143b299d1f65b94efb8c3?format=webp&width=800",
  },
  {
    name: "Ch. Nagini",
    title: "Corporate HR",
    email: "hr@accordpower.in",
    phone: "+91 9963800455",
    avatar: "CN",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fa66adcbac1bb4c45a49f85c01e8b6cac%2F333a2f773f7a4335a5c0684dac261e8a?format=webp&width=800",
  },
  {
    name: "N. Nageshwer Rao",
    title: "CFO",
    email: "nageshwer@accordpower.in",
    avatar: "NNR",
    image: "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2F28fb3c472d154849b1e3edff87b25095?format=webp&width=800",
  },
  {
    name: "J. Dhileep",
    title: "Finance & Accounts",
    email: "dhileep@accordpower.in",
    avatar: "JD",
    image: "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2F1b4d9b049cf84c238910c089446e6040?format=webp&width=800",
  },
  {
    name: "Prasanth Lenke",
    title: "HOD - Design",
    email: "prasanth@accordpower.in",
    avatar: "PL",
  },
  {
    name: "A. Srikanth Reddy",
    title: "MR & MO (Control Panel ATW Factory)",
    email: "srikanth@accordpower.in",
    avatar: "SR",
    image: "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2F0ddb17f77a2c4f8c9dcbd8fd899273da?format=webp&width=800",
  },
  {
    name: "K. Muralidhar Rao",
    title: "Manager - Service",
    email: "muralidhar@accordpower.in",
    avatar: "MR",
    image: "https://cdn.builder.io/api/v1/image/assets%2F9a1d4ad4fe7e43f68ea68c823395ac46%2F8e8c3244c8dd4880a74b4829dc39dc12?format=webp&width=800",
  },
];

type ProfileType = 'director' | 'coreTeam' | null;

interface SelectedProfile {
  type: ProfileType;
  data: any;
}

export default function About() {
  const [selectedProfile, setSelectedProfile] = useState<SelectedProfile | null>(null);

  const openProfile = (type: ProfileType, data: any) => {
    setSelectedProfile({ type, data });
  };

  const closeProfile = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 md:pt-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-accent">
                Our Story
              </div>
              <h1 className="mb-6 text-5xl font-black uppercase leading-tight tracking-tighter text-primary sm:text-6xl">
                Accord Power Excellence
              </h1>
              <p className="mb-6 text-lg text-foreground/75 leading-relaxed max-w-xl">
                Leading the industry since 2012 with innovative power conversion solutions and water management systems trusted by hundreds of clients worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent/90 px-8 py-4 font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                  View Products
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-xl border-2 border-primary/20 bg-white px-8 py-4 font-bold uppercase tracking-wide text-primary shadow-md transition-all hover:border-primary hover:bg-primary/5 active:scale-95"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://accordpower.co.in/images/bg/about.jpg"
                  alt="Accord Power facilities"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <img
            src="https://accordpower.co.in/images/bg/about.jpg"
            alt="About Accord Power"
            className="h-auto w-full object-cover max-h-96 lg:hidden rounded-b-2xl"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 transition hover:shadow-lg hover:border-accent"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 transition group-hover:bg-accent/20">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 font-bold text-primary uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="container py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-4xl font-black uppercase leading-tight tracking-tighter text-primary">
                Who We Are
              </h2>
              <p className="text-lg text-foreground/75 leading-relaxed">
                {aboutCopy.paragraphs[0]}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
              <p className="text-foreground/80 leading-relaxed">
                {aboutCopy.paragraphs[1]}
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-8 hover:shadow-lg transition">
              <h3 className="mb-3 flex items-center gap-3 font-bold text-primary uppercase tracking-wide">
                <Shield className="h-5 w-5 text-accent" />
                Quality Commitment
              </h3>
              <p className="text-sm text-foreground/70">Manufacturing facilities and quality systems established in line with international standards. Approved by multiple states for RO water plants.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-8 hover:shadow-lg transition">
              <h3 className="mb-3 flex items-center gap-3 font-bold text-primary uppercase tracking-wide">
                <Lightbulb className="h-5 w-5 text-accent" />
                Innovation Focus
              </h3>
              <p className="text-sm text-foreground/70">R&D team continuously strives for innovative solutions, reliability, and cost-competitiveness across all product lines.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-8 hover:shadow-lg transition">
              <h3 className="mb-3 flex items-center gap-3 font-bold text-primary uppercase tracking-wide">
                <Award className="h-5 w-5 text-accent" />
                Global Reach
              </h3>
              <p className="text-sm text-foreground/70">Focused on serving global market needs with on-time services and dependable support to OEMs and enterprises worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="bg-gradient-to-b from-white via-slate-50/50 to-white py-20 md:py-32">
        <div className="container">
          <div className="mb-20 text-center">
            <div className="mb-4 inline-flex gap-2">
              <div className="h-1.5 w-8 bg-accent rounded-full"></div>
              <div className="h-1.5 w-8 bg-accent rounded-full"></div>
            </div>
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter text-primary">Our Journey</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground/70">Milestones of growth and innovation since 2012</p>
          </div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-16">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative group">
                  {/* Center Dot */}
                  <div className="absolute left-1/2 top-8 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-white bg-accent shadow-lg z-10 hidden md:block group-hover:scale-125 transition-transform duration-300" />

                  {/* Content Container */}
                  <div className={`flex flex-col md:flex-row ${milestone.position === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-0`}>
                    {/* Year Badge */}
                    <div className={`flex ${milestone.position === 'left' ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} justify-start md:w-1/2`}>
                      <div className={`flex items-center justify-center h-24 w-24 rounded-full ${milestone.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
                        <div className="text-2xl font-black tabular-nums text-center">{milestone.year}</div>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block w-0" />

                    {/* Description Card */}
                    <div className={`md:w-1/2 flex ${milestone.position === 'left' ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="w-full rounded-2xl bg-white p-8 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 hover:border-accent/30 group-hover:translate-y--1">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                          <h3 className="font-bold text-primary uppercase tracking-wide text-base">{milestone.title}</h3>
                        </div>
                        <p className="text-sm text-foreground/70 leading-relaxed pl-6">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Stats */}
          <div className="mt-20 grid gap-6 md:grid-cols-3 pt-12 border-t border-slate-200">
            <div className="text-center group">
              <div className="text-4xl font-black text-accent mb-2 group-hover:scale-110 transition-transform">{milestones.length}</div>
              <p className="text-sm uppercase tracking-wide text-foreground/60">Major Milestones</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">{milestones[milestones.length - 1].year - milestones[0].year + 1}</div>
              <p className="text-sm uppercase tracking-wide text-foreground/60">Years of Excellence</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">∞</div>
              <p className="text-sm uppercase tracking-wide text-foreground/60">Continuous Growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission & Values */}
      <section className="bg-gradient-to-r from-primary/95 via-primary/90 to-accent py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-8">
              <div className="mb-4 inline-flex rounded-lg bg-white/20 p-3">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-wide text-white">Our Vision</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                {aboutCopy.vision}
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-8">
              <div className="mb-4 inline-flex rounded-lg bg-white/20 p-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-wide text-white">Our Mission</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                {aboutCopy.mission}
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-8">
              <div className="mb-4 inline-flex rounded-lg bg-white/20 p-3">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold uppercase tracking-wide text-white">Our Values</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                {aboutCopy.values}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities & Standards */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-3xl font-black uppercase tracking-tighter text-primary">Our Capabilities</h2>
            <div className="space-y-4">
              {capabilities.map((capability, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-md transition">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground/80">{capability}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-8 text-3xl font-black uppercase tracking-tighter text-primary">Quality Standards</h2>
            <div className="space-y-4">
              {standards.map((standard, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 hover:shadow-md transition">
                  <Award className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground/80">{standard}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16 md:py-24">
        <div className="container">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex gap-2">
              <div className="h-1.5 w-8 bg-accent rounded-full"></div>
              <div className="h-1.5 w-8 bg-accent rounded-full"></div>
            </div>
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter text-primary">Directors</h2>
          </div>

          {/* Featured Director */}
          <div
            onClick={() => openProfile('director', featuredDirector)}
            className="mb-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg md:p-12 cursor-pointer transition hover:shadow-2xl hover:border-accent/50"
          >
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-64 rounded-full bg-white overflow-hidden flex items-center justify-center transition">
                  {featuredDirector.image ? (
                    <img
                      src={featuredDirector.image}
                      alt={featuredDirector.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="text-6xl font-bold text-accent">AVR</div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-3xl font-black uppercase tracking-tighter text-primary">{featuredDirector.name}</h3>
                <p className="mb-4 text-lg font-semibold uppercase tracking-wide text-accent">{featuredDirector.title}</p>
                <p className="mb-6 text-foreground/80 leading-relaxed">
                  {featuredDirector.bio}
                </p>
                <a href={`mailto:${featuredDirector.email}`} className="text-sm font-semibold text-primary hover:text-accent transition">
                  {featuredDirector.email}
                </a>
              </div>
            </div>
          </div>

          {/* Other Directors */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {directors.map((director) => (
              <div
                key={director.name}
                onClick={() => openProfile('director', director)}
                className="group rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm hover:shadow-lg transition cursor-pointer hover:border-accent/50"
              >
                <div className="mb-6 flex justify-center">
                  <div className="h-40 w-40 rounded-full bg-white overflow-hidden flex items-center justify-center text-white text-4xl font-bold transition">
                    {director.image ? (
                      <img
                        src={director.image}
                        alt={director.name}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center group-hover:from-primary/50 group-hover:to-accent/50">
                        {director.avatar}
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="mb-2 font-bold text-primary text-lg">{director.name}</h3>
                <p className="mb-3 text-sm uppercase tracking-wide text-accent font-semibold">{director.title}</p>
                <a href={`mailto:${director.email}`} className="text-sm text-foreground/60 hover:text-primary transition">
                  {director.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex gap-2">
              <div className="h-1.5 w-8 bg-accent rounded-full"></div>
              <div className="h-1.5 w-8 bg-accent rounded-full"></div>
            </div>
            <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter text-primary">Core Team</h2>
          </div>

          {/* Team Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {coreTeam.map((member) => (
              <div
                key={member.name}
                onClick={() => openProfile('coreTeam', member)}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 text-center shadow-sm hover:shadow-lg transition cursor-pointer hover:border-accent/50"
              >
                <div className="mb-4 flex justify-center">
                  <div className="h-40 w-40 rounded-full bg-white overflow-hidden flex items-center justify-center text-white text-2xl font-bold transition">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center group-hover:from-primary/40 group-hover:to-accent/40">
                        {member.avatar}
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="mb-1 font-bold text-primary text-lg">{member.name}</h3>
                <p className="mb-1 text-xs uppercase tracking-wide text-accent font-semibold">{member.title}</p>
                {(member.name === "Ch. Ramesh" || member.name === "Ch. Nagini") && member.phone && (
                  <p className="mb-3 text-xs text-foreground/60">{member.phone}</p>
                )}
                {member.subtitle && !["Ch. Ramesh", "Ch. Nagini"].includes(member.name) && (
                  <p className="mb-3 text-xs text-foreground/60 uppercase tracking-wide">{member.subtitle}</p>
                )}
                {!member.subtitle && !["Ch. Ramesh", "Ch. Nagini"].includes(member.name) && <div className="mb-3 h-4"></div>}
                {member.name === "N. Nageshwer Rao" && member.phone && (
                  <a href={`tel:${member.phone}`} className="text-xs text-foreground/60 hover:text-primary transition break-all">
                    {member.phone}
                  </a>
                )}
                {member.name === "J. Dhileep" && (
                  <p className="text-xs text-foreground/60">Finance & Accounts</p>
                )}
                {!["N. Nageshwer Rao", "J. Dhileep", "Prasanth Lenke", "A. Srikanth Reddy", "K. Muralidhar Rao"].includes(member.name) && (
                  <a href={`mailto:${member.email}`} className="text-xs text-foreground/60 hover:text-primary transition break-all">
                    {member.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-primary/90 to-accent py-16 md:py-24">
        <div className="container">
          <div className="rounded-2xl border border-white/20 bg-gradient-to-b from-white/10 to-transparent backdrop-blur p-12 text-center md:p-16">
            <h2 className="mb-4 text-3xl font-black uppercase leading-tight tracking-tighter text-white md:text-4xl">
              Partner with Accord Power
            </h2>
            <p className="mb-8 mx-auto max-w-2xl text-lg text-white/90 leading-relaxed">
              Discover how our innovative solutions can elevate your operations and deliver measurable results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold uppercase tracking-wide text-primary shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Contact Our Team
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-white px-8 py-4 font-bold uppercase tracking-wide text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <Dialog open={selectedProfile !== null} onOpenChange={closeProfile}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">
            {selectedProfile?.data?.name} Profile
          </DialogTitle>
          {selectedProfile?.type === 'director' && (
            <div className="relative">
              <button
                onClick={closeProfile}
                className="absolute right-0 top-0 p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="pt-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center text-white text-5xl font-bold mb-4 overflow-hidden">
                    {selectedProfile.data.image ? (
                      <img
                        src={selectedProfile.data.image}
                        alt={selectedProfile.data.name}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center">
                        {selectedProfile.data.avatar || selectedProfile.data.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-2">{selectedProfile.data.name}</h2>
                  <p className="text-lg font-semibold text-accent uppercase tracking-wide mb-4">{selectedProfile.data.title}</p>
                  <a href={`mailto:${selectedProfile.data.email}`} className="text-primary hover:text-accent transition font-medium">
                    {selectedProfile.data.email}
                  </a>
                </div>

                {selectedProfile.data.name === featuredDirector.name && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                      <h3 className="font-bold text-primary mb-3 uppercase tracking-wide">Biography</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {featuredDirector.bio}
                      </p>
                    </div>
                  </div>
                )}

                {selectedProfile.data.name !== featuredDirector.name && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                      <h3 className="font-bold text-primary mb-3 uppercase tracking-wide">Role & Responsibilities</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {selectedProfile.data.title} at Accord Power. Dedicated professional with expertise in their respective domain, contributing to the company's growth and success.
                      </p>
                    </div>
                    {selectedProfile.data.subtitle && (
                      <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-6 border border-accent/10">
                        <h3 className="font-bold text-accent mb-3 uppercase tracking-wide">Specialization</h3>
                        <p className="text-foreground/80 leading-relaxed">
                          {selectedProfile.data.subtitle}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedProfile?.type === 'coreTeam' && (
            <div className="relative">
              <button
                onClick={closeProfile}
                className="absolute right-0 top-0 p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="pt-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center text-white text-5xl font-bold mb-4 overflow-hidden">
                    {selectedProfile.data.image ? (
                      <img
                        src={selectedProfile.data.image}
                        alt={selectedProfile.data.name}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                        {selectedProfile.data.avatar}
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-2">{selectedProfile.data.name}</h2>
                  <p className="text-lg font-semibold text-accent uppercase tracking-wide mb-4">{selectedProfile.data.title}</p>
                  {(selectedProfile.data.name === "Ch. Ramesh" || selectedProfile.data.name === "Ch. Nagini") && selectedProfile.data.phone && (
                    <p className="text-lg text-foreground/70 mb-4">{selectedProfile.data.phone}</p>
                  )}
                  {selectedProfile.data.subtitle && !["Ch. Ramesh", "Ch. Nagini"].includes(selectedProfile.data.name) && (
                    <p className="text-sm text-foreground/70 uppercase tracking-wide mb-4">{selectedProfile.data.subtitle}</p>
                  )}
                  {selectedProfile.data.name === "N. Nageshwer Rao" && selectedProfile.data.phone && (
                    <a href={`tel:${selectedProfile.data.phone}`} className="text-primary hover:text-accent transition font-medium">
                      {selectedProfile.data.phone}
                    </a>
                  )}
                  {!["N. Nageshwer Rao", "J. Dhileep", "Prasanth Lenke", "A. Srikanth Reddy", "K. Muralidhar Rao"].includes(selectedProfile.data.name) && (
                    <a href={`mailto:${selectedProfile.data.email}`} className="text-primary hover:text-accent transition font-medium">
                      {selectedProfile.data.email}
                    </a>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                    <h3 className="font-bold text-primary mb-3 uppercase tracking-wide">Role & Responsibilities</h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {selectedProfile.data.title} at Accord Power. Dedicated professional with expertise in their respective domain, contributing to the company's growth and success.
                    </p>
                  </div>
                  {selectedProfile.data.subtitle && (
                    <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-6 border border-accent/10">
                      <h3 className="font-bold text-accent mb-3 uppercase tracking-wide">Specialization</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {selectedProfile.data.subtitle}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
