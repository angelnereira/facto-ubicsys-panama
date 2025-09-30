export interface ConfiguracionGeneral {
  id?: string;
  nombre_empresa: string;
  ruc: string;
  razon_social: string;
  codigo_sucursal_default: string;
  punto_facturacion_default: string;
  logo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ConexionEmisor {
  id?: string;
  tipo_conexion: 'api' | 'database' | 'webhook';
  nombre_sistema: string;
  url_base?: string;
  api_key?: string;
  database_host?: string;
  database_port?: number;
  database_name?: string;
  database_user?: string;
  database_password?: string;
  webhook_url?: string;
  activo: boolean;
  created_at?: string;
}

export interface ConexionHKA {
  id?: string;
  ambiente: 'demo' | 'produccion';
  token_empresa: string;
  token_password: string;
  url_base: string;
  activo: boolean;
  fecha_activacion?: string;
  created_at?: string;
}
