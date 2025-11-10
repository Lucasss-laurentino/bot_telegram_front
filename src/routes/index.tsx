import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Qrcode } from "../features/qrcode/components/Qrcode";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Qrcode />} />
      </Routes>
    </Router>
  );
}
