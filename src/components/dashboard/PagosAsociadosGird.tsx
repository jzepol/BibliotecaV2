// components/dashboard/PagosAsociadosGrid.tsx

"use client"

import React, { useEffect, useState } from "react"
import styles from "./PagosAsociadosGrid.module.css"
import Image from "next/image"
import { getAllAsociados } from "@/services/asociadosService"
import { Pago, EstadoPago, Mes } from "@prisma/client"
import PagoPopup from "./PagoPopup"

interface Asociado {
  id: number
  nombre: string
  apellido: string
  dni: number
}

export default function PagosAsociadosGrid() {
  const [asociados, setAsociados] = useState<Asociado[]>([])
  const [popupVisible, setPopupVisible] = useState(false)
  const [asociadoSeleccionado, setAsociadoSeleccionado] = useState<Asociado | null>(null)

  useEffect(() => {
    async function cargarAsociados() {
      const data = await getAllAsociados()
      setAsociados(data)
    }
    cargarAsociados()
  }, [])

  const meses: number[] = Array.from({ length: 12 }, (_, i) => i + 1)

  const handleEditarPagos = (asociado: Asociado) => {
    setAsociadoSeleccionado(asociado)
    setPopupVisible(true)
  }

  return (
    <div className={styles.gridContainer}>
      <h2>Sistema de pagos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th colSpan={12}>Sistema de Pagos</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {asociados.map((asociado) => (
            <tr key={asociado.id}>
              <td>{asociado.id}</td>
              <td>{asociado.nombre}</td>
              <td>{asociado.apellido}</td>
              <td>{asociado.dni}</td>
              {meses.map((mes) => (
                <td key={mes}>
                  <div className={styles.pagoBox + " " + styles.pendiente}>{mes}</div>
                </td>
              ))}
              <td>
                <button onClick={() => handleEditarPagos(asociado)} className={styles.editarBoton}>
                  Editar pagos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {popupVisible && asociadoSeleccionado && (
        <PagoPopup asociado={asociadoSeleccionado} onClose={() => setPopupVisible(false)} />
      )}
    </div>
  )
}
