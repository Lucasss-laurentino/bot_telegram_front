// Tipo para os dados do formulário
export interface VisitanteFormData {
  nome?: string;
  documento?: string;
  tipoVisitante: string;
  placa?: string;
  corCarroVisita?: string;
  carroCor?: string;
  carroMarca?: string;
  foto: File | null;
}

// Tipo para as opções do select
export type TipoVisitante =
  | "visitante"
  | "prestador"
  | "entregador"
  | "outro"
  | "";

// Tipo para o estado do visitante (dados salvos)
export interface Visitante {
  id?: number;
  nome: string;
  documento?: string;
  tipoVisitante: TipoVisitante;
  placa?: string;
  corCarroVisita?: string;
  carroMarca?: string;
  fotoUrl?: string; // URL da foto após upload
  dataCadastro?: Date;
}

// Tipo para as props do componente (se necessário)
export interface VisitanteFormProps {
  onSubmit?: (data: VisitanteFormData) => void;
  initialData?: Partial<VisitanteFormData>;
  loading?: boolean;
}

// Tipo para erros de validação
export interface VisitanteFormErrors {
  nome?: string;
  documento?: string;
  tipoVisitante?: string;
  placa?: string;
  foto?: string;
}

export interface VisitanteFormErrors {
  nome?: string;
  documento?: string;
  tipoVisitante?: string;
  placa?: string;
  corCarroVisita?: string;
  carroMarca?: string;
  foto?: string;
}
