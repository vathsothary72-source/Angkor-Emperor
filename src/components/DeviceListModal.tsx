import React from 'react';
import { Laptop, X, Shield, Globe, Cpu, Trash2 } from 'lucide-react';
import { Device, License } from '../types';

interface DeviceListModalProps {
  license: License | null;
  devices: Device[];
  isOpen: boolean;
  onClose: () => void;
  onUnlinkDevice: (deviceId: string) => void;
}

export const DeviceListModal: React.FC<DeviceListModalProps> = ({
  license,
  devices,
  isOpen,
  onClose,
  onUnlinkDevice,
}) => {
  if (!isOpen || !license) return null;

  const licenseDevices = devices.filter((d) => d.license_key === license.license_key);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0C0C0C] border border-white/20 p-6 sm:p-8 max-w-2xl w-full shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/40 hover:text-white p-1.5 bg-white/5 border border-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 bg-[#141414] border border-white/10 flex items-center justify-center text-white">
              <Laptop className="w-5 h-5 text-[#E0FF00]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-tight">
                Active Hardware Seats
              </h3>
              <p className="text-xs text-white/50 font-mono">
                {license.license_key} ({licenseDevices.length} / {license.max_devices} SEATS OCCUPIED)
              </p>
            </div>
          </div>
        </div>

        {/* Device List */}
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {licenseDevices.length === 0 ? (
            <div className="py-16 text-center text-white/40 text-xs font-mono">
              <Laptop className="w-8 h-8 text-white/20 mx-auto mb-2" />
              NO ACTIVE HARDWARE SEATS BOUND TO THIS KEY
            </div>
          ) : (
            licenseDevices.map((device) => (
              <div
                key={device.id}
                className="bg-[#141414] border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/30 transition-colors"
              >
                <div className="space-y-1.5 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {device.device_name}
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-[#E0FF00]/10 text-[#E0FF00] px-2 py-0.5 border border-[#E0FF00]/20">
                      ONLINE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-[#E0FF00]" />
                      <span className="truncate max-w-[200px]" title={device.hardware_fingerprint}>
                        HWID: {device.hardware_fingerprint.substring(0, 16)}...
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-white/40" />
                      <span>IP: {device.ip_address}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-white/40 truncate max-w-md">
                    AGENT: {device.user_agent} · SEEN: {new Date(device.last_seen).toLocaleString('km-KH')}
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <button
                    onClick={() => onUnlinkDevice(device.device_id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/30 transition-all cursor-pointer"
                    title="Unlink device seat"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Unlink Seat</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 flex items-center justify-between border-t border-white/10 text-xs font-mono text-white/50">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#E0FF00]" />
            <span>5D Node Binding Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 text-[10px] font-mono font-black uppercase tracking-[0.25em] bg-white hover:bg-[#E0FF00] text-black transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
