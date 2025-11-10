export type QrcodeContextType = {
    qrcode: string | null,
    setQrcode: (qrcode: string | null) => void;
    getQrcode: () => void;
}