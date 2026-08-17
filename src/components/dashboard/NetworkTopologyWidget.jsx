// src/components/dashboard/NetworkTopologyWidget.jsx
import React, { useState } from "react";
import {
  Cloud,
  Shield,
  Server,
  Network,
  Smartphone,
  Monitor,
  PhoneCall,
  Laptop,
  Wifi,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Radio,
  Maximize2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

const NetworkTopologyWidget = ({ onSelectDevice, onTriggerScan }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeHoverNode, setActiveHoverNode] = useState(null);
  const [flowAnimation, setFlowAnimation] = useState(true);

  // Nodes definition matching the image mockup
  const topologyData = {
    cloud: {
      id: "node-cloud",
      name: "Internet WAN",
      ip: "203.0.113.1",
      type: "Cloud Gateway",
      status: "online",
      icon: Cloud,
      color: "#00BFFF",
      x: 300,
      y: 42
    },
    firewall: {
      id: "node-firewall",
      name: "Edge Firewall (PA-440)",
      ip: "192.168.1.1",
      type: "Firewall",
      status: "online",
      icon: Shield,
      color: "#EF4444",
      x: 300,
      y: 105
    },
    core: {
      id: "node-core",
      name: "Core Gateway Hub",
      ip: "192.168.1.254",
      type: "L3 Switch",
      status: "online",
      icon: Server,
      color: "#00E5FF",
      x: 300,
      y: 168
    },
    // Left Branch (VLAN 10)
    switchLeft: {
      id: "node-switch-left",
      name: "Switch 01 (VLAN 10)",
      ip: "192.168.1.2",
      type: "Managed Switch",
      status: "online",
      icon: Network,
      color: "#10B981",
      x: 165,
      y: 238
    },
    mobile: {
      id: "node-mobile",
      name: "Mobile Device",
      ip: "192.168.1.10",
      mac: "BC:D1:D3:44:89:12",
      type: "Mobile Handset",
      os: "Android 14",
      status: "online",
      icon: Smartphone,
      color: "#10B981",
      x: 95,
      y: 318
    },
    workstation1: {
      id: "node-workstation-1",
      name: "Admin Workstation",
      ip: "192.168.1.11",
      mac: "00:1A:2B:3C:4D:5E",
      type: "Workstation",
      os: "Ubuntu 24.04",
      status: "online",
      icon: Monitor,
      color: "#10B981",
      x: 165,
      y: 318
    },
    voip: {
      id: "node-voip",
      name: "VoIP Phone",
      ip: "192.168.1.12",
      mac: "A4:C3:61:90:11:45",
      type: "VoIP Device",
      os: "Cisco IP OS",
      status: "online",
      icon: PhoneCall,
      color: "#10B981",
      x: 235,
      y: 318
    },
    // Right Branch (VLAN 20)
    switchRight: {
      id: "node-switch-right",
      name: "Switch 02 (VLAN 20)",
      ip: "192.168.1.3",
      type: "Managed Switch",
      status: "online",
      icon: Network,
      color: "#3B82F6",
      x: 435,
      y: 238
    },
    workstation2: {
      id: "node-workstation-2",
      name: "Engineering PC",
      ip: "192.168.1.20",
      mac: "48:2A:E3:78:90:21",
      type: "Workstation",
      os: "Windows 11 Pro",
      status: "online",
      icon: Monitor,
      color: "#3B82F6",
      x: 365,
      y: 318
    },
    laptop: {
      id: "node-laptop",
      name: "SecOps Laptop",
      ip: "192.168.1.21",
      mac: "E8:80:2E:67:12:00",
      type: "Laptop",
      os: "macOS Sonoma",
      status: "online",
      icon: Laptop,
      color: "#3B82F6",
      x: 435,
      y: 318
    },
    wifiAp: {
      id: "node-wifi-ap",
      name: "WiFi AP Pro",
      ip: "192.168.1.22",
      mac: "70:3A:CB:44:19:92",
      type: "Access Point",
      os: "UniFi OS",
      status: "online",
      icon: Wifi,
      color: "#3B82F6",
      x: 505,
      y: 318
    }
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.min(Math.max(0.8, prev + delta), 1.35));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="cyber-card p-5 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Header with Title and Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2 z-20">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-semibold text-white tracking-wide">
            Network Topology
          </h3>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Sync
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFlowAnimation(!flowAnimation)}
            title="Toggle Packet Flow Animation"
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition ${
              flowAnimation
                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                : "bg-slate-800 border-slate-700 text-slate-400"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Flow</span>
          </button>
          <button
            onClick={() => handleZoom(0.1)}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 transition"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Topology Visualizer Canvas */}
      <div className="relative w-full h-[280px] sm:h-[310px] md:h-[340px] flex items-center justify-center overflow-hidden rounded-xl bg-[#090D1A]/90 border border-slate-800/80 shadow-inner">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#00BFFF 1px, transparent 1px), radial-gradient(#00BFFF 1px, #090D1A 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px"
          }}
        />

        <svg
          viewBox="0 0 600 370"
          className="w-full h-full max-h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Connection Lines with Animated Flow Dashes */}
          <g className="connections">
            {/* Cloud to Firewall */}
            <line
              x1="300"
              y1="60"
              x2="300"
              y2="88"
              stroke="#00BFFF"
              strokeWidth="2.5"
              className={flowAnimation ? "animate-flow" : ""}
            />

            {/* Firewall to Core Router */}
            <line
              x1="300"
              y1="122"
              x2="300"
              y2="152"
              stroke="#EF4444"
              strokeWidth="2.5"
              className={flowAnimation ? "animate-flow" : ""}
            />

            {/* Core Router to Switch Left (VLAN 10) */}
            <path
              d="M 300 184 L 300 205 L 165 205 L 165 224"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.2"
              className={flowAnimation ? "animate-flow" : ""}
            />

            {/* Core Router to Switch Right (VLAN 20) */}
            <path
              d="M 300 184 L 300 205 L 435 205 L 435 224"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.2"
              className={flowAnimation ? "animate-flow" : ""}
            />

            {/* Switch Left to Mobile */}
            <path
              d="M 165 252 L 165 278 L 95 278 L 95 304"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.8"
              strokeOpacity="0.8"
              className={flowAnimation ? "animate-flow" : ""}
            />

            {/* Switch Left to Admin Workstation */}
            <line
              x1="165"
              y1="252"
              x2="165"
              y2="304"
              stroke="#10B981"
              strokeWidth="1.8"
              strokeOpacity="0.8"
              className={flowAnimation ? "animate-flow" : ""}
            />

            {/* Switch Left to VoIP Phone */}
            <path
              d="M 165 252 L 165 278 L 235 278 L 235 304"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.8"
              strokeOpacity="0.8"
              className={flowAnimation ? "animate-flow" : ""}
            />

            {/* Switch Right to Engineering PC */}
            <path
              d="M 435 252 L 435 278 L 365 278 L 365 304"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="1.8"
              strokeOpacity="0.8"
              className={flowAnimation ? "animate-flow" : ""}
            />

            {/* Switch Right to SecOps Laptop */}
            <line
              x1="435"
              y1="252"
              x2="435"
              y2="304"
              stroke="#3B82F6"
              strokeWidth="1.8"
              strokeOpacity="0.8"
              className={flowAnimation ? "animate-flow" : ""}
            />

            {/* Switch Right to WiFi AP */}
            <path
              d="M 435 252 L 435 278 L 505 278 L 505 304"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="1.8"
              strokeOpacity="0.8"
              className={flowAnimation ? "animate-flow" : ""}
            />
          </g>

          {/* Render Interactive Nodes */}
          {Object.entries(topologyData).map(([key, node]) => {
            const IconComponent = node.icon;
            const isHovered = activeHoverNode === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer group"
                onClick={() => onSelectDevice && onSelectDevice(node)}
                onMouseEnter={() => setActiveHoverNode(node.id)}
                onMouseLeave={() => setActiveHoverNode(null)}
              >
                {/* Outer halo / glow on hover */}
                {isHovered && (
                  <circle
                    cx="0"
                    cy="0"
                    r="24"
                    fill={node.color}
                    fillOpacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* Node Shape */}
                {node.id === "node-cloud" ? (
                  // Cloud shaped node
                  <g>
                    <ellipse
                      cx="0"
                      cy="0"
                      rx="22"
                      ry="15"
                      fill="#1E293B"
                      stroke="#00BFFF"
                      strokeWidth="2"
                    />
                    <circle cx="-10" cy="-4" r="9" fill="#1E293B" />
                    <circle cx="8" cy="-6" r="11" fill="#1E293B" />
                    <path
                      d="M -16 6 C -18 -6, -2 -14, 8 -6 C 18 -12, 24 2, 16 6 Z"
                      fill="#00BFFF"
                      fillOpacity="0.25"
                    />
                  </g>
                ) : node.id === "node-firewall" ? (
                  // Firewall brick node
                  <rect
                    x="-18"
                    y="-14"
                    width="36"
                    height="28"
                    rx="6"
                    fill="#1A1C29"
                    stroke="#EF4444"
                    strokeWidth="2"
                    className="filter drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                  />
                ) : (
                  // General Device Box
                  <rect
                    x="-17"
                    y="-13"
                    width="34"
                    height="26"
                    rx="6"
                    fill="#121829"
                    stroke={node.color}
                    strokeWidth="1.8"
                    className="transition-all duration-200 group-hover:stroke-white"
                  />
                )}

                {/* Center Icon embedded via foreignObject or SVG representation */}
                <foreignObject x="-10" y="-10" width="20" height="20">
                  <div className="w-full h-full flex items-center justify-center text-slate-200">
                    <IconComponent
                      size={14}
                      color={node.color}
                      style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.2))" }}
                    />
                  </div>
                </foreignObject>

                {/* Status Dot */}
                <circle
                  cx="12"
                  cy="-10"
                  r="3.5"
                  fill="#10B981"
                  stroke="#0B1020"
                  strokeWidth="1"
                />

                {/* Label text below node */}
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="8.5"
                  fontWeight="600"
                  className="font-mono select-none"
                >
                  {node.ip.split(".").slice(-2).join(".")}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover info tooltip card at bottom */}
        {activeHoverNode && (
          <div className="absolute bottom-2 left-3 right-3 bg-[#111827]/95 border border-cyan-500/40 rounded-lg p-2 flex items-center justify-between text-xs backdrop-blur-md animate-fadeIn z-30 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white">
                {topologyData[
                  Object.keys(topologyData).find(
                    (k) => topologyData[k].id === activeHoverNode
                  )
                ]?.name}
              </span>
              <span className="text-cyan-400 font-mono">
                {topologyData[
                  Object.keys(topologyData).find(
                    (k) => topologyData[k].id === activeHoverNode
                  )
                ]?.ip}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Click node to inspect device details
            </span>
          </div>
        )}
      </div>

      {/* Subnet Legend Footer */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>VLAN 10 (Office Subnet)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>VLAN 20 (Engineering Subnet)</span>
          </div>
        </div>

        <button
          onClick={onTriggerScan}
          className="text-cyan-400 hover:text-cyan-300 font-medium underline-offset-2 hover:underline flex items-center gap-1 transition"
        >
          <span>Run Nmap Scan</span> →
        </button>
      </div>
    </div>
  );
};

export default NetworkTopologyWidget;
