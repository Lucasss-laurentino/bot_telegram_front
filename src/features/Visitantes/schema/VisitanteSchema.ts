import * as yup from "yup";

export const CreateVisitanteSchema = yup.object({
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
        .map(
          (word: string) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }),

  Documento: yup.string().required("O documento é obrigatório"),
  TipoVisitante: yup.string().required("O tipo de visitante é obrigatório"),
  Placa: yup.string().required("A placa é obrigatória"),
  CorCarroVisita: yup.string().required("A cor do carro é obrigatória"),
  CarroMarca: yup.string().required("A marca do carro é obrigatória"),
  Foto: yup
    .mixed<File>()
    .required("A foto é obrigatória")
    .test("fileType", "Apenas imagens são permitidas", (value) =>
      value ? value.type.startsWith("image/") : false
    ),
});
