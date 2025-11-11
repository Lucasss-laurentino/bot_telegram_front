import { INovoVisitante } from "../interface/INovoVisitante";

export enum TipoVisitante {
  Prestador = "Prestador",
  Morador = "Morador",
  Outros = "Outros",
}

export type VisitanteContextType = {
  loading: boolean;
  setLoading: (load: boolean) => void;
  erro: string | null;
  setErro: (erro: string | null) => void;
  createVisitante: (novoVisitante: INovoVisitante) => void;
};
