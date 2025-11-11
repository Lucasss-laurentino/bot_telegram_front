import * as yup from "yup";

export const CreateMoradorSchema = yup.object({
  Nome: yup
    .string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .test(
      "nome-completo",
      "Digite nome e sobrenome",
      (value) => !!value && value.trim().split(" ").filter(Boolean).length >= 2
    )
    .transform((value: any) => {
      if (!value) return "";
      // transforma cada palavra para primeira letra maiúscula
      return value
        .split(" ")
        .filter(Boolean)
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }),

  Foto: yup
  .mixed<File>()
  .required("Campo obrigatório")
  .test(
    "fileType",
    "Apenas arquivos de imagem são permitidos",
    (value) => {
      if (!value) return false;
      // Verifica se é uma instância de File
      if (!(value instanceof File)) return false;
      return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }
  ),

  Celular: yup
    .string()
    .required("O celular é obrigatório")
    .transform((value: string) => (value ? value.replace(/\D/g, "") : "")),

  // Cpf: yup
  //   .string()
  //   .required("O CPF é obrigatório")
  //   .transform((value: string) => (value ? value.replace(/\D/g, "") : ""))
  //   .matches(/^\d{11}$/, "O CPF deve ter 11 dígitos"),
});

