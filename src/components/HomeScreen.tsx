import React from 'react';
import { CreditCard, Zap, Phone, Droplet, Car, TrendingUp, Send, MoreHorizontal, ArrowLeft } from 'lucide-react';
import type { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const services = [
    { id: 'water', icon: Droplet, label: 'Agua Potable', color: 'bg-blue-500' },
    { id: 'electricity', icon: Zap, label: 'Luz Eléctrica', color: 'bg-yellow-500' },
    { id: 'phone', icon: Phone, label: 'Telefonía', color: 'bg-green-500' },
    { id: 'credit', icon: CreditCard, label: 'Tarjetas', color: 'bg-purple-500' },
    { id: 'vehicle', icon: Car, label: 'Vehículo', color: 'bg-red-500' },
    { id: 'investments', icon: TrendingUp, label: 'Inversiones', color: 'bg-indigo-500' },
    { id: 'transfers', icon: Send, label: 'Transferir', color: 'bg-pink-500' },
    { id: 'more', icon: MoreHorizontal, label: 'Más', color: 'bg-gray-500' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Mobile Phone Frame */}
      <div className="w-full max-w-sm bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
        {/* Phone notch (optional - comment out if not needed) */}
        <div className="bg-black h-6 flex justify-center pt-1">
          <div className="w-32 h-5 bg-black rounded-b-2xl"></div>
        </div>
        
        {/* Screen Content */}
        <div className="flex flex-col h-screen bg-gradient-to-b from-yellow-400 via-yellow-300 to-white">
          {/* Header */}
          <div className="px-6 pt-12 pb-6">
            <div className="flex items-center justify-between mb-6">
              <ArrowLeft className="w-6 h-6 text-gray-800" />
              <h1 className="text-gray-800">Banca Móvil</h1>
              <div className="w-6 h-6" />
            </div>
            
            <div className="text-gray-800 mb-2">Bienvenido,</div>
            <div className="text-gray-900">Juan Carlos Pérez</div>
            
            {/* Balance Card */}
            <div className="mt-6 bg-white rounded-2xl p-5 shadow-lg">
              <div className="text-gray-600 text-sm mb-1">Saldo disponible</div>
              <div className="text-gray-900 mb-3">$2,450.75</div>
              <div className="text-gray-600 text-xs">Cuenta de Ahorros ***1234</div>
            </div>
          </div>

          {/* Services Section */}
          <div className="flex-1 bg-white rounded-t-3xl px-6 pt-6 pb-8 overflow-y-auto">
        <div className="mb-4 text-gray-700">¿Qué deseas hacer hoy?</div>
        
        <div className="grid grid-cols-4 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => service.id === 'water' ? onNavigate('services') : null}
              className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors active:scale-95"
            >
              <div className={`${service.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-md`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs text-gray-700 text-center leading-tight">{service.label}</span>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="mb-4 text-gray-700">Actividad reciente</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-gray-900 text-sm">EPMAPS - Agua Potable</div>
                  <div className="text-gray-500 text-xs">Sep 23, 2025</div>
                </div>
              </div>
              <div className="text-gray-900 text-sm">-$28.50</div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-gray-900 text-sm">EEQ - Luz Eléctrica</div>
                  <div className="text-gray-500 text-xs">Sep 15, 2025</div>
                </div>
              </div>
              <div className="text-gray-900 text-sm">-$45.20</div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}
