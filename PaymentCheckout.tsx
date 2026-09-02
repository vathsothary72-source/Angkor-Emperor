import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  devices: number;
  features: string[];
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter Gamer',
    price: 9.99,
    currency: 'USD',
    devices: 1,
    features: ['1 Device', 'Basic Protection', '30 Days']
  },
  {
    id: 'pro',
    name: 'Pro Esports',
    price: 79.99,
    currency: 'USD',
    devices: 3,
    features: ['3 Devices', 'Ring-0 Kernel', '1 Year', 'Priority Support']
  },
  {
    id: 'lifetime',
    name: 'Lifetime Emperor',
    price: 149.00,
    currency: 'USD',
    devices: 5,
    features: ['5 Devices', 'Lifetime Access', 'All Features', 'Unlimited Updates']
  },
  {
    id: 'enterprise',
    name: 'CyberCafe Enterprise',
    price: 299.00,
    currency: 'USD',
    devices: 20,
    features: ['20 Devices', 'Admin Dashboard', 'Reseller Rights', '1 Year']
  }
];

export const PaymentCheckout: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleSelectPlan = async (plan: Plan) => {
    setSelectedPlan(plan);
    setStatus('processing');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/payment/khqr/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: plan.id })
      });

      const data = await response.json();
      if (data.success) {
        setQrData(data.qrData);
        setPaymentReference(data.payload.reference);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Payment generation error:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulatePayment = async () => {
    if (!selectedPlan) return;
    
    setIsLoading(true);
    setStatus('processing');

    try {
      const response = await fetch(`${API_URL}/api/payment/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan.id })
      });

      const data = await response.json();
      if (data.success) {
        // រង់ចាំ License ត្រូវបានចេញ (Polling)
        setTimeout(async () => {
          const licenseResponse = await fetch(`${API_URL}/api/admin/licenses?limit=1&order=desc`);
          const licenses = await licenseResponse.json();
          if (licenses && licenses.length > 0) {
            setLicenseKey(licenses[0].license_key);
            setStatus('success');
          }
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Simulation error:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gold mb-6">Purchase License</h2>

      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handleSelectPlan(plan)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedPlan?.id === plan.id
                ? 'border-gold bg-gold/10 shadow-glow'
                : 'border-gray-700 hover:border-gray-500'
            }`}
          >
            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
            <div className="text-2xl font-bold text-gold mt-2">
              ${plan.price} <span className="text-sm text-gray-400">{plan.currency}</span>
            </div>
            <div className="text-sm text-gray-400 mt-2">{plan.devices} Device{plan.devices > 1 ? 's' : ''}</div>
            <ul className="text-xs text-gray-500 mt-2 space-y-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-gold">◆</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Payment Display */}
      {selectedPlan && qrData && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* QR Code */}
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG
                value={qrData}
                size={200}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="H"
              />
            </div>

            {/* Payment Info */}
            <div className="flex-1 text-white">
              <h3 className="text-xl font-bold text-gold">{selectedPlan.name}</h3>
              <p className="text-3xl font-bold mt-2">${selectedPlan.price} USD</p>
              <p className="text-sm text-gray-400 mt-2">
                Reference: {paymentReference}
              </p>
              <p className="text-sm text-gray-400">
                Scan QR Code with any banking app (ACLEDA, ABA, Wing, Sathapana...)
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleSimulatePayment}
                  disabled={isLoading}
                  className="px-6 py-2 bg-gold text-black font-bold rounded-lg hover:bg-gold-dark transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Simulate Payment'}
                </button>
              </div>
            </div>
          </div>

          {/* Status */}
          {status === 'processing' && (
            <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500 rounded-lg text-blue-300">
              Processing payment...
            </div>
          )}

          {status === 'success' && licenseKey && (
            <div className="mt-4 p-4 bg-green-900/30 border border-green-500 rounded-lg text-green-300">
              <p className="font-bold">Payment Successful!</p>
              <p>Your License Key: <span className="font-mono text-gold">{licenseKey}</span></p>
              <p className="text-sm text-gray-400 mt-2">License has been activated automatically.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-300">
              Payment failed. Please try again or contact support.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
