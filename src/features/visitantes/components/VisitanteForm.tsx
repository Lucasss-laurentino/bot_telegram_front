import { useState } from "react";
import { VisitanteFormData, VisitanteFormErrors } from "../types/visitante";

export function VisitanteForm() {
  const [formData, setFormData] = useState<VisitanteFormData>({
    tipoVisitante: "",
    nome: "",
    documento: "",
    placa: "",
    corCarroVisita: "",
    carroMarca: "",
    foto: null,
  });

  const [errors, setErrors] = useState<VisitanteFormErrors>({});

  // Atualiza os valores e limpa erro ao digitar
  const handleInputChange = (
    field: keyof VisitanteFormData,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Função de validação — todos os campos são obrigatórios
  const validateForm = (): boolean => {
    const newErrors: VisitanteFormErrors = {};

    if (!formData.nome || formData.nome.trim() === "") {
      newErrors.nome = "O nome é obrigatório.";
    }

    if (!formData.documento || formData.documento.trim() === "") {
      newErrors.documento = "O documento é obrigatório.";
    }

    if (!formData.tipoVisitante || formData.tipoVisitante === "") {
      newErrors.tipoVisitante = "O tipo de visitante é obrigatório.";
    }

    if (!formData.placa || formData.placa.trim() === "") {
      newErrors.placa = "A placa do veículo é obrigatória.";
    }

    if (!formData.corCarroVisita || formData.corCarroVisita.trim() === "") {
      newErrors.corCarroVisita = "A cor do carro é obrigatória.";
    }

    if (!formData.carroMarca || formData.carroMarca.trim() === "") {
      newErrors.carroMarca = "A marca do carro é obrigatória.";
    }

    if (!formData.foto) {
      newErrors.foto = "A foto é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.warn("Formulário inválido:", errors);
      return;
    }

    console.log("✅ Dados válidos:", formData);
    alert("Visitante cadastrado com sucesso!");
    // Aqui entraria sua lógica de envio para a API
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 text-center">
          <img
            src="/imagens_logo/LogoSegmix_login.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "120px" }}
          />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Cadastro de Visitante</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                {/* Nome */}
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.nome ? "is-invalid" : ""
                    }`}
                    id="nome"
                    value={formData.nome || ""}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Digite o nome do visitante"
                  />
                  {errors.nome && (
                    <div className="invalid-feedback">{errors.nome}</div>
                  )}
                </div>

                {/* Documento */}
                <div className="mb-3">
                  <label htmlFor="documento" className="form-label">
                    Documento *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.documento ? "is-invalid" : ""
                    }`}
                    id="documento"
                    value={formData.documento || ""}
                    onChange={(e) =>
                      handleInputChange("documento", e.target.value)
                    }
                    placeholder="Digite o documento"
                  />
                  {errors.documento && (
                    <div className="invalid-feedback">{errors.documento}</div>
                  )}
                </div>

                {/* Tipo Visitante */}
                <div className="mb-3">
                  <label htmlFor="tipoVisitante" className="form-label">
                    Tipo de Visitante *
                  </label>
                  <select
                    className={`form-select ${
                      errors.tipoVisitante ? "is-invalid" : ""
                    }`}
                    id="tipoVisitante"
                    value={formData.tipoVisitante}
                    onChange={(e) =>
                      handleInputChange("tipoVisitante", e.target.value)
                    }
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="visitante">Visitante</option>
                    <option value="prestador">Prestador de Serviço</option>
                    <option value="entregador">Entregador</option>
                    <option value="outro">Outro</option>
                  </select>
                  {errors.tipoVisitante && (
                    <div className="invalid-feedback">
                      {errors.tipoVisitante}
                    </div>
                  )}
                </div>

                {/* Placa */}
                <div className="mb-3">
                  <label htmlFor="placa" className="form-label">
                    Placa do Veículo *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.placa ? "is-invalid" : ""
                    }`}
                    id="placa"
                    value={formData.placa || ""}
                    onChange={(e) => handleInputChange("placa", e.target.value)}
                    placeholder="Digite a placa"
                  />
                  {errors.placa && (
                    <div className="invalid-feedback">{errors.placa}</div>
                  )}
                </div>

                {/* Cor do Carro */}
                <div className="mb-3">
                  <label htmlFor="corCarroVisita" className="form-label">
                    Cor do Carro *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.corCarroVisita ? "is-invalid" : ""
                    }`}
                    id="corCarroVisita"
                    value={formData.corCarroVisita || ""}
                    onChange={(e) =>
                      handleInputChange("corCarroVisita", e.target.value)
                    }
                    placeholder="Digite a cor do carro"
                  />
                  {errors.corCarroVisita && (
                    <div className="invalid-feedback">
                      {errors.corCarroVisita}
                    </div>
                  )}
                </div>

                {/* Marca do Carro */}
                <div className="mb-3">
                  <label htmlFor="carroMarca" className="form-label">
                    Marca do Carro *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.carroMarca ? "is-invalid" : ""
                    }`}
                    id="carroMarca"
                    value={formData.carroMarca || ""}
                    onChange={(e) =>
                      handleInputChange("carroMarca", e.target.value)
                    }
                    placeholder="Digite a marca do carro"
                  />
                  {errors.carroMarca && (
                    <div className="invalid-feedback">{errors.carroMarca}</div>
                  )}
                </div>

                {/* Foto */}
                <div className="mb-3">
                  <label htmlFor="foto" className="form-label">
                    Foto *
                  </label>
                  <input
                    type="file"
                    className={`form-control ${
                      errors.foto ? "is-invalid" : ""
                    }`}
                    id="foto"
                    accept="image/*"
                    onChange={(e) =>
                      handleInputChange("foto", e.target.files?.[0] || null)
                    }
                  />
                  {errors.foto && (
                    <div className="invalid-feedback">{errors.foto}</div>
                  )}
                  <div className="form-text">
                    Faça upload de uma foto do visitante
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Cadastrar Visitante
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
