import { http } from "../../../shared/http/http";

export async function CreateVisitante(formData: FormData, initialData: string) {
  const response = await http.post("visitante/create", formData, {
    headers: { 
      "Content-Type": "multipart/form-data",
      Authorization: `tma ${initialData}`
    },
  });
  return response.data;
}

export async function GetTipoVisita(): Promise<string[]> {
  const response = await http.post<string[]>("visitante/tipoVisita");
  return response.data;
}
