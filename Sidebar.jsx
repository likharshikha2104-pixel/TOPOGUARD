// src/components/layout/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GitFork,
  LayoutGrid,
  Bell,
  MapPin,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity,
  Radio,
  PlusSquare,
  ShieldAlert
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: PlusSquare,
  },
  {
    name: "Topology",
    path: "/topology",
    icon: GitFork,
  },
  {
    name: "Devices",
    path: "/devices",
    icon: LayoutGrid,
  },
  {
    name: "Alerts",
    path: "/alerts",
    icon: Bell,
    badge: 5,
  },
  {
    name: "Vulnerabilities",
    path: "/vulnerabilities",
    icon: ShieldAlert,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`relative flex h-screen flex-col border-r border-[#1B253D] bg-[#0E1528] transition-all duration-300 z-30 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header matching mockup */}
      <div className="flex h-20 items-center justify-between border-b border-[#1B253D] px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(0,191,255,0.25)]">
            <Shield className="h-5 w-5 fill-cyan-400/20" />
          </div>

          {!collapsed && (
            <div className="truncate">
              <h1 className="text-base font-extrabold tracking-wider text-white">
                TOPO<span className="text-cyan-400">GUARD</span>
              </h1>
              <p className="text-[9px] font-semibold tracking-widest text-slate-400">
                CYBER COMMAND CENTER
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu List */}
      <nav className="flex-1 space-y-1.5 px-3 py-5 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
                    : "text-slate-400 hover:bg-[#16213D] hover:text-slate-100"
                }`
              }
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <span className="truncate tracking-wide">{item.name}</span>
                )}
              </div>

              {!collapsed && item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Network Status Widget */}
      {!collapsed && (
        <div className="mx-3 mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-bold text-emerald-400">
                Network Protected
              </span>
            </div>
            <span className="text-[10px] text-emerald-300/70 font-mono">96%</span>
          </div>

          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Radio className="h-3 w-3 text-cyan-400 animate-pulse" />
            <span>IDS / IPS Active Monitoring</span>
          </div>
        </div>
      )}

      {/* Version Footer */}
      {!collapsed && (
        <div className="border-t border-[#1B253D] px-5 py-3.5 flex items-center justify-between text-[10px] text-slate-500">
          <span>TopoGuard v1.0 • Hackathon</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400/40" />
        </div>
      )}

      {/* Sidebar Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-24 flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-[#121A30] text-slate-400 hover:border-cyan-400 hover:text-cyan-400 transition shadow-lg"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;