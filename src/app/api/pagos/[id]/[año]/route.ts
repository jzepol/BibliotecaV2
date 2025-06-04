// src/app/api/pagos/[id]/[año]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; año: string } }
) {
  try {
    const asociadoId = parseInt(params.id)
    const año = parseInt(params.año)

    if (isNaN(asociadoId) || isNaN(año)) {
      return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 })
    }

    const pagos = await prisma.pago.findMany({
      where: {
        asociadoId,
        año,
      },
      orderBy: {
        mes: "asc",
      },
    })

    return NextResponse.json(pagos)
  } catch (error) {
    console.error("Error GET /api/pagos/[id]/[año]", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
