import { Pago } from '@/types/pago';
import { prisma } from '@/lib/prisma';
import { EstadoPago, Mes } from '@prisma/client';

export async function obtenerPagos(): Promise<Pago[]> {
  try {
    const pagos = await prisma.pago.findMany({
      include: {
        asociado: {
          select: {
            id: true,
            nombre: true,
            apellido: true
          }
        }
      },
      orderBy: {
        fechaPago: 'desc'
      }
    });
    return pagos;
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    throw error;
  }
}

export async function obtenerPago(id: number): Promise<Pago> {
  try {
    const pago = await prisma.pago.findUnique({
      where: { id },
      include: {
        asociado: {
          select: {
            id: true,
            nombre: true,
            apellido: true
          }
        }
      }
    });
    if (!pago) throw new Error('Pago no encontrado');
    return pago;
  } catch (error) {
    console.error('Error al obtener pago:', error);
    throw error;
  }
}

export async function obtenerPagosPorAsociado(asociadoId: number, año: number): Promise<Pago[]> {
  try {
    const pagos = await prisma.pago.findMany({
      where: {
        asociadoId,
        año,
      },
      include: {
        asociado: {
          select: {
            id: true,
            nombre: true,
            apellido: true
          }
        }
      },
      orderBy: {
        mes: 'asc',
      },
    });
    return pagos;
  } catch (error) {
    console.error('Error en obtenerPagosPorAsociado:', error);
    throw error;
  }
}

export async function registrarPago(pago: Omit<Pago, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pago> {
  try {
    const nuevoPago = await prisma.pago.create({
      data: pago,
      include: {
        asociado: {
          select: {
            id: true,
            nombre: true,
            apellido: true
          }
        }
      }
    });
    return nuevoPago;
  } catch (error) {
    console.error('Error al registrar pago:', error);
    throw error;
  }
}

export async function actualizarPago(id: number, pago: Partial<Pago>): Promise<Pago> {
  try {
    const pagoActualizado = await prisma.pago.update({
      where: { id },
      data: pago,
      include: {
        asociado: {
          select: {
            id: true,
            nombre: true,
            apellido: true
          }
        }
      }
    });
    return pagoActualizado;
  } catch (error) {
    console.error('Error al actualizar pago:', error);
    throw error;
  }
}

interface PagoMesPayload {
  mes: Mes;
  estado: EstadoPago;
  comprobanteUrl?: string;
  comentario?: string;
}

export async function guardarPagos(asociadoId: number, año: number, pagos: PagoMesPayload[]): Promise<Pago[]> {
  try {
    const pagosGuardados = await Promise.all(
      pagos.map(async (pago) => {
        return await prisma.pago.upsert({
          where: {
            asociadoId_mes_año: {
              asociadoId,
              mes: pago.mes,
              año,
            },
          },
          update: {
            estado: pago.estado,
            comprobanteUrl: pago.comprobanteUrl,
            comentario: pago.comentario,
            fechaPago: new Date(),
          },
          create: {
            asociadoId,
            mes: pago.mes,
            año,
            estado: pago.estado,
            comprobanteUrl: pago.comprobanteUrl,
            comentario: pago.comentario,
          },
          include: {
            asociado: {
              select: {
                id: true,
                nombre: true,
                apellido: true
              }
            }
          }
        });
      })
    );

    return pagosGuardados;
  } catch (error) {
    console.error("Error en guardarPagos:", error);
    throw error;
  }
} 