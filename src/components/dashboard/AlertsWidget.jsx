// src/components/dashboard/AlertsWidget.jsx
import React, { useState } from "react";
import { AlertCircle, ShieldAlert, ChevronRight, CheckCircle2, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const AlertsWidget = ({ alerts = [], onSelectAlert }) => {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleAlertClick = (alert) => {
    if (onSelectAlert) {
      onSelectAlert(alert);
    } else {
      setSelectedAlert(alert);
    }
  };

  return (
    <div className="cyber-card p-5 flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-white tracking-wide">
            Alerts
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold">
            {alerts.length} Active
          </span>
        </div>

        <Link
          to="/alerts"
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 transition"
        >
          View All <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Alerts List matching mockup */}
      <div className="space-y-2.5 flex-1 overflow-y-auto pr-1 max-h-[340px]">
        {alerts.map((alert) => {
          const isCritical = alert.severity === "critical" || alert.severity === "high";

          return (
            <div
              key={alert.id}
              onClick={() => handleAlertClick(alert)}
              className="group flex items-center justify-between p-3 rounded-xl bg-[#0F1626]/80 hover:bg-[#162035] border border-slate-800/80 hover:border-slate-700 transition cursor-pointer"
            >
              {/* Left Indicator and Title */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Status Dot matching the mockup red / amber colored dots */}
                <div className="relative flex items-center justify-center shrink-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isCritical ? "bg-rose-500" : "bg-amber-400"
                    }`}
                  />
                  {isCritical && (
                    <span className="absolute w-4 h-4 rounded-full bg-rose-500/30 animate-ping" />
                  )}
                </div>

                <div className="truncate">
                  <h4 className="text-xs font-medium text-slate-200 group-hover:text-white transition truncate">
                    {alert.title}
                  </h4>
                  {alert.target && (
                    <p className="text-[11px] text-slate-400 truncate font-mono">
                      {alert.target}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Timestamp */}
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span className="text-xs text-slate-400 font-mono">
                  {alert.time}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Quick Insight */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>2 Critical Threats</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>3 Warnings</span>
        </div>
      </div>
    </div>
  );
};

export default AlertsWidget;
