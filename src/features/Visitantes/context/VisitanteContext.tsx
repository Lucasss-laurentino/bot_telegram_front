import { createContext, useContext, useState } from "react";
import { VisitanteContextType } from "../types/VisitanteTypes";
import { INovoVisitante } from "../interface/INovoVisitante";
import {
  redimensionarImagem,
  FormatarDadosVisitante,
} from "../utils/VisitanteUtils";
import { CreateVisitante, GetTipoVisita } from "../service/VisitanteService";

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
  const [tipoVisitante, setTipoVisita] = useState<string[] | null>(null);
  const [initialData, setInitialData] = useState<string | null>(null);

  const getTipoVisita = async () => {
    try {
      const tipoVisitaRetornado = await GetTipoVisita();
      setTipoVisita([...tipoVisitaRetornado]);
    } catch (error: any) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const createVisitante = async (novoVisitante: INovoVisitante) => {
    try {
      if (!initialData) throw new Error("Ação não permitida!");
      setLoading(true);
      const fotoRedimensionada = await redimensionarImagem(novoVisitante.Foto);
      novoVisitante.Foto = fotoRedimensionada;
      const visitanteFormatado = await FormatarDadosVisitante(novoVisitante);
      await CreateVisitante(visitanteFormatado, initialData);
      return true;
    } catch (error: any) {
      if (error.response?.data && error.response?.data?.code === 1) {
        setErro(error.response.data.message);
        return false;
      }
      setErro(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <VisitanteContext.Provider
      value={{
        createVisitante,
        loading,
        setLoading,
        erro,
        setErro,
        getTipoVisita,
        tipoVisitante,
        setTipoVisita,
        initialData,
        setInitialData,
      }}
    >
      {children}
    </VisitanteContext.Provider>
  );
};
