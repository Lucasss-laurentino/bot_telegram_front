import { INovoVisitante } from "../interface/INovoVisitante";

/**
 * Redimensiona uma imagem para o tamanho máximo especificado,
 * mantendo a proporção original e retornando um novo arquivo.
 */
export const redimensionarImagem = (file: File, maxSize = 800): Promise<File> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e.target?.result) return reject("Erro ao ler a imagem");
      img.src = e.target.result as string;
    };

    img.onload = () => {
      let w = img.width;
      let h = img.height;
      const ratio = Math.min(maxSize / w, maxSize / h, 1);
      w *= ratio;
      h *= ratio;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Erro ao processar a imagem");

      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Erro ao gerar blob");
          resolve(new File([blob], file.name, { type: "image/jpeg" }));
        },
        "image/jpeg",
        0.8
      );
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/**
 * Converte os dados do visitante em um objeto FormData
 * compatível com a API.
 */
export function FormatarDadosVisitante(
  novoVisitante: INovoVisitante
): FormData {
  const formData = new FormData();
  formData.append("Nome", novoVisitante.Nome);
  formData.append("Documento", novoVisitante.Documento || "");
  formData.append("TipoVisitante", novoVisitante.TipoVisitante);
  if (novoVisitante.Placa) formData.append("Placa", novoVisitante.Placa);
  if (novoVisitante.CorCarroVisita)
    formData.append("CorCarroVisita", novoVisitante.CorCarroVisita);
  if (novoVisitante.CorCarroVisita)
    formData.append("CarroCor", novoVisitante.CorCarroVisita);
  if (novoVisitante.CarroMarca)
    formData.append("CarroMarca", novoVisitante.CarroMarca);
  if (novoVisitante.Foto) formData.append("Foto", novoVisitante.Foto);

  return formData;
}
