import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Qrcode } from "../features/qrcode/components/Qrcode";
import { QrcodeProvider } from "../features/qrcode/context/QrcodeContext";
import { CreateMorador } from "../features/Morador/components/CreateMorador";
import { MoradorProvider } from "../features/Morador/context/MoradorContext";
import { CreateVisitante } from "../features/Visitantes/components/CreateVisitante";
import { VisitanteProvider } from "../features/Visitantes/context/VisitanteContext";

export default function AppRouter() {
  return (
    <QrcodeProvider>
      <MoradorProvider>
        <VisitanteProvider>
          {" "}
          {/* <-- Adicione aqui */}
          <Router>
            <Routes>
              <Route path="/" element={<Qrcode />} />
              <Route path="/CreateMorador" element={<CreateMorador />} />
              <Route path="/CreateVisitantes" element={<CreateVisitante />} />
            </Routes>
          </Router>
        </VisitanteProvider>
      </MoradorProvider>
    </QrcodeProvider>
  );
}
