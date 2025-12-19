import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import ProductEnquiries from "./pages/ProductEnquiries";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/product-enquiries" element={<ProductEnquiries />} />
      </Routes>
    </BrowserRouter>
  );
}
