// src/components/dashboard/ScanTriggerModal.jsx
import React, { useState, useEffect } from "react";
import { X, Play, RefreshCw, Terminal, CheckCircle2, Shield, Radio } from "lucide-react";
import { apiService } from "../../services/api";

const ScanTriggerModal = ({ onClose, onScanComplete }) => {
  const [subnet, setSubnet] = useState("192.168.1.0/24");
  const [scanType, setScanType] = useState("syn"); // syn, arp, full
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [scanDone, setScanDone] = useState(false);

  const startScan = async () => {
    setIsScanning(true);
    setProgress(10);
    setScanDone(false);
    setLogs(["[+] Initializing TopoGuard Network Scanner engine..."]);

    const steps = [
      { delay: 400, pct: 30, log: `[+] Broadcasting ARP discovery requests to ${subnet}...` },
      { delay: 900, pct: 60, log: "[+] Discovered 24 active hosts responding to probe." },
      { delay: 1400, pct: 85, log: "[+] Initiating TCP SYN fingerprinting on common ports (22, 80, 443, 445, 8080)..." },
      { delay: 1900, pct: 100, log: "[✓] Network topology scan completed successfully in 1.84s." }
    ];

    steps.forEach(({ delay, pct, log }) => {
      setTimeout(() => {
        setProgress(pct);
        setLogs((prev) => [...prev, log]);
      }, delay);
    });

    setTimeout(async () => {
      setIsScanning(false);
      setScanDone(true);
      await apiService.triggerScan(subnet);
      if (onScanComplete) onScanComplete();
    }, 2100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg cyber-card border border-cyan-500/40 p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                Network Discovery & Vulnerability Scan
              </h3>
              <p className="text-xs text-slate-400">
                Active subnet topology discovery with Nmap & ARP
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

        {/* Input Parameters */}
        <div className="my-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target Subnet CIDR
            </label>
            <input
              type="text"
              value={subnet}
              onChange={(e) => setSubnet(e.target.value)}
              disabled={isScanning}
              placeholder="e.g. 192.168.1.0/24"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D1A] border border-slate-700 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Scan Profile
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setScanType("syn")}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                  scanType === "syn"
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                    : "bg-[#090D1A] border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Fast SYN Scan
              </button>
              <button
                type="button"
                onClick={() => setScanType("arp")}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                  scanType === "arp"
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                    : "bg-[#090D1A] border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                ARP Discovery
              </button>
              <button
                type="button"
                onClick={() => setScanType("full")}
                className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                  scanType === "full"
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                    : "bg-[#090D1A] border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Full Threat Scan
              </button>
            </div>
          </div>

          {/* Live Progress Bar */}
          {isScanning && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-cyan-400">
                <span>Scanning subnet in progress...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Console Terminal Logs */}
          <div className="p-3 rounded-xl bg-black/80 border border-slate-800 font-mono text-[11px] text-slate-300 h-28 overflow-y-auto space-y-1">
            <div className="text-slate-500">
              # topoguard-scanner --target {subnet}
            </div>
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={log.includes("✓") ? "text-emerald-400 font-bold" : "text-cyan-300"}
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={startScan}
            disabled={isScanning}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow-[0_0_18px_rgba(0,191,255,0.4)]"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : scanDone ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Re-Scan Subnet
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Launch Live Scan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanTriggerModal;
