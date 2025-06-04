'use client'

import { useEffect, useState } from 'react'
import { EstadoPago, Mes } from '@prisma/client'
import { guardarPagos } from '@/services/pagosService'
import styles from './EditarPagoPopup.module.css'

interface Props {
  asociado: {
    id: number
    nombre: string
    apellido: string
    dni: number
  }
  año: number
  onClose: () => void
  onSuccess: () => void
}

interface EstadoMes {
  mes: Mes
  estado: EstadoPago
  comprobanteUrl?: string
  comentario?: string
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

export default function EditarPagoPopup({ asociado, año, onClose, onSuccess }: Props) {
  const [estados, setEstados] = useState<EstadoMes[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
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
            comentario: pago?.comentario || undefined,
          }
        })

        setEstados(estadoInicial)
      } catch (error) {
        console.error("Error al cargar pagos:", error)
        setEstados(meses.map((mes) => ({ mes, estado: "PENDIENTE" })))
      }
    }

    fetchPagos()
  }, [asociado.id, año])

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

  const handleComentarioChange = (mes: Mes, comentario: string) => {
    setEstados((prev) =>
      prev.map((m) => (m.mes === mes ? { ...m, comentario } : m))
    )
  }

  const handleGuardar = async () => {
    setLoading(true)
    try {
      const pagos = await Promise.all(estados.map(async ({ mes, estado, file, comentario }) => {
        let comprobanteUrl = undefined
        if (file) {
          comprobanteUrl = await uploadToCloudinary(file)
        }
        return { mes, estado, comprobanteUrl, comentario }
      }))

      await guardarPagos(asociado.id, año, pagos)
      onSuccess()
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
              <th>Estado</th>
              <th>Comprobante</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {estados.map(({ mes, estado, comprobanteUrl }) => (
              <tr key={mes}>
                <td>{mes.toLowerCase()}</td>
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
                <td>
                  {comprobanteUrl ? (
                    <a
                      href={comprobanteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkComprobante}
                    >
                      Ver comprobante
                    </a>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] && handleFileChange(mes, e.target.files[0])
                      }
                    />
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Agregar comentario"
                    onChange={(e) => handleComentarioChange(mes, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.popupFooter}>
          <button
            onClick={handleGuardar}
            disabled={loading}
            className={styles.botonGuardar}
          >
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