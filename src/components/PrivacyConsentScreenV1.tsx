import React, { useState } from 'react';
import { Shield, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';

interface PrivacyConsentScreenV1Props {
  paymentData: {
    clientName: string;
    amount: number;
    period: string;
    accountNumber: string;
  };
  onConsent: (consent: boolean) => void;
  onBack: () => void;
}

export function PrivacyConsentScreenV1({ paymentData, onConsent, onBack }: PrivacyConsentScreenV1Props) {
  const [hasReadPolicy, setHasReadPolicy] = useState(false);
  const [acceptConsent, setAcceptConsent] = useState(false);
  const [showPolicyDetail, setShowPolicyDetail] = useState(false);

  const handleContinue = () => {
    if (acceptConsent && hasReadPolicy) {
      onConsent(true);
    }
  };

  const handleDecline = () => {
    onConsent(false);
  };

  const canProceed = acceptConsent && hasReadPolicy;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Mobile Phone Frame */}
      <div className="w-full max-w-sm bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
        {/* Phone notch (optional - comment out if not needed) */}
        <div className="bg-black h-6 flex justify-center pt-1">
          <div className="w-32 h-5 bg-black rounded-b-2xl"></div>
        </div>
        
        {/* Screen Content */}
        <div className="flex flex-col h-screen p-4 bg-white overflow-y-auto">
      {/* Header */}
      <div className="pt-4 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <h1 className="text-gray-900 text-lg">Protección de Datos</h1>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Antes de procesar su pago, necesitamos su consentimiento para el tratamiento de sus datos personales.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Información del pago */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-blue-900 text-sm">Procesando pago de:</span>
          </div>
          <p className="text-gray-900 ml-7 text-sm">{paymentData.clientName}</p>
          <p className="text-gray-600 text-xs ml-7">Monto: ${paymentData.amount.toFixed(2)}</p>
        </div>

        {/* Información sobre el tratamiento de datos */}
        <div className="mb-4">
          <h2 className="text-gray-900 text-base mb-3">¿Para qué usamos sus datos?</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-gray-700 text-xs">
                <strong>Procesar su pago:</strong> Utilizamos sus datos para completar la transacción.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-gray-700 text-xs">
                <strong>Cumplir obligaciones legales:</strong> Mantenemos registros según normativa ecuatoriana.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-gray-700 text-xs">
                <strong>Mejorar servicios:</strong> Analizamos patrones de uso para optimizar la plataforma.
              </p>
            </div>
          </div>
        </div>

        {/* Sus derechos */}
        <div className="mb-4">
          <h2 className="text-gray-900 text-base mb-3">Sus derechos</h2>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-700 text-xs mb-2">
              Conforme a la Ley de Protección de Datos de Ecuador, usted tiene derecho a:
            </p>
            
            <div className="space-y-1">
              <p className="text-gray-600 text-xs">• Acceder a sus datos</p>
              <p className="text-gray-600 text-xs">• Rectificar información</p>
              <p className="text-gray-600 text-xs">• Solicitar eliminación</p>
              <p className="text-gray-600 text-xs">• Retirar consentimiento</p>
            </div>
          </div>
        </div>

        {/* Política de privacidad */}
        <div className="mb-4">
          <button
            onClick={() => setShowPolicyDetail(!showPolicyDetail)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-xs underline"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Leer política de privacidad completa</span>
          </button>
          
          {showPolicyDetail && (
            <div className="mt-2 p-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 max-h-24 overflow-y-auto">
              <p className="mb-1">
                <strong>Responsable:</strong> Empresa Municipal de Agua Potable
              </p>
              <p className="mb-1">
                <strong>Contacto:</strong> privacidad@aguapotable.gob.ec
              </p>
              <p>
                <strong>Tiempo de conservación:</strong> 7 años según normativa fiscal
              </p>
            </div>
          )}
        </div>

        {/* Checkboxes de consentimiento */}
        <div className="mb-4 space-y-3">
          {/* Política de privacidad */}
          <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-gray-200">
            <input
              type="checkbox"
              id="policy-read"
              checked={hasReadPolicy}
              onChange={(e) => setHasReadPolicy(e.target.checked)}
              className="mt-0.5 w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="policy-read" className="text-gray-700 text-xs">
              He leído y entiendo la información sobre el tratamiento de mis datos personales.
            </label>
          </div>

          {/* Consentimiento explícito */}
          <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-gray-200">
            <input
              type="checkbox"
              id="consent"
              checked={acceptConsent}
              onChange={(e) => setAcceptConsent(e.target.checked)}
              className="mt-0.5 w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="consent" className="text-gray-700 text-xs">
              <strong>Doy mi consentimiento explícito</strong> para que mis datos personales sean procesados 
              con el propósito de realizar esta transacción de pago.
            </label>
          </div>
        </div>

        {/* Advertencia si no acepta */}
        {(!acceptConsent || !hasReadPolicy) && (acceptConsent || hasReadPolicy) && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-3 h-3 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 text-xs">
                Debe aceptar ambas condiciones para continuar.
              </p>
            </div>
          </div>
        )}

        {/* Espaciador flexible */}
        <div className="flex-1" />

        {/* Botones de acción */}
        <div className="space-y-2 pb-4">
          <button
            onClick={handleContinue}
            disabled={!canProceed}
            className={`w-full py-3 text-sm rounded-lg transition-all shadow-lg ${
              canProceed
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-98'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Acepto y Continuar
          </button>

          <button
            onClick={handleDecline}
            className="w-full py-2 text-blue-600 hover:text-blue-700 transition-colors active:scale-98 border border-blue-600 rounded-lg text-sm"
          >
            No Acepto - Volver
          </button>

          <button
            onClick={onBack}
            className="w-full py-1 text-gray-500 hover:text-gray-700 transition-colors text-xs"
          >
            ← Volver al resumen
          </button>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}