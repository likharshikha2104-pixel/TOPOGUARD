// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import {
  Search,
  Bell,
  Wifi,
  ShieldCheck,
  Radio,
  Play,
  Check,
  AlertCircle
} from "lucide-react";
import ScanTriggerModal from "../dashboard/ScanTriggerModal";

const Navbar = ({ onTriggerScan, alertsCount = 5 }) => {
  const [showScanModal, setShowScanModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="flex h-20 items-center justify-between border-b border-[#1B253D] bg-[#0B1020]/90 backdrop-blur-md px-6 z-20">
        {/* Left Section: Breadcrumb & Title */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Network Security
          </p>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Security Overview
          </h2>
        </div>

        {/* Right Section: Status, Search, Scan Button & Profile */}
        <div className="flex items-center gap-3.5">
          {/* Network Status Badge */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-400">
              Network Online
            </span>
          </div>

          {/* Quick Scan Action Button */}
          <button
            onClick={() => setShowScanModal(true)}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold transition shadow-[0_0_15px_rgba(0,191,255,0.15)]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Trigger Scan</span>
          </button>

          {/* Search Bar Input */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search IP, Hostname, CVE..."
              className="w-56 rounded-xl bg-[#121A30] border border-slate-700/80 py-1.5 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>

          {/* Notifications Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-xl p-2.5 text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition border border-transparent hover:border-slate-700"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {alertsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                  {alertsCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#121A30] border border-slate-700 p-4 shadow-2xl z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <span className="text-xs font-bold text-white">Security Alerts</span>
                  <span className="text-[10px] text-cyan-400 font-mono">5 Active</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
                    🔴 Unknown Device on VLAN 20
                  </div>
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                    🟠 Port Scan from 192.168.1.50
                  </div>
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                    🟠 Outdated Switch Firmware
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 border-l border-slate-800 pl-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-white leading-tight">
                Administrator
              </p>
              <p className="text-[10px] text-emerald-400 font-medium">
                SOC Analyst
              </p>
            </div>
          </div>
        </div>
      </header>

      {showScanModal && (
        <ScanTriggerModal
          onClose={() => setShowScanModal(false)}
          onScanComplete={() => {
            setShowScanModal(false);
            if (onTriggerScan) onTriggerScan();
          }}
        />
      )}
    </>
  );
};

export default Navbar;