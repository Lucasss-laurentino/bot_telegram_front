import { createContext, useContext, useState } from "react";
import { MoradorContextType } from "../types/MoradorTypes";
import { INovoMorador } from "../interface/MoradorInterface";
import { FormatarDadosMorador, redimensionarImagem } from "../utils/MoradorUtils";
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

  const createMorador = async (novoMorador: INovoMorador) => {
    try {
      setLoading(true);
      const fotoRedimensionada = await redimensionarImagem(novoMorador.Foto);
      novoMorador.Foto = fotoRedimensionada;
      const moradorFormatado = await FormatarDadosMorador(novoMorador);
      await CreateMorador(moradorFormatado);
    } catch (error: any) {
      if (error.response?.data && error.response?.data?.code === 1) {
        setErro(error.response.data.message);
        return;
      }
      setErro("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MoradorContext.Provider value={{ createMorador, loading, setLoading, erro, setErro }}>
      {children}
    </MoradorContext.Provider>
  );
};
