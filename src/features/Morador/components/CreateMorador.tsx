import "./index.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateMoradorSchema } from "../schema/MoradorSchema";
import { useMorador } from "../context/MoradorContext";
import Errors from "../../../shared/components/errors/Errors";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import Loading from "../../../shared/components/Loading/Loading";

export const CreateMorador = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateMoradorSchema),
  });

  const { createMorador, loading } = useMorador();
  const [imagem, setImagem] = useState<File | null>(null);

  return (
    <div className="morador-page">
      <div className="morador-card">
        <img
          src="/imagens_logo/LogoSegmix_login.png"
          alt="Segmix Logo"
          className="morador-logo"
        />
        <h1 className="morador-title">Cadastrar Morador</h1>
        <form className="morador-form" onSubmit={handleSubmit(createMorador)}>
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

          {/* <label>Cpf</label>
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
          {errors.Cpf?.message && <Errors error={errors.Cpf.message} />} */}

          <label>Telefone</label>
          <Controller
            name="Celular"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="(00) 00000-0000"
                placeholder="Digite seu número de contato"
                onAccept={(value: string) => field.onChange(value)}
                onBlur={(e) => field.onBlur()}
                type="tel"
                inputMode="numeric"
              />
            )}
          />
          {errors.Celular?.message && <Errors error={errors.Celular.message} />}

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
          {loading ? <Loading /> : <button type="submit">Cadastrar</button>}
        </form>
      </div>
    </div>
  );
};
