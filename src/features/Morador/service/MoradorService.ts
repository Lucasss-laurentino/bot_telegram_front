import { http } from "../../../shared/http/http";

export async function CreateMorador(formData: FormData, initialData: string) {
    const response = await http.post("morador/create", formData, {
        headers: {
            'Content-Type': "multipart/form-data",
            Authorization: `tma ${initialData}`
        }
    } );
    return response.data;
}