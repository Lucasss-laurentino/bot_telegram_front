import { createContext, useContext, useState } from "react";
import { MoradorContextType } from "../types/MoradorTypes";
import { INovoMorador } from "../interface/MoradorInterface";
import {
  FormatarDadosMorador,
  redimensionarImagem,
} from "../utils/MoradorUtils";
import { CreateMorador } from "../service/MoradorService";

export const MoradorContext = createContext<MoradorContextType | null>(null);

export const useMorador = () => {
  const context = useContext(MoradorContext);
  if (!context) {
    throw new Error("useMorador must be used within a provider");
  }
  return context;
};

export const MoradorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<string | null>(null);

  const createMorador = async (novoMorador: INovoMorador) => {
    try {
      if (!initialData) throw new Error("Ação não permitida!");
      setLoading(true);
      const fotoRedimensionada = await redimensionarImagem(novoMorador.Foto);
      novoMorador.Foto = fotoRedimensionada;
      const moradorFormatado = await FormatarDadosMorador(novoMorador);
      await CreateMorador(moradorFormatado, initialData);
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
    <MoradorContext.Provider
      value={{
        createMorador,
        loading,
        setLoading,
        erro,
        setErro,
        initialData,
        setInitialData,
      }}
    >
      {children}
    </MoradorContext.Provider>
  );
};
