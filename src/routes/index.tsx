import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Qrcode } from "../features/qrcode/components/Qrcode";
import { QrcodeProvider } from "../features/qrcode/context/QrcodeContext";

export default function AppRouter() {
  return (
    <QrcodeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Qrcode />} />
        </Routes>
      </Router>
    </QrcodeProvider>
  );
}
