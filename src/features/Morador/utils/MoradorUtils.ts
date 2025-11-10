import { INovoMorador } from "../interface/MoradorInterface";

export function FormatarDadosMorador(novoMorador: INovoMorador): FormData {
    const formData = new FormData();
    formData.append('Nome', novoMorador.Nome);
    formData.append('Cpf', novoMorador.Cpf);
    formData.append('Celular', novoMorador.Celular);
    formData.append('Foto', novoMorador.Foto);
    return formData;
}