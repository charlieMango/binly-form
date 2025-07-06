import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientForm from "./pages/Client/ClientForm";
import LegalAgreement from "./pages/LegalAgreement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer";
import SuccessPage from "./pages/SuccessPage/SuccessPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientForm />} />
        <Route path="/legal" element={<LegalAgreement />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}
