import { Categoria } from '@prisma/client';

export interface Asociado {
  id: number;
  email: string;
  apellido: string;
  nombre: string;
  dni: number;
  telefono: bigint | null;
  fechaNacimiento: Date;
  direccion: string;
  categoria: Categoria;
  escuela: string | null;
  curso: string | null;
  comentario: string | null;
  fechaInscripcion: Date;
  estado: 'activo' | 'inactivo';
  createdAt: Date;
  updatedAt: Date;
} 