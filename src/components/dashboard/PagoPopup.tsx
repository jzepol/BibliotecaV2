// components/dashboard/PagoPopup.tsx

"use client"

import React, { useEffect, useState } from "react"
import styles from "./PagoPopup.module.css"
import { EstadoPago, Mes } from "@prisma/client"
import { guardarPagos } from "@/services/pagosService"

interface Props {
  asociado: {
    id: number
    nombre: string
    apellido: string
    dni: number
  }
  onClose: () => void
}

interface EstadoMes {
  mes: Mes
  estado: EstadoPago
  comprobanteUrl?: string
  file?: File
}

const meses: Mes[] = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
]

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "default")

  const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData
  })

  if (!res.ok) throw new Error("Error subiendo imagen a Cloudinary")

  const data = await res.json()
  return data.secure_url
}

const PagoPopup: React.FC<Props> = ({ asociado, onClose }) => {
  const [estados, setEstados] = useState<EstadoMes[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const año = new Date().getFullYear()

    const fetchPagos = async () => {
      try {
        const res = await fetch(`/api/pagos/${asociado.id}/${año}`)
        const data = await res.json()

        const estadoInicial: EstadoMes[] = meses.map((mes) => {
          const pago = data.find((p: any) => p.mes === mes)
          return {
            mes,
            estado: pago?.estado || "PENDIENTE",
            comprobanteUrl: pago?.comprobanteUrl || undefined,
          }
        })

        setEstados(estadoInicial)
      } catch (error) {
        console.error("Error al cargar pagos:", error)
        setEstados(meses.map((mes) => ({ mes, estado: "PENDIENTE" })))
      }
    }

    fetchPagos()
  }, [asociado.id])

  const handleEstadoChange = (mes: Mes, estado: EstadoPago) => {
    setEstados((prev) =>
      prev.map((m) => (m.mes === mes ? { ...m, estado } : m))
    )
  }

  const handleFileChange = (mes: Mes, file: File) => {
    setEstados((prev) =>
      prev.map((m) => (m.mes === mes ? { ...m, file } : m))
    )
  }

  const handleGuardar = async () => {
    setLoading(true)
    try {
      const año = new Date().getFullYear()
      const pagos = await Promise.all(estados.map(async ({ mes, estado, file }) => {
        let comprobanteUrl = undefined
        if (file) {
          comprobanteUrl = await uploadToCloudinary(file)
        }
        return { mes, estado, comprobanteUrl }
      }))

      await guardarPagos(asociado.id, año, pagos)
      onClose()
    } catch (error) {
      console.error("Error al guardar pagos:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <h3>
          {asociado.apellido}, {asociado.nombre} - DNI {asociado.dni}
        </h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Comprobante</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {estados.map(({ mes, estado }) => (
              <tr key={mes}>
                <td>{mes.toLowerCase()}</td>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files?.[0] && handleFileChange(mes, e.target.files[0])
                    }
                  />
                </td>
                <td>
                  <select
                    value={estado}
                    onChange={(e) =>
                      handleEstadoChange(mes, e.target.value as EstadoPago)
                    }
                  >
                    <option value="PAGADO">Pago</option>
                    <option value="IMPAGO">Impago</option>
                    <option value="PENDIENTE">Pendiente</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.popupFooter}>
          <button onClick={handleGuardar} disabled={loading} className={styles.botonGuardar}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button onClick={onClose} className={styles.botonCerrar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PagoPopup