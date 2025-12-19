export type CategoryKey =
  | "RO Control Panel"
  | "Accessories"
  | "Water ATW"
  | "Starters";

export interface ProductSpecKV {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  title: string;
  category: CategoryKey;
  description: string;
  features: string[];
  specs: ProductSpecKV[];
  image: string;
  gallery?: string[];
  brochureUrl?: string;
  pdfUrl?: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: "single-phase-smart-starter",
    title: "Single Phase Smart Starter",
    category: "Starters",
    description:
      "Microcontroller-based digital pump starter for single-phase supply with comprehensive protection.",
    features: [
      "Micro controller Digital Pump Starter",
      "Digital display of Volt, Amp & Timer",
      "High & Low Voltage Protection",
      "Dry Run & Overload Protection",
    ],
    specs: [
      { label: "Type", value: "Single Phase Pump Starter" },
      { label: "Input Supply", value: "230V AC, 50Hz" },
      { label: "Warranty", value: "24 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F0fa9afba93164b4c810db5def2af61fa%2Fe501286b5a0940398e9e16d75f7c39a5",
    brochureUrl: "/brochures/starters/single-phase-smart-starter.pdf",
    pdfUrl: "/pdfs/starters/single-phase-smart-starter.pdf",
  },

  {
    slug: "three-phase-smart-starter",
    title: "Three Phase Smart Starter",
    category: "Starters",
    description:
      "Advanced microcontroller-based digital pump starter for three-phase supply.",
    features: [
      "3-Phase Voltage Monitoring",
      "Automatic Phase Detection",
      "Dry Run Protection",
    ],
    specs: [
      { label: "Type", value: "Three Phase Pump Starter" },
      { label: "Input Supply", value: "380–415V AC" },
      { label: "Warranty", value: "24 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F8266322ba67049b1b6856db0cc36276c",
    brochureUrl: "/brochures/starters/three-phase-smart-starter.pdf",
    pdfUrl: "/pdfs/starters/three-phase-smart-starter.pdf",
  },

  {
    slug: "ap-11-13-33-pro-with-tds",
    title: "AP 11 / 13 / 33 PRO WITH TDS",
    category: "RO Control Panel",
    description:
      "Advanced RO control panel with TDS monitoring and full system protection.",
    features: [
      "TDS Monitoring",
      "Voltage & Current Sensing",
      "LCD Display",
      "LPS & HPS Protection",
    ],
    specs: [
      { label: "Models", value: "AP 1:1, 1:3, 3:3 Pro" },
      { label: "Display", value: "4-Line LCD" },
      { label: "Warranty", value: "12 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F9e1c6f3f9261452abe587b2702e62c4c",
    brochureUrl:
      "/brochures/control-panel/ap-11-pro-13-pro-33-pro-with-tds.pdf",
    pdfUrl:
      "/pdfs/control-panel/ap-11-pro-13-pro-and-33-pro-with-tds.pdf",
  },

  {
    slug: "ap-11-13-33-plus-gsm-plus-with-tds",
    title: "AP 11 / 13 / 33 PLUS (GSM+) WITH TDS",
    category: "RO Control Panel",
    description:
      "RO Control Panel (Plus/GSM+) with TDS and GSM monitoring for remote alerts.",
    features: ["TDS & GSM Monitoring", "Auto Restart", "System Protection"],
    specs: [
      { label: "Models", value: "AP 11, 13, 33 Plus (GSM+)" },
      { label: "Display", value: "LCD" },
      { label: "Warranty", value: "12 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F6d235257069a49f7804fe60c676cc31a?format=webp&width=800",
    brochureUrl: "/brochures/control-panel/ap-11-13-33-with-tds.pdf",
    pdfUrl: "/pdfs/control-panel/ap-11-13-33-with-tds.pdf",
  },

  {
    slug: "ap-smart-plus-with-tds",
    title: "AP SMART PLUS RO Control Panel",
    category: "RO Control Panel",
    description:
      "Compact RO control panel with TDS monitoring and auto current calibration.",
    features: ["Auto Amp Calibration", "Voltage Display", "Compact Design"],
    specs: [
      { label: "Voltage", value: "Single Phase 230V" },
      { label: "Warranty", value: "12 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2Fa5a3b4c58cdc41ec80b2a65d4fc50d3d",
    brochureUrl: "/brochures/control-panel/ap-smart-plus-with-tds.pdf",
    pdfUrl: "/pdfs/control-panel/ap-smart-plus-with-tds.pdf",
  },

  {
    slug: "ap-jumbo-pro-plus-33-with-tds",
    title: "AP JUMBO PRO & PLUS 33 WITH TDS",
    category: "RO Control Panel",
    description: "High-capacity RO control panel with GSM and TDS monitoring.",
    features: ["GSM Connectivity", "TDS Monitoring", "Auto Calibration"],
    specs: [
      { label: "Capacity", value: "500–1000 LPH" },
      { label: "Warranty", value: "12 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F793b1845c65040a8a20c0251ccc6d189",
    brochureUrl:
      "/brochures/control-panel/ap-jumbo-pro-and-plus-33-with-tds.pdf",
    pdfUrl: "/pdfs/control-panel/ap-jumbo-pro-and-plus-33-with-tds.pdf",
  },

  {
    slug: "ap-titanic-33-with-tds-star-delta",
    title: "AP Titanic 33 WITH TDS (Star–Delta)",
    category: "RO Control Panel",
    description: "Industrial RO control panel with Star–Delta starter and GSM.",
    features: ["Star–Delta Starter", "3-Phase Monitoring", "GSM Alerts"],
    specs: [
      { label: "Input", value: "3-Phase 440V" },
      { label: "Warranty", value: "12 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F579a79c430284133a0e0e06ab4589ba1",
    brochureUrl:
      "/brochures/control-panel/ap-titanic-33-with-tds-star-delta.pdf",
    pdfUrl: "/pdfs/control-panel/ap-titanic-33-with-tds.pdf",
  },

  {
    slug: "chiller-panel-ap-thunder-11",
    title: "Chiller Panel – AP Thunder 11",
    category: "RO Control Panel",
    description: "Chiller panel for temperature control in RO systems.",
    features: ["Temperature Control", "Auto Shutdown", "Compact Design"],
    specs: [
      { label: "Power", value: "AC 230V" },
      { label: "Warranty", value: "12 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2Fad153e6585554d0eaa7fc0c4e5fcbc18",
    brochureUrl:
      "/brochures/control-panel/chillar-panel-model-ap-thunder-11.pdf",
    pdfUrl: "/pdfs/control-panel/chillar-panel-model-ap-thunder-11.pdf",
  },

  {
    slug: "time-based",
    title: "Time Based – Multi Coin Water Controller",
    category: "Water ATW",
    description: "Time-based water ATM controller with coin support.",
    features: ["Battery Backup", "Multi Coin Support", "Solar Charging Ready"],
    specs: [
      { label: "Pump", value: "1/2 HP" },
      { label: "Display", value: "7 Segment" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F11ad6ac0fe7b41008b4d1ceea345ae9a",
    brochureUrl:
      "/brochures/water-atw/time-based-single-multi-coin-water-controller.pdf",
    pdfUrl: "/pdfs/water-atw/time-based-single-and-multi-coin-water-controller.pdf",
  },

  {
    slug: "flow-based",
    title: "Flow Based – Multi Coin Water Controller",
    category: "Water ATW",
    description: "Flow-based water ATM controller with GSM.",
    features: ["Flow Sensor Based", "Brand Display", "Multi Coin"],
    specs: [
      { label: "Pump", value: "1/2 HP" },
      { label: "Control", value: "Flow Based" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F5339c16d85b24470a02fee5680f87278",
    brochureUrl:
      "/brochures/water-atw/flow-time-based-multi-coin-water-controller.pdf",
    pdfUrl: "/pdfs/water-atw/flow-time-based-multi-coin-water-controller.pdf",
  },

  {
    slug: "flow-based-rfid",
    title: "Flow Based – RFID Water Controller",
    category: "Water ATW",
    description: "Flow-based water vending controller with RFID card support.",
    features: ["Flow-based metering", "RFID Card Support", "Compact Controller"],
    specs: [
      { label: "Control", value: "Flow Based (RFID)" },
      { label: "Warranty", value: "12 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2Fbace20cebf4a4ec69f559e4fb99ace7d?format=webp&width=800",
    brochureUrl: "/brochures/water-atw/water-vending-controller-with-rfid-card.pdf",
    pdfUrl: "/pdfs/water-atw/water-vending-controller-with-rfid-card.pdf",
  },

  {
    slug: "flow-based-rfid-coin",
    title: "Flow Based – RFID + Multi Coin Controller",
    category: "Water ATW",
    description:
      "Flow-based controller supporting RFID cards and multi-coin acceptance.",
    features: ["Flow Metering", "RFID + Coin Support", "Multi-coin Interface"],
    specs: [
      { label: "Control", value: "Flow Based (RFID + Coin)" },
      { label: "Warranty", value: "12 Months" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F6a3e4af0e563444c853ad60bd5d018be?format=webp&width=800",
    brochureUrl:
      "/brochures/water-atw/water-vending-controller-with-rfid-card-and-multi-coin.pdf",
    pdfUrl: "/pdfs/water-atw/water-vending-controller-with-rfid-and-multi-coin.pdf",
  },

  {
    slug: "water-flow-sensor-1-inch",
    title: "1 Inch Brass Water Flow Sensor",
    category: "Accessories",
    description:
      "Brass flow sensor for industrial and domestic water systems.",
    features: ["Brass Body", "High Accuracy", "Wide Flow Range"],
    specs: [
      { label: "Size", value: "1 Inch" },
      { label: "Flow", value: "4–45 LPM" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F0fa9afba93164b4c810db5def2af61fa%2F7b505fc27d074b8da5aa436463c5ffa2",
    pdfUrl: "/pdfs/accessories/1-inch-flow-sensor.pdf",
  },

  {
    slug: "solenoid-valve-brass-ac230",
    title: "Solenoid Valve - Brass, AC 230V",
    category: "Accessories",
    description: "Brass solenoid valve suitable for AC 230V installations.",
    features: ["Brass Body", "AC 230V", "Reliable Operation"],
    specs: [
      { label: "Material", value: "Brass" },
      { label: "Voltage", value: "AC 230V" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2Ff13a8e8b21274f5eb14278d74b788ca8",
    pdfUrl: "/pdfs/accessories/3-by-4-inch-1-inch-brass-sv-ac.pdf",
  },

  {
    slug: "solenoid-valve-ss304-ac230",
    title: "Solenoid Valve - SS304, AC 230V",
    category: "Accessories",
    description: "Stainless steel (SS304) solenoid valve for AC 230V use.",
    features: ["SS304 Body", "AC 230V", "Durable Construction"],
    specs: [
      { label: "Material", value: "SS304" },
      { label: "Voltage", value: "AC 230V" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F88be0b12fff1436aafa23616c3ca0a43",
    pdfUrl: "/pdfs/accessories/3-by-4-inch-1-inch-ss-304-sv-ac.pdf",
  },

  {
    slug: "flow-sensor-3-4-inch",
    title: "3/4 Inch Flow Sensor",
    category: "Accessories",
    description: "Flow sensor for medium flow ranges (3/4 inch).",
    features: ["Robust Design", "Accurate Measurement", "Easy Installation"],
    specs: [
      { label: "Size", value: "3/4 Inch" },
      { label: "Flow", value: "10–60 LPM" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F5dc5c5e40ea640059f5337c84cc5d6e5?format=webp&width=800",
    pdfUrl: "/pdfs/accessories/3-by-4-inch-flow-sensor.pdf",
  },

  {
    slug: "high-pressure-switch",
    title: "High Pressure Switch (HPS)",
    category: "Accessories",
    description: "High pressure switch for system protection and safety.",
    features: ["Adjustable Setpoint", "Reliable Cut-off", "Compact"],
    specs: [{ label: "Type", value: "High Pressure Switch" }],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F147cb09e6fb8447f8389abf000c46d79?format=webp&width=800",
    pdfUrl: "/pdfs/accessories/hps.pdf",
  },

  {
    slug: "low-pressure-switch",
    title: "Low Pressure Switch (LPS)",
    category: "Accessories",
    description: "Low pressure switch for dry-run protection and safety.",
    features: ["Low Pressure Cut-off", "Simple Installation", "Reliable"],
    specs: [{ label: "Type", value: "Low Pressure Switch" }],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F2434ee1e19024926a7e78ff5aeb9b095?format=webp&width=800",
    pdfUrl: "/pdfs/accessories/lps.pdf",
  },

  {
    slug: "rfid-cards-water-atm",
    title: "RFID Cards for Water ATM",
    category: "Accessories",
    description: "RFID cards designed for use with our water vending systems.",
    features: ["Durable Cards", "Pre-programmable", "Compatible with RFID Controllers"],
    specs: [{ label: "Type", value: "RFID Card" }],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F8355c091e7a845939850375afb957431?format=webp&width=800",
    pdfUrl: "/pdfs/accessories/rfid-cards-for-water-atm.pdf",
  },

  {
    slug: "gsm-gprs-water-vending-rfid",
    title: "GSM/GPRS Water Vending Controller - RFID",
    category: "Water ATW",
    description:
      "GSM/GPRS based water vending controller with RFID card support for remote monitoring.",
    features: ["GSM/GPRS Connectivity", "RFID Support", "Remote Alerts"],
    specs: [
      { label: "Connectivity", value: "GSM / GPRS" },
      { label: "Control", value: "RFID" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2Fd7971cc656024fdda77374a2298aa392?format=webp&width=800",
    brochureUrl:
      "/brochures/water-atw/gsm-gprs-based-water-vending-controller-with-rfid-card.pdf",
    pdfUrl:
      "/pdfs/water-atw/gsm-gprs-based-water-vending-controller-with-rfid-card.pdf",
  },

  {
    slug: "gsm-gprs-water-vending-rfid-coin",
    title: "GSM/GPRS Water Vending Controller - RFID + Coin",
    category: "Water ATW",
    description:
      "GSM/GPRS controller for water vending with RFID card and multi-coin support.",
    features: ["GSM/GPRS", "RFID + Coin Support", "Remote Management"],
    specs: [
      { label: "Connectivity", value: "GSM / GPRS" },
      { label: "Control", value: "RFID + Coin" },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F55d61897157745e29acfd486bb975d0e%2F58b501f22bc5452e8e8eb0236ca032e7?format=webp&width=800",
    brochureUrl:
      "/brochures/water-atw/gsm-gprs-based-water-vending-controller-with-rfid-card-combo-gsm.pdf",
    pdfUrl:
      "/pdfs/water-atw/gsm-gprs-based-water-vending-controller-with-rfid-card-and-multi-coin.pdf",
  },
];

export const PRODUCTS_BY_SLUG = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p])
);

export const CATEGORIES: ("All" | CategoryKey)[] = [
  "All",
  "RO Control Panel",
  "Accessories",
  "Water ATW",
  "Starters",
];
