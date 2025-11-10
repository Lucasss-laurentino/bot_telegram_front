import { http } from "../../../shared/http/http";

export async function CreateMorador(formData: FormData) {
    const response = await http.post("morador/create", formData, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    } );
    return response.data;
}