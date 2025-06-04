import { EstadoPago, Mes } from '@prisma/client';

export interface Pago {
  id: number;
  asociadoId: number;
  mes: Mes;
  año: number;
  fechaPago: Date;
  comprobanteUrl?: string;
  estado: EstadoPago;
  comentario?: string;
  createdAt: Date;
  updatedAt: Date;
  asociado?: {
    id: number;
    nombre: string;
    apellido: string;
  };
} 