export interface Inmueble {
    id: number;
    titulo: string;
    precio: string;
    area: number;
    descripcion: string;
    localidad: string;
    galeria_fotos?: string;
    foto_principal: string;
    banios?: number;
    dormitorios?: number;
    subtitulo?: string;
  }
  