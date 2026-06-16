export interface Reserva {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  horario: string;
  personas: number;
  comoNosConociste: string;
  timestamp: number;
}

export type ComoNosConociste =
  | "instagram"
  | "amigo"
  | "flyer"
  | "google"
  | "otro";

export interface Membresia {
  nombre: string;
  email: string;
  timestamp: number;
}

export interface FormInstituciones {
  organizacion: string;
  nombre: string;
  email: string;
  tipo: TipoInstitucion;
  mensaje: string;
  timestamp: number;
}

export type TipoInstitucion =
  | "educativa"
  | "cultural"
  | "empresa"
  | "organismo_publico"
  | "otro";

export type EstadoReserva =
  | "formulario"
  | "confirmacion"
  | "encuesta"
  | "cierre";

export interface DatoClave {
  label: string;
  valor: string;
}

export interface Fase {
  numero: number;
  nombre: string;
  concepto: string;
  eje: string;
  descripcion: string;
  indicacion: string;
  esDescanso?: boolean;
  imagen?: string;
}

export interface Experiencia {
  tag: string;
  nombre: string;
  artista: string;
  descripcion: string;
  datosClave: DatoClave[];
  fases: Fase[];
}
