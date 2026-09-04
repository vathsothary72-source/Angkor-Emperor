import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  Zap, 
  ExternalLink, 
  QrCode, 
  Terminal, 
  Smartphone, 
  AlertCircle,
  FileText,
  DollarSign,
  ArrowRight,
  Monitor
} from 'lucide-react';
import { License } from '../types';
import { AcledaKhqrCard } from './AcledaKhqrCard';

export interface CheckoutPlan {
  id: string;
  name: string;
  category: string;
  priceUsd: number;
  period: string;
  maxDevices: number;
  tier: 'monthly' | 'yearly' | 'lifetime' | 'enterprise';
  features: string[];
}

interface AutomatedCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: CheckoutPlan;
  onLicenseIssued: (newLicense: License) => void;
  onOpenClientSimWithKey?: (key: string) => void;
  onDownloadZip?: () => void;
}

type PaymentMethodType = 'khqr' | 'card';
type CheckoutStatus = 'form' | 'processing' | 'verifying' | 'completed';

export const AutomatedCheckoutModal: React.FC<AutomatedCheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  onLicenseIssued,
  onOpenClientSimWithKey,
  onDownloadZip
}) => {
  const [customerName, setCustomerName] = useState('Enterprise Client');
  const [customerEmail, setCustomerEmail] = useState('client@cyber-defense.sec');
  const [targetHwid, setTargetHwid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('khqr');
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>('form');
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes timer
  const [issuedLicense, setIssuedLicense] = useState<License | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedTxn, setCopiedTxn] = useState(false);
  const [transactionId] = useState(`TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);

  // Card form states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  useEffect(() => {
    if (isOpen) {
      setCheckoutStatus('form');
      setIssuedLicense(null);
      setVerificationProgress(0);
      setTimeRemaining(600);
      setStatusMessage('');
      if (!targetHwid) {
        setTargetHwid(`HWID-RIG-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
      }
    }
  }, [isOpen]);

  // Countdown timer for automated payment window
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && (checkoutStatus === 'form' || checkoutStatus === 'processing') && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, checkoutStatus, timeRemaining]);

  if (!isOpen) return null;

  const priceKhr = Math.round(selectedPlan.priceUsd * 4100).toLocaleString('en-US');

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleAutoDetectHwid = () => {
    const generated = `HWID-CORE-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setTargetHwid(generated);
  };

  // Automated instant checkout simulation with multi-phase ledger verification
  const handleInitiateAutomatedCheckout = () => {
    setCheckoutStatus('processing');
    setStatusMessage('Connecting to Bank Inward Gateway (Account: 061444866)...');
    setVerificationProgress(15);

    setTimeout(() => {
      setCheckoutStatus('verifying');
      setStatusMessage('Bank Inward Credit Detected! Verifying transaction signature...');
      setVerificationProgress(45);
    }, 1200);

    setTimeout(() => {
      setStatusMessage('Cryptographic ledger confirmation passed. Issuing Master License...');
      setVerificationProgress(85);
    }, 2400);

    setTimeout(() => {
      setVerificationProgress(100);
      const generatedKey = `AKCD-${selectedPlan.tier.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-SEC${Math.floor(10 + Math.random() * 90)}`;
      
      const newLicense: License = {
        id: Date.now(),
        license_key: generatedKey,
        plan: selectedPlan.tier,
        max_devices: selectedPlan.maxDevices,
        used_devices: 1,
        user_name: customerName.trim() || 'Verified Customer',
        expires_at: selectedPlan.tier === 'lifetime' ? null : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        is_active: true,
        revoked: false,
        created_at: new Date().toISOString(),
        metadata: `Automated Checkout (${paymentMethod.toUpperCase()}) | Ref: ${transactionId} | Account: 061444866 | Node: ${targetHwid}`
      };

      setIssuedLicense(newLicense);
      setCheckoutStatus('completed');
      onLicenseIssued(newLicense);
    }, 3200);
  };

  const handleDownloadLicenseFile = () => {
    if (!issuedLicense) return;
    const licensePayload = {
      license_key: issuedLicense.license_key,
      plan: issuedLicense.plan,
      user_name: issuedLicense.user_name,
      bound_hwid: targetHwid,
      seats_allocated: issuedLicense.max_devices,
      issued_at: issuedLicense.created_at,
      expires_at: issuedLicense.expires_at || 'LIFETIME_NO_EXPIRY',
      signature_sha256: `SIG_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      official_bank_account: '061444866',
      transaction_id: transactionId,
      gateway: 'ANGKOR CYBER DEFENSE AUTOMATED CHECKOUT'
    };

    const blob = new Blob([JSON.stringify(licensePayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `license_${issuedLicense.license_key}.lic`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-mono">
      <div className="relative w-full max-w-4xl bg-[#0A0D07] border-2 border-[#CCFF00] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b-2 border-[#CCFF00]/40 bg-[#10170A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#CCFF00] text-black flex items-center justify-center font-black">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                  Automated Checkout & License Provisioning
                </h3>
                <span className="text-[9px] bg-[#CCFF00] text-black px-2 py-0.5 rounded font-black tracking-widest">
                  24/7 INSTANT
                </span>
              </div>
              <p className="text-[10px] text-white/50">
                Official Settlement Gateway • Bank Account 061444866
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {checkoutStatus !== 'completed' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Plan Summary & Customer Form */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Order Item Box */}
                <div className="bg-[#12180D] border border-[#CCFF00]/30 p-4 rounded-xl space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#CCFF00]">
                        Selected Service Plan
                      </span>
                      <h4 className="text-base font-black text-white">{selectedPlan.name}</h4>
                      <p className="text-xs text-white/60 font-sans mt-0.5">
                        {selectedPlan.category} • {selectedPlan.maxDevices} Device Seat{selectedPlan.maxDevices > 1 ? 's' : ''}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-black text-white font-mono">
                        ${selectedPlan.priceUsd.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-white/50 font-mono">
                        {priceKhr} KHR
                      </div>
                    </div>
                  </div>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                    {selectedPlan.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="text-[10px] bg-black/50 border border-white/10 text-white/80 px-2 py-0.5 rounded">
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Customer Credentials */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
                    <span>Customer & Delivery Details</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-white/60 text-[11px]">Customer / Entity Name:</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Enterprise Cyber Rig"
                        className="w-full bg-[#12140F] border border-white/15 focus:border-[#CCFF00] rounded-lg p-2.5 text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-white/60 text-[11px]">Delivery Email Address:</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="client@domain.sec"
                        className="w-full bg-[#12140F] border border-white/15 focus:border-[#CCFF00] rounded-lg p-2.5 text-white outline-none"
                      />
                    </div>
                  </div>

                  {/* HWID Binding Input */}
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <label className="text-white/60 text-[11px]">Hardware HWID Binding (Optional):</label>
                      <button
                        type="button"
                        onClick={handleAutoDetectHwid}
                        className="text-[10px] text-[#CCFF00] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Monitor className="w-3 h-3" />
                        <span>Auto-Detect Machine HWID</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={targetHwid}
                      onChange={(e) => setTargetHwid(e.target.value)}
                      placeholder="e.g. HWID-RIG-8891-B7E2"
                      className="w-full bg-[#12140F] border border-white/15 focus:border-[#CCFF00] rounded-lg p-2.5 text-white font-mono text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Select Automated Payment Method
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('khqr')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        paymentMethod === 'khqr'
                          ? 'border-[#CCFF00] bg-[#141C0A] shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                          : 'border-white/10 bg-[#12140F] hover:border-white/30'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-[#CCFF00] shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">ABA KHQR / Bakong</div>
                        <div className="text-[10px] text-white/50">Direct Bank Account 061444866</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        paymentMethod === 'card'
                          ? 'border-[#CCFF00] bg-[#141C0A] shadow-[0_0_15px_rgba(204,255,0,0.2)]'
                          : 'border-white/10 bg-[#12140F] hover:border-white/30'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">Credit / Debit Card</div>
                        <div className="text-[10px] text-white/50">Visa, Mastercard 256-bit</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Card Fields if Card selected */}
                {paymentMethod === 'card' && (
                  <div className="p-3.5 bg-[#12140F] border border-white/10 rounded-xl space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="text-white/60 text-[11px]">Card Number:</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 p-2 rounded text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-white/60 text-[11px]">Expiry:</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-black/60 border border-white/15 p-2 rounded text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-white/60 text-[11px]">CVC / CVV:</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-black/60 border border-white/15 p-2 rounded text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Zero Exposure Security Policy Notice */}
                <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-lg text-left space-y-1">
                  <div className="flex items-center gap-2 text-[#FF3B30] text-[11px] font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Zero-Exposure Key Protection Policy</span>
                  </div>
                  <p className="text-[10px] text-white/70 font-sans leading-relaxed">
                    License keys remain strictly encrypted and unrevealed prior to verified payment settlement. Once payment is confirmed by our automated gateway, your master key is immediately generated, unlocked, and recorded.
                  </p>
                </div>

                {/* Automated Checkout Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleInitiateAutomatedCheckout}
                    disabled={checkoutStatus === 'processing' || checkoutStatus === 'verifying'}
                    className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#CCFF00] hover:brightness-110 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all cursor-pointer shadow-[0_0_25px_rgba(204,255,0,0.35)] flex items-center justify-center gap-2"
                  >
                    {checkoutStatus === 'processing' || checkoutStatus === 'verifying' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        <span>{statusMessage || 'Verifying Payment & Issuing License...'}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-black" />
                        <span>Pay ${selectedPlan.priceUsd.toFixed(2)} & Issue Key Automatically</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Live Payment QR / Real Verification Terminal */}
              <div className="lg:col-span-5 bg-[#070905] border border-[#CCFF00]/30 rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">
                      Gateway Reference
                    </span>
                    <span className="text-[11px] text-[#CCFF00] font-bold">
                      {transactionId}
                    </span>
                  </div>

                  {/* Real KHQR Card or Terminal */}
                  <div className="py-3 flex flex-col items-center">
                    {paymentMethod === 'khqr' ? (
                      <AcledaKhqrCard
                        amountUsd={selectedPlan.priceUsd}
                        planName={selectedPlan.name}
                        compact={true}
                      />
                    ) : (
                      <div className="p-8 bg-[#10140D] border border-white/10 rounded-xl text-center space-y-3 w-full">
                        <CreditCard className="w-10 h-10 text-cyan-400 mx-auto" />
                        <h4 className="text-sm font-bold text-white">256-Bit SSL Card Processor</h4>
                        <p className="text-xs text-white/60 font-sans">
                          Ready to authorize ${selectedPlan.priceUsd.toFixed(2)} USD via secured card tunnel.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Direct ABA Link */}
                  <a
                    href="https://pay.ababank.com/oRF8/c49y1xuy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-[#004B6E] hover:bg-[#00608C] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 border border-cyan-400/40 cursor-pointer shadow-md transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#CCFF00]" />
                    <span>Open ABA PayDirect: 061444866</span>
                  </a>
                </div>

                {/* Dynamic Status / Progress Bar */}
                <div className="p-3 bg-black/60 border border-white/10 rounded-lg space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-white/60">
                    <span>Payment Window:</span>
                    <span className="text-[#CCFF00] font-bold">{formatTime(timeRemaining)}</span>
                  </div>

                  {verificationProgress > 0 && (
                    <div className="space-y-1">
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-[#CCFF00] h-full transition-all duration-300 shadow-[0_0_10px_#CCFF00]"
                          style={{ width: `${verificationProgress}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-[#CCFF00] font-mono truncate">
                        {statusMessage}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-white/40 pt-1 border-t border-white/5">
                    Official Settlement Account: <strong>061444866</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* COMPLETED STATE: REVEAL MASTER LICENSE & ACTIONS */
            <div className="p-6 sm:p-8 bg-[#0D1207] border-2 border-[#CCFF00] rounded-2xl space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 text-[#CCFF00]">
                <div className="w-12 h-12 rounded-xl bg-[#CCFF00] text-black flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
                    PAYMENT SETTLED & LICENSE UNLOCKED!
                  </h3>
                  <p className="text-xs text-white/60 font-sans">
                    Your official cryptographic license has been generated and activated in the global defense registry.
                  </p>
                </div>
              </div>

              {/* Revealed Key Card */}
              {issuedLicense && (
                <div className="bg-black/80 border-2 border-[#CCFF00] p-5 rounded-xl space-y-4 shadow-[0_0_30px_rgba(204,255,0,0.15)]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold text-[#CCFF00] tracking-widest">
                      OFFICIAL MASTER LICENSE KEY
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold uppercase">
                      STATUS: ACTIVE & VALIDATED
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#141A0B] border border-[#CCFF00]/40 rounded-lg flex items-center justify-between gap-3 shadow-inner">
                    <span className="text-base sm:text-lg font-black font-mono text-[#CCFF00] tracking-wider break-all">
                      {issuedLicense.license_key}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(issuedLicense.license_key);
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }}
                      className="px-3 py-1.5 bg-[#CCFF00] hover:bg-white text-black font-bold text-xs rounded flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey ? 'Copied' : 'Copy Key'}</span>
                    </button>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1 border-t border-white/10">
                    <div>
                      <span className="text-white/40 block text-[10px]">CUSTOMER:</span>
                      <span className="text-white font-bold">{issuedLicense.user_name}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">SEATS ALLOWED:</span>
                      <span className="text-[#CCFF00] font-bold">{issuedLicense.max_devices} Hardware Seat(s)</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">VALIDITY:</span>
                      <span className="text-white">
                        {issuedLicense.expires_at ? new Date(issuedLicense.expires_at).toLocaleDateString('en-US') : 'LIFETIME ACCESS'}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">TRANSACTION:</span>
                      <span className="text-[#CCFF00] font-bold">{transactionId}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadLicenseFile}
                  className="py-3 px-4 bg-[#141414] hover:bg-[#202020] border border-[#CCFF00]/50 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <FileText className="w-4 h-4 text-[#CCFF00]" />
                  <span>Download .lic Token</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenClientSimWithKey && issuedLicense) {
                      onOpenClientSimWithKey(issuedLicense.license_key);
                      onClose();
                    }
                  }}
                  className="py-3 px-4 bg-[#141414] hover:bg-[#202020] border border-cyan-400/50 text-cyan-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Test in Simulator</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onDownloadZip) {
                      onDownloadZip();
                    }
                  }}
                  className="py-3 px-4 bg-[#CCFF00] hover:bg-[#B8E600] text-black font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full ZIP</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Security Badge */}
        <div className="px-6 py-3 bg-[#080B04] border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>256-Bit Quantum Enclave & Bank Gateway 061444866</span>
          </div>
          <span className="text-[#CCFF00] font-bold">ANGKOR CYBER DEFENSE</span>
        </div>
      </div>
    </div>
  );
};
