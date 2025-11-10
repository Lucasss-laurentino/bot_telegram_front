import { INovoMorador } from "../interface/MoradorInterface";

export type MoradorContextType = {
    createMorador: (novoMorador: INovoMorador) => void;
};