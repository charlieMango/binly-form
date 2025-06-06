import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientForm from "./pages/Client/ClientForm";
import LegalAgreement from "./pages/LegalAgreement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientForm />} />
        <Route path="/legal" element={<LegalAgreement />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
