// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#0B1020] text-white p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-[0_0_25px_rgba(239,68,68,0.3)]">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-2">404</h1>
      <h2 className="text-lg font-bold text-slate-300 mb-2">
        Subnet Path Not Found
      </h2>
      <p className="text-xs text-slate-400 max-w-sm mb-6">
        The requested network resource or command center route does not exist or has been quarantined.
      </p>
      <Link
        to="/"
        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow-[0_0_15px_rgba(0,191,255,0.4)]"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Command Center
      </Link>
    </div>
  );
};

export default NotFound;