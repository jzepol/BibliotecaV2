import { PrismaClient, EstadoPrestamo, Categoria, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

type BigIntValue = bigint | string | number
type DateValue = Date | string
type ConvertibleValue = 
  | BigIntValue 
  | DateValue 
  | null 
  | undefined 
  | ConvertibleValue[] 
  | { [key: string]: ConvertibleValue }
  | Categoria

// Función auxiliar para convertir BigInt a string
function convertirBigInt(obj: ConvertibleValue): ConvertibleValue {
  if (obj === null || obj === undefined) {
    return obj
  }
  
  if (typeof obj === 'bigint') {
    return obj.toString()
  }

  if (obj instanceof Date) {
    return obj.toISOString()
  }
  
  if (Array.isArray(obj)) {
    return obj.map(convertirBigInt)
  }
  
  if (typeof obj === 'object') {
    const result: { [key: string]: ConvertibleValue } = {}
    for (const key in obj) {
      result[key] = convertirBigInt(obj[key])
    }
    return result
  }
  
  return obj
}

export async function crearPrestamo(
  asociadoId: number,
  libroId: number,
  estado: EstadoPrestamo = EstadoPrestamo.ACTIVO
) {
  try {
    // Verificar si ya existe un préstamo activo para este libro
    const prestamoExistente = await prisma.prestamo.findFirst({
      where: {
        libroId,
        estado: {
          in: [EstadoPrestamo.ACTIVO]
        }
      }
    })

    console.log('📚 Prestamo existente para libro:', libroId, prestamoExistente);

    if (prestamoExistente) {
      throw new Error('Este libro ya está prestado')
    }

    // Verificar si el asociado tiene préstamos vencidos
    const prestamosVencidos = await prisma.prestamo.findFirst({
      where: {
        asociadoId,
        estado: EstadoPrestamo.VENCIDO
      }
    })

    if (prestamosVencidos) {
      throw new Error('El asociado tiene préstamos vencidos pendientes')
    }

    const fechaInicio = new Date()
    const fechaFin = new Date()
    fechaFin.setDate(fechaFin.getDate() + 31) // 31 días de préstamo

    const prestamo = await prisma.prestamo.create({
      data: {
        asociadoId,
        libroId,
        estado,
        fechaInicio,
        fechaFin,
      },
      include: {
        asociado: true,
        libro: true,
      },
    })

    return convertirBigInt(prestamo)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Error de Prisma al crear préstamo:', error.code, error.message, error.meta);
      // Dependiendo del código de error, puedes lanzar un mensaje más específico
      // Por ahora, lanzamos el error original para depuración.
    }
    throw error
  }
}

export async function obtenerPrestamos() {
  const prestamos = await prisma.prestamo.findMany({
    include: {
      asociado: true,
      libro: true,
    },
    orderBy: { fechaInicio: 'desc' },
  })
  return convertirBigInt(prestamos)
}

export async function obtenerPrestamoPorId(id: number) {
  const prestamo = await prisma.prestamo.findUnique({
    where: { id },
    include: {
      asociado: true,
      libro: true,
    },
  })
  return prestamo ? convertirBigInt(prestamo) : null
}

export async function eliminarPrestamo(id: number) {
  const prestamo = await prisma.prestamo.delete({
    where: { id },
    include: {
      asociado: true,
      libro: true,
    },
  })
  return convertirBigInt(prestamo)
}

export async function obtenerPrestamosActivos() {
  const prestamos = await prisma.prestamo.findMany({
    where: {
      estado: EstadoPrestamo.ACTIVO,
    },
    include: {
      asociado: true,
      libro: true,
    },
    orderBy: { fechaInicio: 'desc' },
  })
  return convertirBigInt(prestamos)
}

export async function obtenerPrestamosPorAsociado(asociadoId: number) {
  const prestamos = await prisma.prestamo.findMany({
    where: {
      asociadoId,
    },
    include: {
      asociado: true,
      libro: true,
    },
    orderBy: { fechaInicio: 'desc' },
  })
  return convertirBigInt(prestamos)
}

export async function obtenerPrestamosPorLibro(libroId: number) {
  const prestamos = await prisma.prestamo.findMany({
    where: {
      libroId,
    },
    include: {
      asociado: true,
      libro: true,
    },
    orderBy: { fechaInicio: 'desc' },
  })
  return convertirBigInt(prestamos)
}

export async function verificarPrestamosLibro(libroId: number) {
  const prestamos = await prisma.prestamo.findMany({
    where: {
      libroId
    },
    include: {
      asociado: true,
      libro: true
    },
    orderBy: {
      fechaInicio: 'desc'
    }
  })
  
  console.log('📚 Todos los préstamos del libro:', libroId)
  console.log(prestamos)
  
  return convertirBigInt(prestamos)
} 