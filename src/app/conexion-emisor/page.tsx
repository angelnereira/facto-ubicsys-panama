'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ConexionEmisor } from '@/types/config';

export default function ConexionEmisorPage() {
  const [conexion, setConexion] = useState<ConexionEmisor>({
    tipo_conexion: 'api',
    nombre_sistema: '',
    activo: false,
  });
  const [testing, setTesting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    cargarConexion();
  }, []);

  const cargarConexion = async () => {
    const { data } = await supabase
      .from('conexion_emisor')
      .select('*')
      .single();
    if (data) setConexion(data);
  };

  const probarConexion = async () => {
    setTesting(true);
    // Implementar lógica de prueba según tipo_conexion
    const response = await fetch('/api/emisor/test', {
      method: 'POST',
      body: JSON.stringify(conexion),
    });
    const result = await response.json();
    alert(result.success ? 'Conexión exitosa' : 'Error: ' + result.message);
    setTesting(false);
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('conexion_emisor')
      .upsert(conexion);
    
    if (!error) alert('Configuración guardada');
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Conexión con Sistema Emisor</h1>
      
      <form onSubmit={guardar} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de Conexión</label>
          <select
            value={conexion.tipo_conexion}
            onChange={(e) => setConexion({...conexion, tipo_conexion: e.target.value as any})}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="api">API REST</option>
            <option value="database">Base de Datos</option>
            <option value="webhook">Webhook</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Nombre del Sistema</label>
          <input
            type="text"
            value={conexion.nombre_sistema}
            onChange={(e) => setConexion({...conexion, nombre_sistema: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Ej: Sistema de Facturación ABC"
            required
          />
        </div>

        {conexion.tipo_conexion === 'api' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">URL Base</label>
              <input
                type="url"
                value={conexion.url_base || ''}
                onChange={(e) => setConexion({...conexion, url_base: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="https://api.cliente.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <input
                type="password"
                value={conexion.api_key || ''}
                onChange={(e) => setConexion({...conexion, api_key: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </>
        )}

        {conexion.tipo_conexion === 'database' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Host</label>
                <input
                  type="text"
                  value={conexion.database_host || ''}
                  onChange={(e) => setConexion({...conexion, database_host: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Puerto</label>
                <input
                  type="number"
                  value={conexion.database_port || ''}
                  onChange={(e) => setConexion({...conexion, database_port: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nombre Base de Datos</label>
              <input
                type="text"
                value={conexion.database_name || ''}
                onChange={(e) => setConexion({...conexion, database_name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </>
        )}

        {conexion.tipo_conexion === 'webhook' && (
          <div>
            <label className="block text-sm font-medium mb-2">URL Webhook</label>
            <input
              type="url"
              value={conexion.webhook_url || ''}
              onChange={(e) => setConexion({...conexion, webhook_url: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="https://webhook.cliente.com/facturacion"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={probarConexion}
            disabled={testing}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            {testing ? 'Probando...' : 'Probar Conexión'}
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={conexion.activo}
            onChange={(e) => setConexion({...conexion, activo: e.target.checked})}
            className="w-4 h-4"
          />
          <label className="text-sm">Activar esta conexión</label>
        </div>
      </form>
    </div>
  );
}
