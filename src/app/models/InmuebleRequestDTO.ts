export interface InmuebleRequestDTO {
    titulo: string;
    subtitulo: string;
    descripcion: string;
    precio: string;
    localidad: string;
    galeria_fotos?: string; 
    foto_principal: string;
    banios?: number;
    dormitorios?: number;
    tipoId: number;
    contratoId: number;
  }
  