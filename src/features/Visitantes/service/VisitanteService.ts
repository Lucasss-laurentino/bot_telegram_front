import { http } from "../../../shared/http/http";

export async function CreateVisitante(formData: FormData) {
  const response = await http.post("visitante/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
