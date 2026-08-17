// src/pages/Alerts.jsx
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { initialData } from "../services/api";
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Filter,
  Search,
  Lock,
  Eye,
  RefreshCw
} from "lucide-react";

const Alerts = () => {
  const [alerts, setAlerts] = useState(initialData.alerts);
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeAlertDetail, setActiveAlertDetail] = useState(null);

  const filteredAlerts = alerts.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterSeverity === "critical") return matchesSearch && (a.severity === "critical" || a.severity === "high");
    if (filterSeverity === "warning") return matchesSearch && a.severity === "warning";
    if (filterSeverity === "resolved") return matchesSearch && a.status === "Resolved";
    return matchesSearch;
  });

  const handleResolveAlert = (id) => {
    setAlerts(
      alerts.map((a) =>
        a.id === id ? { ...a, status: "Resolved", severity: "resolved" } : a
      )
    );
  };

  return (
    <Layout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Bell className="w-6 h-6 text-rose-500" />
              SOC Security Incident Center
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated intrusion alerts, suspicious traffic detections, and threat remediation logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
              {alerts.filter((a) => a.status !== "Resolved").length} Unresolved Incidents
            </span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="cyber-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterSeverity("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterSeverity === "all"
                  ? "bg-[#2563EB] text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              All Alerts ({alerts.length})
            </button>
            <button
              onClick={() => setFilterSeverity("critical")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterSeverity === "critical"
                  ? "bg-rose-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Critical (2)
            </button>
            <button
              onClick={() => setFilterSeverity("warning")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterSeverity === "warning"
                  ? "bg-amber-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Warnings (3)
            </button>
            <button
              onClick={() => setFilterSeverity("resolved")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterSeverity === "resolved"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Resolved ({alerts.filter((a) => a.status === "Resolved").length})
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search alert description, IP..."
              className="w-full rounded-xl bg-[#090D1A] border border-slate-700 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const isCritical = alert.severity === "critical" || alert.severity === "high";
            const isResolved = alert.status === "Resolved";

            return (
              <div
                key={alert.id}
                className={`cyber-card p-4 transition border ${
                  isResolved
                    ? "border-emerald-500/20 bg-emerald-500/5 opacity-80"
                    : isCritical
                    ? "border-rose-500/40 bg-[#161224]"
                    : "border-amber-500/30 bg-[#171622]"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Left info */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isResolved
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : isCritical
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      }`}
                    >
                      {isResolved ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : isCritical ? (
                        <ShieldAlert className="w-5 h-5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white tracking-wide">
                          {alert.title}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                            isResolved
                              ? "bg-emerald-500/20 text-emerald-400"
                              : isCritical
                              ? "bg-rose-500/20 text-rose-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {alert.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-1">
                        {alert.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-400">
                        <span>Target: <strong className="text-cyan-400 font-mono">{alert.target}</strong></span>
                        <span>Category: <strong>{alert.type}</strong></span>
                        <span>Detected at: <strong className="font-mono text-slate-300">{alert.time}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 md:self-center">
                    {!isResolved && (
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Resolve Incident
                      </button>
                    )}
                    <button
                      onClick={() => setActiveAlertDetail(alert)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-medium transition"
                    >
                      Remediation Steps
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert Remediation Drawer */}
      {activeAlertDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg cyber-card border border-cyan-500/40 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">
              Recommended Security Remediation
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-mono">
              Incident Target: {activeAlertDetail.target}
            </p>

            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs leading-relaxed mb-4">
              {activeAlertDetail.remediation || "Isolate affected host and apply security patch."}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveAlertDetail(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Alerts;