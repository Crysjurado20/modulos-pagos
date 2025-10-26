import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { WaterPaymentScreen } from './components/WaterPaymentScreen';
import { PrivacyConsentScreenV1 } from './components/PrivacyConsentScreenV1';
import { ConfirmPaymentScreen } from './components/ConfirmPaymentScreen';
import { CreditCardFormScreen, CreditCardData } from './components/CreditCardFormScreen';
import { ReceiptScreen } from './components/ReceiptScreen';
import { Smartphone } from 'lucide-react';

export type Screen = 'home' | 'services' | 'water-payment' | 'privacy-consent' | 'confirm' | 'credit-card-form' | 'receipt';

export interface PaymentData {
  accountNumber: string;
  clientName: string;
  address: string;
  amount: number;
  period: string;
  company: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [hasPrivacyConsent, setHasPrivacyConsent] = useState<boolean>(false);
  const [creditCards, setCreditCards] = useState<CreditCardData[]>([]);

  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handlePaymentData = (data: PaymentData) => {
    setPaymentData(data);
  };

  const handlePrivacyConsent = (consent: boolean) => {
    setHasPrivacyConsent(consent);
    if (consent) {
      setCurrentScreen('confirm');
    } else {
      setCurrentScreen('water-payment');
    }
  };

  const handleCardAdded = (cardData: CreditCardData) => {
    setCreditCards(prev => [...prev, cardData]);
  };

  return (
    <>
      {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigation} />}
      {currentScreen === 'services' && <ServicesScreen onNavigate={handleNavigation} />}
      {currentScreen === 'water-payment' && (
        <WaterPaymentScreen 
          onNavigate={handleNavigation} 
          onPaymentData={handlePaymentData}
        />
      )}
      {currentScreen === 'privacy-consent' && paymentData && (
        <PrivacyConsentScreenV1 
          paymentData={{
            clientName: paymentData.clientName,
            amount: paymentData.amount,
            period: paymentData.period,
            accountNumber: paymentData.accountNumber
          }}
          onConsent={handlePrivacyConsent}
          onBack={() => setCurrentScreen('water-payment')}
        />
      )}
      {currentScreen === 'confirm' && paymentData && (
        <ConfirmPaymentScreen 
          onNavigate={handleNavigation}
          paymentData={paymentData}
          creditCards={creditCards}
        />
      )}
      {currentScreen === 'credit-card-form' && (
        <CreditCardFormScreen 
          onNavigate={handleNavigation}
          onCardAdded={handleCardAdded}
        />
      )}
      {currentScreen === 'receipt' && paymentData && (
        <ReceiptScreen 
          onNavigate={handleNavigation}
          paymentData={paymentData}
        />
      )}
    </>
  );
}
