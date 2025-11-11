import { createContext, useContext, useState } from "react";
import { VisitanteContextType } from "../types/VisitanteTypes";
import { INovoVisitante } from "../interface/INovoVisitante";
import {
  redimensionarImagem,
  FormatarDadosVisitante,
} from "../utils/VisitanteUtils";
import { CreateVisitante } from "../service/VisitanteService";

export const VisitanteContext = createContext<VisitanteContextType | null>(
  null
);

export const useVisitante = () => {
  const context = useContext(VisitanteContext);
  if (!context)
    throw new Error("useVisitante must be used within a VisitanteProvider");
  return context;
};

export const VisitanteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const createVisitante = async (novoVisitante: INovoVisitante) => {
    try {
      setLoading(true);
      const fotoRedimensionada = await redimensionarImagem(novoVisitante.Foto);
      novoVisitante.Foto = fotoRedimensionada;
      const visitanteFormatado = await FormatarDadosVisitante(novoVisitante);
      await CreateVisitante(visitanteFormatado);
    } catch (error: any) {
      setErro(error.response?.data?.message || "Erro ao cadastrar visitante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VisitanteContext.Provider
      value={{ createVisitante, loading, setLoading, erro, setErro }}
    >
      {children}
    </VisitanteContext.Provider>
  );
};
