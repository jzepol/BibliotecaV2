import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Pago } from '@/types/pago';
import { Asociado } from '@/types/asociado';
import EditarPagoPopup from './EditarPagoPopup';
import RegistrarPagoPopup from './RegistrarPagoPopup';
import '@/styles/components/PagosAsociadosGrid.css';

const PagosAsociadosGrid: React.FC = () => {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [asociados, setAsociados] = useState<Asociado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagoSeleccionado, setPagoSeleccionado] = useState<number | null>(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [pagosRes, asociadosRes] = await Promise.all([
        fetch('/api/pagos/all'),
        fetch('/api/asociados/all')
      ]);
      const pagosData = await pagosRes.json();
      const asociadosData = await asociadosRes.json();
      setPagos(pagosData);
      setAsociados(asociadosData);
    } catch (err) {
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleEditarPago = (pagoId: number) => {
    setPagoSeleccionado(pagoId);
  };

  const handlePagoActualizado = () => {
    setPagoSeleccionado(null);
    cargarDatos();
  };

  const handlePagoRegistrado = () => {
    setMostrarRegistro(false);
    cargarDatos();
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid-container">
      <h2>Pagos de Asociados</h2>
      
      <div className="filtros">
        <input type="text" placeholder="Buscar por asociado..." />
        <select>
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="pagado">Pagado</option>
          <option value="rechazado">Rechazado</option>
        </select>
        <button className="btn-editar" onClick={() => setMostrarRegistro(true)}>
          Registrar Pago
        </button>
      </div>

      <div className="tabla-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asociado</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Comprobante</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => {
              const asociado = asociados.find(a => a.id === pago.asociadoId);
              return (
                <tr key={pago.id}>
                  <td>{pago.id}</td>
                  <td>{asociado ? `${asociado.nombre} ${asociado.apellido}` : 'Asociado no encontrado'}</td>
                  <td>{pago.monto ? `$${pago.monto.toFixed(2)}` : '-'}</td>
                  <td>{pago.fecha ? new Date(pago.fecha).toLocaleDateString() : '-'}</td>
                  <td>
                    <div className="estados-pagos">
                      <div
                        className="estado-pago"
                        style={{
                          backgroundColor:
                            pago.estado === 'pagado'
                              ? '#4CAF50'
                              : pago.estado === 'rechazado'
                              ? '#f44336'
                              : '#FFC107'
                        }}
                        title={pago.estado}
                      />
                    </div>
                  </td>
                  <td>
                    {pago.comprobante ? (
                      <a
                        href={pago.comprobante}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-comprobante"
                      >
                        Ver comprobante
                      </a>
                    ) : (
                      'Sin comprobante'
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => handleEditarPago(pago.id)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagoSeleccionado && (
        <EditarPagoPopup
          pagoId={pagoSeleccionado}
          onClose={() => setPagoSeleccionado(null)}
          onPagoActualizado={handlePagoActualizado}
        />
      )}

      {mostrarRegistro && (
        <RegistrarPagoPopup
          onClose={() => setMostrarRegistro(false)}
          onPagoRegistrado={handlePagoRegistrado}
        />
      )}
    </div>
  );
};

export default PagosAsociadosGrid; 