import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Qrcode } from "../features/qrcode/components/Qrcode";
import { VisitanteForm } from "../features/visitantes/components/VisitanteForm";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Qrcode />} />
        <Route path="/visitantes" element={<VisitanteForm />} />
      </Routes>
    </Router>
  );
}
