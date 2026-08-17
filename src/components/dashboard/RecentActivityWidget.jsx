// src/components/dashboard/RecentActivityWidget.jsx
import React from "react";
import { Activity, Radio, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const RecentActivityWidget = ({ activities = [] }) => {
  return (
    <div className="cyber-card p-5 flex flex-col justify-between h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-white tracking-wide">
            Recent Activity
          </h3>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
        </div>

        <Link
          to="/devices"
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 transition"
        >
          View Logs <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Activity List matching mockup */}
      <div className="space-y-3 flex-1 overflow-y-auto pr-1 max-h-[170px]">
        {activities.map((act) => {
          const isSuccess = act.type === "success";
          const isDanger = act.type === "danger";
          const isWarning = act.type === "warning";

          return (
            <div
              key={act.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F1626]/70 hover:bg-[#162035] border border-slate-800/80 transition"
            >
              {/* Left Indicator & Message */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Colored status dot matching the mockup */}
                <div className="relative flex items-center justify-center shrink-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isSuccess
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                        : isDanger
                        ? "bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                        : "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                    }`}
                  />
                </div>

                <p className="text-xs font-medium text-slate-200 truncate">
                  {act.message}
                </p>
              </div>

              {/* Right Timestamp */}
              <span className="text-xs text-slate-400 font-mono shrink-0 ml-2">
                {act.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Status */}
      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span>Packet capture engine active</span>
        <span className="text-emerald-400">1,248 pkts/sec</span>
      </div>
    </div>
  );
};

export default RecentActivityWidget;
