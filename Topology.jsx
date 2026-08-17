// src/pages/Topology.jsx
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import NetworkTopologyWidget from "../components/dashboard/NetworkTopologyWidget";
import DeviceDetailModal from "../components/dashboard/DeviceDetailModal";
import ScanTriggerModal from "../components/dashboard/ScanTriggerModal";
import { initialData } from "../services/api";
import {
  GitFork,
  Radio,
  Filter,
  Download,
  Search,
  Server,
  Shield,
  Layers,
  Zap,
  Activity
} from "lucide-react";

const Topology = () => {
  const [selectedSubnet, setSelectedSubnet] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showScanModal, setShowScanModal] = useState(false);

  const subnets = [
    { id: "all", name: "All Subnets (192.168.1.0/24)", hosts: 28, health: "96%" },
    { id: "vlan10", name: "VLAN 10 — Office & VoIP", hosts: 12, health: "98%" },
    { id: "vlan20", name: "VLAN 20 — Engineering & WiFi", hosts: 10, health: "94%" },
    { id: "mgmt", name: "VLAN 99 — Management & Core", hosts: 6, health: "100%" }
  ];

  return (
    <Layout onTriggerScan={() => setShowScanModal(true)}>
      <div className="space-y-5">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <GitFork className="w-6 h-6 text-cyan-400" />
              Interactive Network Topology Canvas
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live multi-layer L2/L3 topology visualization with real-time packet telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowScanModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow-[0_0_15px_rgba(0,191,255,0.3)]"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Scan Subnet
            </button>

            <button
              onClick={() => {
                const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(initialData.topologyNodes, null, 2)
                )}`;
                const downloadAnchor = document.createElement("a");
                downloadAnchor.setAttribute("href", jsonString);
                downloadAnchor.setAttribute("download", "topoguard-topology.json");
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
              className="px-3.5 py-2 rounded-xl bg-[#141B2D] hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON
            </button>
          </div>
        </div>

        {/* Subnet Quick Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {subnets.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelectedSubnet(sub.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition ${
                selectedSubnet === sub.id
                  ? "bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_15px_rgba(0,191,255,0.15)]"
                  : "bg-[#141B2D]/80 border-slate-800 text-slate-400 hover:bg-[#162035] hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-slate-200">{sub.name}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  {sub.health}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {sub.hosts} Connected Hosts
              </span>
            </div>
          ))}
        </div>

        {/* Main Canvas Widget */}
        <div className="h-[480px]">
          <NetworkTopologyWidget
            onSelectDevice={(device) => setSelectedDevice(device)}
            onTriggerScan={() => setShowScanModal(true)}
          />
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="cyber-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Total Packet Rate</span>
                <span className="text-base font-bold text-white font-mono">1,480 pkts/s</span>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-semibold font-mono">Normal</span>
          </div>

          <div className="cyber-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Average Latency</span>
                <span className="text-base font-bold text-white font-mono">1.84 ms</span>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-semibold font-mono">&lt; 5ms SLA</span>
          </div>

          <div className="cyber-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Firewall Filter Rules</span>
                <span className="text-base font-bold text-white font-mono">142 Active</span>
              </div>
            </div>
            <span className="text-xs text-cyan-400 font-semibold font-mono">Enforced</span>
          </div>
        </div>
      </div>

      {/* Device Inspection Modal */}
      {selectedDevice && (
        <DeviceDetailModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
        />
      )}

      {/* Scan Modal */}
      {showScanModal && (
        <ScanTriggerModal
          onClose={() => setShowScanModal(false)}
          onScanComplete={() => setShowScanModal(false)}
        />
      )}
    </Layout>
  );
};

export default Topology;