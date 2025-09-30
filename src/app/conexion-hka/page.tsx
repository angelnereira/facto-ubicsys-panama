'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ConexionHKA } from '@/types/config';

export default function ConexionHKAPage() {
  const [conexion, setConexion] = useState<ConexionHKA>({
    ambiente: 'produccion',
    token_empresa: '',
    token_password: '',
    url_base: 'https://emision.thefactoryhka.com.pa/ws/obj/v1.0/Service.svc',
    activo: false,
  });
  const [testing, setTesting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    cargarConexion();
  }, []);

  const cargarConexion = async () => {
    const { data } = await supabase
      .from('conexion_hka')
      .select('*')
      .eq('ambiente', 'produccion')
      .single();
    if (data) setConexion(data);
  };

  const probarConexion = async () => {
    setTesting(true);
    const response = await fetch('/api/hka/test', {
      method: 'POST',
      body: JSON.stringify(conexion),
    });
    const result = await response.json();
    alert(result.success ? '✓ Conexión exitosa con HKA' : '✗ Error: ' + result.message);
    setTesting(false);
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...conexion,
      fecha_activacion: conexion.activo ? new Date().toISOString() : null,
    };

    const { error } = await supabase
      .from('conexion_hka')
      .upsert(dataToSave);
    
    if (!error) alert('Credenciales de producción guardadas');
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <p className="text-sm text-yellow-700">
          ⚠️ <strong>Modo Producción:</strong> Estas credenciales se usarán para facturación real.
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-8">Conexión HKA - Producción</h1>
      
      <form onSubmit={guardar} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">URL Base Producción</label>
          <input
            type="url"
            value={conexion.url_base}
            onChange={(e) => setConexion({...conexion, url_base: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">URL del servicio SOAP de HKA</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Token Empresa</label>
          <input
            type="text"
            value={conexion.token_empresa}
            onChange={(e) => setConexion({...conexion, token_empresa: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg font-mono"
            placeholder="TOKENEMPRESA_PROD"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Token Password</label>
          <input
            type="password"
            value={conexion.token_password}
            onChange={(e) => setConexion({...conexion, token_password: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg font-mono"
            placeholder="TOKENPASSWORD_PROD"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={probarConexion}
            disabled={testing || !conexion.token_empresa || !conexion.token_password}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
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

        <div className="border-t pt-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={conexion.activo}
              onChange={(e) => setConexion({...conexion, activo: e.target.checked})}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">
              Activar modo producción (desactivará el modo demo)
            </label>
          </div>
          {conexion.activo && (
            <p className="text-xs text-red-600 mt-2">
              ⚠️ Las facturas emitidas serán reales y reportadas a la DGI
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
