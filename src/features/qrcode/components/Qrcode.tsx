import { useEffect } from "react";
import { useQrcode } from "../context/QrcodeContext";

export const Qrcode = () => {

    const {qrcode, setQrcode, getQrcode } = useQrcode();

    useEffect(() => {
        if(!qrcode) getQrcode();
    }, []);

    return (
        <div className="h-screen flex items-center justify-center bg-green-500 text-white">
            <h1 className="text-3xl font-bold">Tailwind funcionando 🎉</h1>
        </div>
    );
}