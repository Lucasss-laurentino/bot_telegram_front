import * as yup from "yup";

const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

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
         .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
         .join(" ");
     }),

   Cpf: yup
    .string()
    .required("O CPF é obrigatório")
    .transform((value: string) => (value ? value.replace(/\D/g, "") : ""))
    .matches(/^\d{11}$/, "O CPF deve ter 11 dígitos"),
  TipoVisitante: yup.string().required("O tipo de visitante é obrigatório"),
  
  DataInicio: yup
  .date()
  .required("Data de início é obrigatória")
  .min(hoje, "A data deve ser hoje ou futura"),

  DataFim: yup
    .date()
    .required("Data de fim é obrigatória")
    .test(
      "data-fim-maior-ou-igual",
      "Data de fim deve ser igual ou posterior à data de início",
      function (value) {
        const inicio = this.resolve(yup.ref("DataInicio"));
        if (!inicio || !value) return true;
        return value >= inicio; // permite igual
      }
    ),

  Placa: yup.string().nullable().default(null),

  CorCarroVisita: yup.string().nullable().default(null),

  MarcaCarroVisita: yup.string().nullable().default(null),

  Foto: yup
    .mixed<File>()
    .required("A foto é obrigatória")
    .test("fileType", "Apenas imagens são permitidas", (value) =>
      value ? value.type.startsWith("image/") : false
    ),
});
