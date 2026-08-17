// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { getBackendUrl, setBackendUrl } from "../services/api";
import {
  Settings as SettingsIcon,
  Server,
  Radio,
  Bell,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FolderSync,
  Code
} from "lucide-react";

const Settings = () => {
  const [backendUrl, setBackendUrlState] = useState(getBackendUrl());
  const [testStatus, setTestStatus] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [subnet, setSubnet] = useState("192.168.1.0/24");
  const [scanInterval, setScanInterval] = useState("15");
  const [scanMode, setScanMode] = useState("stealth");

  const handleSave = (e) => {
    e.preventDefault();
    setBackendUrl(backendUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestStatus(null);
    try {
      const res = await fetch(`${backendUrl}/health`, {
        signal: AbortSignal.timeout(2000)
      });
      if (res.ok) {
        setTestStatus({
          success: true,
          message: "✓ Successfully connected to live TopoGuard backend server!"
        });
      } else {
        setTestStatus({
          success: false,
          message: `Backend returned status ${res.status}. Falling back to rich local simulation.`
        });
      }
    } catch {
      setTestStatus({
        success: false,
        message: "No live backend server detected at this URL. Running with built-in high-fidelity simulated engine."
      });
    }
    setIsTesting(false);
  };

  return (
    <Layout>
      <div className="space-y-5 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <SettingsIcon className="w-6 h-6 text-cyan-400" />
            System & Scanner Configuration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure network discovery CIDR ranges, scan intervals, and connect external Python / Scapy / Nmap backends.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            Configuration saved successfully.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          {/* Section 1: Backend Connection & Folder Integration */}
          <div className="cyber-card p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FolderSync className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Backend API & External Folder Connector
                </h3>
                <p className="text-[11px] text-slate-400">
                  Connect TopoGuard UI to your Python / Scapy / Nmap scripts running on localhost or another directory.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Backend API Endpoint URL
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={backendUrl}
                  onChange={(e) => setBackendUrlState(e.target.value)}
                  placeholder="http://localhost:8000/api"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#090D1A] border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? "animate-spin" : ""}`} />
                  Test Connection
                </button>
              </div>

              {testStatus && (
                <div
                  className={`mt-2 p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                    testStatus.success
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {testStatus.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{testStatus.message}</span>
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-[#090D1A]/90 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                Python Backend Quick Start:
              </div>
              <p>
                An example Python backend script is provided in <code className="text-cyan-400 font-mono">backend_example/app.py</code>. Run <code className="text-cyan-400 font-mono">python app.py</code> in a separate terminal to stream live network scans into this UI!
              </p>
            </div>
          </div>

          {/* Section 2: Subnet Scanner Parameters */}
          <div className="cyber-card p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Network Scanner & Subnet Configuration
                </h3>
                <p className="text-[11px] text-slate-400">
                  Define scan frequency and IP ranges for continuous network discovery.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Default Target Subnet CIDR
                </label>
                <input
                  type="text"
                  value={subnet}
                  onChange={(e) => setSubnet(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D1A] border border-slate-700 text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">
                  Scan Interval (Minutes)
                </label>
                <select
                  value={scanInterval}
                  onChange={(e) => setScanInterval(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D1A] border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="5">Every 5 Minutes (High Traffic)</option>
                  <option value="15">Every 15 Minutes (Recommended)</option>
                  <option value="60">Every 1 Hour (Lightweight)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 text-xs">
                Scan Technique Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setScanMode("stealth")}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                    scanMode === "stealth"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                      : "bg-[#090D1A] border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Stealth SYN (-sS)
                </button>
                <button
                  type="button"
                  onClick={() => setScanMode("arp")}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                    scanMode === "arp"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                      : "bg-[#090D1A] border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  ARP Ping (-PR)
                </button>
                <button
                  type="button"
                  onClick={() => setScanMode("aggressive")}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition ${
                    scanMode === "aggressive"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                      : "bg-[#090D1A] border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Deep Threat (-A)
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow-[0_0_20px_rgba(0,191,255,0.4)]"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Settings;
