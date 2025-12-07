// server/routes/customerLocations.ts
import { Router } from "express";

const router = Router();

// Demo data – replace later with DB
const customerLocations = [
  { id: 1, name: "Customer - Mumbai, India", lat: 19.076, lng: 72.8777 },
  { id: 2, name: "Customer - Delhi, India", lat: 28.6139, lng: 77.209 },
  { id: 3, name: "Customer - Bengaluru, India", lat: 12.9716, lng: 77.5946 },
  { id: 4, name: "Customer - Dubai, UAE", lat: 25.2048, lng: 55.2708 },
  { id: 5, name: "Customer - London, UK", lat: 51.5074, lng: -0.1278 },
];

router.get("/", (req, res) => {
  res.json(customerLocations);
});

export default router;
