export interface IinitialData {
  auth_date: string | Date;
  hash?: string;
  query_id?: string;
  signature?: string;
  user?: IUserInitialData;
}

export interface IUserInitialData {
  allows_write_to_pm?: boolean;
  first_name?: string;
  id?: number;
  last_name?: string;
  language_code?: string;
  photo_url?: string;
}
