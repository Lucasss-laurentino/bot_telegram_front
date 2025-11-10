import './index.css';
import { useEffect } from "react";
import { useQrcode } from "../context/QrcodeContext";

export const Qrcode = () => {
  const { qrcode, getQrcode } = useQrcode();

  useEffect(() => {
    if (!qrcode) getQrcode();
  }, [qrcode, getQrcode]);

  return (
    <div className="qrcode-page">
      <div className="qrcode-card">
        <img src="/imagens_logo/LogoSegmix_login.png" alt="Segmix Logo" className="qrcode-logo" />
        <h1 className="qrcode-title">Acesse via telegram</h1>
        {qrcode ? (
          <img src={qrcode} alt="QR Code Pix" className="qrcode-img" />
        ) : (
          <div className="qrcode-loading">
            <div className="spinner"></div>
            <p>Gerando QR Code...</p>
          </div>
        )}
        <p className="qrcode-footer">Segmix Soluções Tecnológicas © 2025</p>
      </div>
    </div>
  );
};
