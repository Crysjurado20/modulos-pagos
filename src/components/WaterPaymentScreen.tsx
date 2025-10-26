import React, { useState } from 'react';
import { ArrowLeft, Info, Droplet, AlertCircle, CheckCircle2, Camera, FileText } from 'lucide-react';
import type { Screen, PaymentData } from '../App';

interface WaterPaymentScreenProps {
  onNavigate: (screen: Screen) => void;
  onPaymentData: (data: PaymentData) => void;
}

export function WaterPaymentScreen({ onNavigate, onPaymentData }: WaterPaymentScreenProps) {
  const [accountNumber, setAccountNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDebt, setShowDebt] = useState(false);

  const handleConsultDebt = () => {
    if (accountNumber.length < 6) {
      return;
    }

    setIsLoading(true);
    // Simulación de consulta
    setTimeout(() => {
      setIsLoading(false);
      setShowDebt(true);
    }, 1500);
  };

  const handleContinue = () => {
    const data: PaymentData = {
      accountNumber: accountNumber,
      clientName: 'Juan Carlos Pérez Mendoza',
      address: 'Av. 6 de Diciembre N34-150 y Bosmediano, Quito',
      amount: 28.50,
      period: 'Octubre 2025',
      company: 'EPMAPS - Quito',
    };
    onPaymentData(data);
    onNavigate('privacy-consent');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Mobile Phone Frame */}
      <div className="w-full max-w-sm bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
        {/* Phone notch (optional - comment out if not needed) */}
        <div className="bg-black h-6 flex justify-center pt-1">
          <div className="w-32 h-5 bg-black rounded-b-2xl"></div>
        </div>
        
        {/* Screen Content */}
        <div className="flex flex-col h-screen bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 pt-12 pb-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => onNavigate('services')} className="p-2 -ml-2 active:scale-95">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-white">Pago de Agua Potable</h1>
              <div className="w-6 h-6" />
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Droplet className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <div className="text-white">EPMAPS - Quito</div>
                <div className="text-blue-100 text-xs">Empresa Pública Metropolitana</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-t-3xl px-6 pt-6 pb-8 overflow-y-auto">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">1</div>
            <span className="text-xs text-gray-700">Datos</span>
          </div>
          <div className="w-8 h-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">2</div>
            <span className="text-xs text-gray-500">Confirmar</span>
          </div>
          <div className="w-8 h-px bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">3</div>
            <span className="text-xs text-gray-500">Pagar</span>
          </div>
        </div>

        {/* Info Card */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-gray-700 text-xs leading-relaxed">
              Ingresa tu número de cuenta o contrato que aparece en tu planilla de agua. Si no lo tienes, puedes usar la cédula del titular.
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">
            Número de cuenta o contrato *
          </label>
          <div className="relative">
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
                setShowDebt(false);
              }}
              placeholder="Ej: 123456789"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-gray-900"
              maxLength={15}
            />
            {accountNumber && (
              <button 
                onClick={() => {
                  setAccountNumber('');
                  setShowDebt(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Alternative Options */}
          <div className="mt-3 flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-xs text-gray-700 hover:bg-gray-200 active:scale-95">
              <Camera className="w-4 h-4" />
              Escanear planilla
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-xs text-gray-700 hover:bg-gray-200 active:scale-95">
              <FileText className="w-4 h-4" />
              Usar cédula
            </button>
          </div>
        </div>

        {/* Consult Button */}
        <button
          onClick={handleConsultDebt}
          disabled={accountNumber.length < 6 || isLoading}
          className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors active:scale-98 mb-6"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Consultando...
            </span>
          ) : (
            'Consultar deuda'
          )}
        </button>

        {/* Debt Information */}
        {showDebt && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Success Alert */}
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-green-900 text-sm mb-1">Cuenta encontrada</div>
                <div className="text-green-700 text-xs">Se encontraron los siguientes datos</div>
              </div>
            </div>

            {/* Client Info Card */}
            <div className="p-5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl">
              <div className="text-gray-700 text-sm mb-4">Información del cliente</div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-gray-500 text-xs mb-1">Titular</div>
                  <div className="text-gray-900">Juan Carlos Pérez Mendoza</div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-xs mb-1">Número de cuenta</div>
                  <div className="text-gray-900">{accountNumber}</div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-xs mb-1">Dirección</div>
                  <div className="text-gray-900 text-sm">Av. 6 de Diciembre N34-150 y Bosmediano, Quito</div>
                </div>
              </div>
            </div>

            {/* Debt Amount Card */}
            <div className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
              <div className="text-blue-100 text-sm mb-2">Total a pagar</div>
              <div className="text-3xl mb-3">$28.50</div>
              <div className="text-blue-100 text-xs">Periodo: Octubre 2025</div>
            </div>

            {/* Debt Detail */}
            <div className="p-4 bg-white border border-gray-200 rounded-xl">
              <div className="text-gray-700 text-sm mb-3">Detalle del consumo</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consumo de agua</span>
                  <span className="text-gray-900">$20.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alcantarillado</span>
                  <span className="text-gray-900">$6.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recolección de basura</span>
                  <span className="text-gray-900">$2.00</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">$28.50</span>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-amber-900 text-xs leading-relaxed">
                Verifica que los datos sean correctos antes de continuar. El pago se procesará inmediatamente.
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full py-4 bg-yellow-400 text-gray-900 rounded-xl hover:bg-yellow-500 transition-colors active:scale-98 shadow-lg"
            >
              Continuar con el pago
            </button>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}
