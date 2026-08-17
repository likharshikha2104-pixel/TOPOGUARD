// src/components/dashboard/StatCard.jsx
import React from "react";
import { ArrowUp, ArrowDown, ShieldAlert, Activity, Cpu } from "lucide-react";

const StatCard = ({
  title,
  value,
  trend,
  trendType = "positive", // 'positive' (green), 'negative' (red/amber), 'neutral'
  badge,
  badgeColor = "amber", // 'amber', 'emerald', 'rose', 'cyan'
  subtitle,
  icon: Icon,
  sparkline,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cyber-card relative overflow-hidden p-5 flex flex-col justify-between cursor-pointer group hover:border-cyan-500/40`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-center justify-between z-10">
        <span className="text-xs font-medium text-slate-400 tracking-wide">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Main Stat Value Row */}
      <div className="mt-3 flex items-baseline gap-2 z-10">
        <span className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
          {value}
        </span>
        {subtitle && (
          <span className="text-sm font-normal text-slate-400">
            {subtitle}
          </span>
        )}
      </div>

      {/* Footer / Trend Badge */}
      <div className="mt-3 flex items-center justify-between z-10 text-xs">
        {trend && (
          <div
            className={`flex items-center gap-1 font-semibold ${
              trendType === "positive"
                ? "text-emerald-400"
                : trendType === "danger"
                ? "text-rose-400"
                : "text-amber-400"
            }`}
          >
            {trend.startsWith("+") || trend.includes("↑") ? (
              <span className="inline-flex items-center">
                <ArrowUp className="w-3.5 h-3.5 inline mr-0.5" />
                {trend.replace("↑", "").trim()}
              </span>
            ) : trend.startsWith("-") || trend.includes("↓") ? (
              <span className="inline-flex items-center">
                <ArrowDown className="w-3.5 h-3.5 inline mr-0.5" />
                {trend.replace("↓", "").trim()}
              </span>
            ) : (
              <span>{trend}</span>
            )}
          </div>
        )}

        {badge && (
          <div
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              badgeColor === "amber"
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                : badgeColor === "emerald"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : badgeColor === "rose"
                ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
            }`}
          >
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
