import "./index.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateVisitanteSchema } from "../schema/VisitanteSchema";
import { useVisitante } from "../context/VisitanteContext";
import Errors from "../../../shared/components/errors/Errors";
import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import Loading from "../../../shared/components/Loading/Loading";
import { INovoVisitante } from "../interface/INovoVisitante";
import Popup from "../../../shared/components/popup/Popup";

export const CreateVisitante = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<INovoVisitante>({
    resolver: yupResolver(CreateVisitanteSchema),
  });

  const { createVisitante, loading, tipoVisitante, getTipoVisita, setInitialData } =
    useVisitante();
  const [imagem, setImagem] = useState<File | null>(null);
  const [popupActive, setPopupActive] = useState(false);

  const handleVisitante = async (novoVisitante: INovoVisitante) => {
    var confirmacao = await createVisitante(novoVisitante);
    if (confirmacao) {
      reset();
      setImagem(null);
      setPopupActive(true);
      setTimeout(() => {
        setPopupActive(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const params = new URLSearchParams(hash);
    setInitialData(params.get("tgWebAppData"));

    getTipoVisita();
  }, []);

  if (!tipoVisitante) return <></>;

  return (
    <>
      <Popup active={popupActive} message="Visitante criado com sucesso!" />
      <div className="visitante-page">
        <div className="visitante-card">
          <img
            src="/imagens_logo/LogoSegmix_login.png"
            alt="Segmix Logo"
            className="visitante-logo"
          />
          <h1 className="visitante-title">Cadastrar Visitante</h1>
          <form
            className="visitante-form"
            onSubmit={handleSubmit(handleVisitante)}
          >
            <label>Nome Completo</label>
            <input
              type="text"
              {...register("Nome")}
              onChange={(e) => {
                const value = e.target.value;
                const capitalized =
                  value.charAt(0).toUpperCase() + value.slice(1);
                setValue("Nome", capitalized, { shouldValidate: true });
              }}
              placeholder="Digite o nome completo"
            />
            {errors.Nome?.message && <Errors error={errors.Nome.message} />}

            <label>Cpf</label>
            <Controller
              name="Cpf"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000.000.000-00"
                  placeholder="Digite seu CPF"
                  value={field.value || ""}
                  onAccept={(value: string) => field.onChange(value)}
                  onBlur={(e) => field.onBlur()}
                  type="tel"
                  inputMode="numeric"
                />
              )}
            />
            {errors.Cpf?.message && <Errors error={errors.Cpf.message} />}

            <label>Tipo de Visitante</label>
            <select {...register("TipoVisitante")}>
              <option value="">Selecione...</option>
              {tipoVisitante.map((tipo: string, index) => {
                return (
                  <option key={index} value={tipo}>
                    {tipo}
                  </option>
                );
              })}
            </select>
            {errors.TipoVisitante?.message && (
              <Errors error={errors.TipoVisitante.message} />
            )}

            <label>Prazo da Visita</label>
            <div className="date-range">
              <div className="w-100">
                <span>Início</span>
                <input
                  type="date"
                  style={{ height: "40px" }}
                  {...register("DataInicio")}
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
                {errors.DataInicio?.message && (
                  <Errors error={errors.DataInicio.message} />
                )}
              </div>

              <div className="w-100">
                <span>Fim</span>
                <input
                  type="date"
                  style={{ height: "40px" }}
                  {...register("DataFim")}
                  defaultValue={new Date().toISOString().split("T")[0]}
                />
                {errors.DataFim?.message && (
                  <Errors error={errors.DataFim.message} />
                )}
              </div>
            </div>

            <label>Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  setImagem(file);
                  setValue("Foto", file, { shouldValidate: true });
                }
              }}
            />
            {errors.Foto?.message && <Errors error={errors.Foto.message} />}
            {imagem && (
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={URL.createObjectURL(imagem)}
                  alt="Preview"
                  style={{
                    marginTop: "10px",
                    maxWidth: "40%",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                />
              </div>
            )}

            <div className="linhaCadastrarVeiculo">Cadastrar Veículo ?</div>

            <label>Placa</label>
            <Controller
              name="Placa"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="aaa0*00"
                  placeholder="Digite a placa do carro"
                  value={field.value || ""}
                  onAccept={(value: string) =>
                    field.onChange(value.toUpperCase())
                  }
                />
              )}
            />
            {errors.Placa?.message && <Errors error={errors.Placa.message} />}

            <label>Cor do Carro</label>
            <input
              type="text"
              {...register("CorCarroVisita")}
              placeholder="Digite a cor do carro"
            />
            {errors.CorCarroVisita?.message && (
              <Errors error={errors.CorCarroVisita.message} />
            )}

            <label>Marca do Carro</label>
            <input
              type="text"
              {...register("MarcaCarroVisita")}
              placeholder="Digite a marca do carro"
            />
            {errors.MarcaCarroVisita?.message && (
              <Errors error={errors.MarcaCarroVisita.message} />
            )}

            {loading ? <Loading /> : <button type="submit">Cadastrar</button>}
          </form>
        </div>
      </div>
    </>
  );
};
