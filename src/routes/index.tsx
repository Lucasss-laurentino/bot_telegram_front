import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Qrcode } from "../features/qrcode/components/Qrcode";
import { QrcodeProvider } from "../features/qrcode/context/QrcodeContext";
import { CreateMorador } from "../features/Morador/components/CreateMorador";
import { MoradorProvider } from "../features/Morador/context/MoradorContext";

export default function AppRouter() {
  return (
    <QrcodeProvider>
      <MoradorProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Qrcode />} />
            <Route path="/CreateMorador" element={<CreateMorador />} />
          </Routes>
        </Router>
      </MoradorProvider>
    </QrcodeProvider>
  );
}
