export type CategoryKey = "RO Control Panel" | "Digital Water Regulating Instruments";

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
}

const img = (path: string) => `https://accordpower.co.in/${path.replace(/^\//, "")}`;

export const PRODUCTS: Product[] = [
  {
    slug: "ap-led",
    title: "AP LED",
    category: "RO Control Panel",
    description:
      "AP LED 1:1 model is eco‑friendly, cost‑effective and suited for small RO plants.",
    features: [
      "On/Off button",
      "Mimic diagram with 6 LED indications for power, pump running and water level",
      "Delay time for HPP to protect from dry run",
      "RWP and HPP on/off with water level sensor",
    ],
    specs: [
      { label: "Panel Configuration", value: "AP LED" },
      { label: "Size", value: "Skid (L=185mm, W=160mm, H=210mm)" },
      { label: "Raw Water Pump", value: "2 HP" },
      { label: "High Pressure Pump", value: "2 HP" },
      { label: "Protection Connection", value: "6 water level sensors" },
      { label: "Output Connection", value: "Raw water pump, High pressure pump, Dosing pump" },
    ],
    image: img("images/products/01.jpg"),
  },
  {
    slug: "ap-aqua",
    title: "AP AQUA",
    category: "RO Control Panel",
    description:
      "Microcontroller‑based RO control panel with LCD branding, voltage monitoring, auto/manual modes and programmable service times.",
    features: [
      "16x2 LCD with OEM brand name support",
      "3‑phase (RYB) voltage monitoring and protection",
      "Monitors RWT/TWT levels; monitors LPS/HPS",
      "Programmable service time for sand and carbon filters",
      "Supports auto multi‑port valve",
      "Trip time for sites without floats",
      "Auto clean and flushing with programmable intervals",
      "Password protection for branding, install date and hour meter",
      "Flow rate display for delivery log book",
      "Hooter provision for input failures",
      "Auto and Manual modes",
    ],
    specs: [
      { label: "Panel Configuration", value: "AP AQUA TDS & NON‑TDS (1:1)" },
      { label: "Raw Water Pump", value: "2 HP" },
      { label: "High Pressure Pump", value: "2.5 HP" },
      { label: "Protection Connection", value: "LPS, HPS, floats (TWT/RWT/Dosing), auto multi‑port valve" },
      { label: "Output Connection", value: "RWP, HPP, dosing pump, flushing SV, UV" },
    ],
    image: img("images/products/03.jpg"),
    gallery: [img("images/products/02-1.jpg"), img("images/products/03-1.jpg")],
  },
  {
    slug: "ap-11-13-33",
    title: "AP 1:1 / 1:3 / 3:3",
    category: "RO Control Panel",
    description:
      "Advanced RO control panels (TDS & NON‑TDS) with multi‑sensor support, auto/manual control and comprehensive protections.",
    features: [
      "Microcontroller‑based intelligent control",
      "3‑phase (RYB) voltage monitoring and protection",
      "4‑line LCD shows complete plant information",
      "Supports two flow sensors (treated and reject)",
      "Auto pulse setting based on plant capacity",
      "Auto/Manual settings for RWP and HPP",
      "AC low/high voltage protection",
      "Floats for RWT/TWT/Dosing tank, LPS and HPS",
      "TDS and conductivity",
      "Works with all brands of auto multi‑port valves",
      "Controls UV, SV and dosing pump",
      "8 LED indications for system states",
      "Password protection and factory default reset",
      "Manual fallback if PCB fails",
    ],
    specs: [
      { label: "Panel Configuration", value: "AP 1:1 / 1:3 / 3:3 (TDS & NON‑TDS)" },
    ],
    image: img("images/products/02.jpg"),
  },
  {
    slug: "ap-gsm",
    title: "AP GSM 1:1 / 1:3 / 3:3",
    category: "RO Control Panel",
    description:
      "GSM‑enabled RO control panel with real‑time data, alerts to web/app/phone and remote control via mobile/Android app.",
    features: [
      "4‑line LCD with full plant info",
      "GSM based real‑time data and fault alerts to web, Android app and two mobiles",
      "Remote control of all plant functions via app/phone",
    ],
    specs: [
      { label: "Variant (1:1)", value: "RWP 3 HP, HPP 3 HP; LPS, HPS, floats, auto multi‑port valve; outputs: RWP, HPP, dosing, flushing SV, UV" },
      { label: "Variant (1:3)", value: "RWP 3 HP, HPP 5 HP; protections and outputs as above" },
      { label: "Variant (3:3)", value: "RWP 5 HP, HPP 5 HP; protections and outputs as above" },
    ],
    image: img("images/products/04.jpg"),
  },
  {
    slug: "time-based",
    title: "Time Based – Single & Multi Coin",
    category: "Digital Water Regulating Instruments",
    description:
      "SMPS‑operated time‑based water controller (ATM) with battery backup, solar charging provision and multi‑coin support.",
    features: [
      "Battery backup with solar charging provision",
      "Programmable single coin (Re 1 to Rs 10)",
      "Separate coin counter",
      "Seven‑segment display shows dispensing time",
    ],
    specs: [
      { label: "ATW Configuration", value: "Time Based – Single & Multi Coin Water Controller" },
      { label: "Size", value: "Skid (L=200mm, W=150mm, H=370mm)" },
      { label: "Water Pump", value: "1/2 HP (with gravity, pump not required)" },
      { label: "Output Connection", value: "Water pump, AC solenoid valve" },
    ],
    image: img("images/products/05.jpg"),
  },
  {
    slug: "flow-based",
    title: "Flow Based – Single & Multi Coin",
    category: "Digital Water Regulating Instruments",
    description:
      "SMPS‑operated flow‑based GSM water controller with multi‑coin and branding support, suited for multi‑dispensing systems.",
    features: [
      "Battery backup with solar charging provision",
      "Up to six types of multi‑coins programmable",
      "Brand promotion on 2‑line 16‑digit LCD",
      "Multi‑denomination (Rs 1–10) for multi dispensing",
    ],
    specs: [
      { label: "ATW Configuration", value: "Flow Based – Single & Multi Coin Water Controller" },
      { label: "Size", value: "Skid (L=200mm, W=170mm, H=370mm)" },
      { label: "Water Pump", value: "1/2 HP (with gravity, pump not required)" },
      { label: "Output Connection", value: "Water pump, AC solenoid valve, flow sensor" },
    ],
    image: img("images/products/06.jpg"),
  },
  {
    slug: "flow-based-rfid",
    title: "Flow Based – RFID Card",
    category: "Digital Water Regulating Instruments",
    description:
      "RFID card‑based flow controller (ATW device) with GSM, battery backup, multi‑tap operation, adjustable volume/price and remote monitoring.",
    features: [
      "Battery backup with solar charging provision",
      "Operate with two, three and four taps",
      "Adjustable dispensing volume and price",
      "Four dispensing modes: Normal, Normal & Cold, Fixed, Free",
      "Remote monitoring via Android app and web portal/cloud",
      "Supports Paytm water dispense",
    ],
    specs: [
      { label: "ATW Configuration", value: "Flow Based – RFID + GSM Water Controller (WVM)" },
      { label: "Size", value: "Skid (L=160mm, W=50mm, H=225mm)" },
      { label: "Water Pump", value: "1/2 HP (with gravity, pump not required)" },
      { label: "Output Connection", value: "Water pump, AC/DC solenoid valve, flow sensor" },
    ],
    image: img("images/products/07.jpg"),
  },
  {
    slug: "flow-based-rfid-coin",
    title: "Flow Based – RFID Card + Coin",
    category: "Digital Water Regulating Instruments",
    description:
      "ATW combo device supporting both RFID card and coin with multi‑tap operation, multiple modes and remote monitoring.",
    features: [
      "Battery backup with solar charging provision",
      "Operate with two, three and four taps",
      "Adjustable dispensing volume and price",
      "Four dispensing modes: Normal, Normal & Cold, Fixed, Free",
      "Remote monitoring via Android app and web portal/cloud",
      "Paytm support",
      "Multi‑functional controller with card and coin",
      "Six types of coins programmable",
    ],
    specs: [
      { label: "ATW Configuration", value: "Flow Based – RFID + Coin Water Controller (ATW Combo)" },
      { label: "Size", value: "Skid (L=160mm, W=50mm, H=225mm)" },
      { label: "Water Pump", value: "1/2 HP (with gravity, pump not required)" },
      { label: "Output Connection", value: "Water pump, AC/DC solenoid valve, flow sensor" },
    ],
    image: img("images/products/08.jpg"),
  },
];

export const PRODUCTS_BY_SLUG = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));
export const CATEGORIES: ("All" | CategoryKey)[] = ["All", "RO Control Panel", "Digital Water Regulating Instruments"];
