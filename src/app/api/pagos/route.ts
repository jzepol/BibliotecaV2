// src/app/api/pagos/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { EstadoPago, Mes } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { asociadoId, año, pagos } = body

    if (!asociadoId || !año || !pagos || !Array.isArray(pagos)) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    const pagosGuardados = await Promise.all(
      pagos.map(async (pago) => {
        return await prisma.pago.upsert({
          where: {
            asociadoId_mes_año: {
              asociadoId: Number(asociadoId),
              mes: pago.mes as Mes,
              año: Number(año),
            },
          },
          update: {
            estado: pago.estado as EstadoPago,
            comprobanteUrl: pago.comprobanteUrl,
            comentario: pago.comentario,
            fechaPago: new Date(),
          },
          create: {
            asociadoId: Number(asociadoId),
            mes: pago.mes as Mes,
            año: Number(año),
            estado: pago.estado as EstadoPago,
            comprobanteUrl: pago.comprobanteUrl,
            comentario: pago.comentario,
          },
        })
      })
    )

    return NextResponse.json(pagosGuardados)
  } catch (error) {
    console.error("Error en /api/pagos:", error)
    return NextResponse.json({ error: "Error al guardar los pagos" }, { status: 500 })
  }
}
