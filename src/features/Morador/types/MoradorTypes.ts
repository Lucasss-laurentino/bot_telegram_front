import { INovoMorador } from "../interface/MoradorInterface";

export type MoradorContextType = {
    loading: boolean;
    setLoading: (load: boolean) => void;
    erro: string | null;
    setErro: (erro: string | null) => void;
    createMorador: (novoMorador: INovoMorador) => void;
};