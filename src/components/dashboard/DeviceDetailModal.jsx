// src/components/dashboard/DeviceDetailModal.jsx
import React, { useState } from "react";
import {
  X,
  ShieldAlert,
  Server,
  Activity,
  Wifi,
  Lock,
  Terminal,
  Radio,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

const DeviceDetailModal = ({ device, onClose, onIsolate }) => {
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState(null);
  const [isIsolated, setIsIsolated] = useState(false);

  if (!device) return null;

  const handlePing = () => {
    setIsPinging(true);
    setPingResult(null);
    setTimeout(() => {
      setIsPinging(false);
      setPingResult({
        latency: `${Math.floor(Math.random() * 4) + 1}ms`,
        packetLoss: "0%",
        ttl: 64,
        status: "Success (Host Active)"
      });
    }, 800);
  };

  const handleIsolateToggle = () => {
    setIsIsolated(!isIsolated);
    if (onIsolate) onIsolate(device, !isIsolated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg cyber-card border border-cyan-500/30 p-6 shadow-2xl overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                {device.name || device.label}
              </h3>
              <p className="text-xs text-cyan-400 font-mono">
                {device.ip || "192.168.1.x"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Specs */}
        <div className="my-5 space-y-3.5">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0B1020]/90 border border-slate-800/80">
              <span className="text-slate-400 block mb-1">Status</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isIsolated ? "Isolated / Quarantined" : (device.status || "Online")}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B1020]/90 border border-slate-800/80">
              <span className="text-slate-400 block mb-1">Device Role / Type</span>
              <span className="font-semibold text-slate-200">
                {device.role || device.type || "Endpoint"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B1020]/90 border border-slate-800/80">
              <span className="text-slate-400 block mb-1">MAC Address</span>
              <span className="font-mono text-slate-300 font-medium">
                {device.mac || "00:1A:2B:3C:4D:5E"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0B1020]/90 border border-slate-800/80">
              <span className="text-slate-400 block mb-1">Operating System</span>
              <span className="text-slate-200 font-medium">
                {device.os || device.vendor || "Linux / Network OS"}
              </span>
            </div>
          </div>

          {/* Open Ports & Services */}
          <div className="p-3 rounded-xl bg-[#0B1020]/90 border border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-2 font-medium">
              Discovered Open Ports & Services
            </span>
            <div className="flex flex-wrap gap-1.5">
              {device.openPorts && Array.isArray(device.openPorts) ? (
                device.openPorts.map((port) => (
                  <span
                    key={port}
                    className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs"
                  >
                    Port {port}
                  </span>
                ))
              ) : (
                <>
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
                    Port 22 (SSH)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
                    Port 443 (HTTPS)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs">
                    Port 80 (HTTP)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Live Ping Tool Simulation */}
          <div className="p-3 rounded-xl bg-[#0B1020]/90 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">
                Diagnostic ICMP Ping
              </span>
              <button
                onClick={handlePing}
                disabled={isPinging}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <RefreshCw className={`w-3 h-3 ${isPinging ? "animate-spin" : ""}`} />
                {isPinging ? "Pinging..." : "Test Latency"}
              </button>
            </div>

            {pingResult && (
              <div className="p-2 rounded bg-black/60 border border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                <span>Latency: {pingResult.latency}</span>
                <span>Loss: {pingResult.packetLoss}</span>
                <span>TTL: {pingResult.ttl}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={handleIsolateToggle}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              isIsolated
                ? "bg-emerald-500/20 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/30"
                : "bg-rose-500/20 border border-rose-500/50 text-rose-400 hover:bg-rose-500/30"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            {isIsolated ? "Restore Host Access" : "Quarantine Host"}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailModal;
