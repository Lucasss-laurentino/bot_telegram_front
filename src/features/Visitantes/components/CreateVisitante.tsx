import "./index.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateVisitanteSchema } from "../schema/VisitanteSchema";
import { useVisitante } from "../context/VisitanteContext";
import Errors from "../../../shared/components/errors/Errors";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import Loading from "../../../shared/components/Loading/Loading";
import { TipoVisitante } from "../types/VisitanteTypes";
import { INovoVisitante } from "../interface/INovoVisitante";

export const CreateVisitante = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<INovoVisitante>({
    resolver: yupResolver(CreateVisitanteSchema),
  });

  const { createVisitante, loading } = useVisitante();
  const [imagem, setImagem] = useState<File | null>(null);

  return (
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
          onSubmit={handleSubmit(createVisitante)}
        >
          <label>Nome Completo</label>
          <input
            type="text"
            {...register("Nome")}
            placeholder="Digite o nome completo"
            onChange={(e) => {
              const value = e.target.value;
              const capitalized = value
                .split(" ")
                .filter(Boolean)
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ");
              setValue("Nome", capitalized, { shouldValidate: true });
            }}
          />
          {errors.Nome?.message && <Errors error={errors.Nome.message} />}

          <label>Documento</label>
          <input
            type="text"
            {...register("Documento")}
            placeholder="Digite o documento"
          />
          {errors.Documento?.message && (
            <Errors error={errors.Documento.message} />
          )}

          <label>Tipo de Visitante</label>
          <select {...register("TipoVisitante")}>
            <option value="">Selecione...</option>
            <option value={TipoVisitante.Prestador}>Prestador</option>
            <option value={TipoVisitante.Morador}>Morador</option>
            <option value={TipoVisitante.Outros}>Outros</option>
          </select>
          {errors.TipoVisitante?.message && (
            <Errors error={errors.TipoVisitante.message} />
          )}

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

          <label>Cor do Carro (Visita)</label>
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
            {...register("CarroMarca")}
            placeholder="Digite a marca do carro"
          />
          {errors.CarroMarca?.message && (
            <Errors error={errors.CarroMarca.message} />
          )}

          <label>Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
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

          {loading ? <Loading /> : <button type="submit">Cadastrar</button>}
        </form>
      </div>
    </div>
  );
};
