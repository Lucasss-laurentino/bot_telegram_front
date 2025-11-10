import { createContext, useContext, useState } from "react";
import { QrcodeContextType } from "../types/QrcodeTypes";
import { http } from "../../../shared/http/http";

export const QrcodeContext = createContext<QrcodeContextType | null>(null);

export const useQrcode = () => {
    const context = useContext(QrcodeContext);
    if (!context) {
        throw new Error('useQrcode must be used within a QrcodeProvider');
    }
    return context;
}

export const QrcodeProvider = ({children}: {children: React.ReactNode}) => {

    const [qrcode, setQrcode] = useState<string | null>(null);
    
    const getQrcode = async () => {
       try {
        const response = await http.post<string>("qrcode/gerar");
        setQrcode(response.data);
       } catch(error: any) {
        throw new Error("Erro ao buscar qrcode");
       }
    
    }

    return (
        <QrcodeContext.Provider value={{}}>
            {children}
        </QrcodeContext.Provider>
    )
}