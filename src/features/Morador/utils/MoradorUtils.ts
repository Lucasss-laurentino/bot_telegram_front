import { INovoMorador } from "../interface/MoradorInterface";

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

      canvas.toBlob((blob) => {
        if (!blob) return reject("Erro ao gerar blob");
        resolve(new File([blob], file.name, { type: "image/jpeg" }));
      }, "image/jpeg", 0.8);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });


export function FormatarDadosMorador(novoMorador: INovoMorador): FormData {
    const formData = new FormData();
    formData.append('Nome', novoMorador.Nome);
    formData.append('Cpf', novoMorador.Cpf);
    formData.append('Celular', novoMorador.Celular);
    formData.append('Foto', novoMorador.Foto);
    return formData;
}