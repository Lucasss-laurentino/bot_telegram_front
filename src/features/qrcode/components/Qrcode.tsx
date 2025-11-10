import { useEffect } from "react";
import { useQrcode } from "../context/QrcodeContext";

export const Qrcode = () => {

    const {qrcode, setQrcode, getQrcode } = useQrcode();

    useEffect(() => {
        if(!qrcode) getQrcode();
    }, []);

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center bg-dark">
            <h1 className="text-white">Tailwind funcionando 🎉</h1>
        </div>
    );
}