export interface INovoVisitante {
  Nome: string;
  Cpf: string;
  TipoVisitante: string;
  DataInicio: Date;
  DataFim: Date;
  Placa: string | null;
  CorCarroVisita: string | null;
  MarcaCarroVisita: string | null;
  Foto: File;
}
