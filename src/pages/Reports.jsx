// src/pages/Reports.jsx
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Layers
} from "lucide-react";

const Reports = () => {
  const [reportType, setReportType] = useState("executive");

  const printReport = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-cyan-400" />
              Security Audit & Compliance Reports
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated executive summary, network topology audit, and compliance compliance grading.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={printReport}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow-[0_0_15px_rgba(0,191,255,0.3)]"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* Report Card */}
        <div className="cyber-card p-6 border border-slate-800 space-y-6">
          {/* Executive Header Box */}
          <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
                AUDIT REPORT #TG-2026-0817
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                Enterprise Network Topology & Defense Evaluation
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                <span>Evaluated Subnet: 192.168.1.0/24</span>
                <span>•</span>
                <span>Date: August 17, 2026</span>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-right">
              <span className="text-[10px] text-slate-400 block font-semibold">Overall Health</span>
              <span className="text-xl font-bold text-emerald-400">96 / 100</span>
            </div>
          </div>

          {/* Compliance Scores */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">
              Regulatory & Framework Compliance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#090D1A] border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-200">CIS Benchmark v8</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">92%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: "92%" }} />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Level 1 & 2 Controls Passed</span>
              </div>

              <div className="p-4 rounded-xl bg-[#090D1A] border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-200">NIST SP 800-53</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">88%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: "88%" }} />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Access Control & Audit</span>
              </div>

              <div className="p-4 rounded-xl bg-[#090D1A] border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-200">ISO/IEC 27001</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">94%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: "94%" }} />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Annex A Security Posture</span>
              </div>
            </div>
          </div>

          {/* Key Findings Summary */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Key Audit Findings</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-slate-200 flex items-start gap-2.5">
                <span className="text-rose-400 font-bold">🔴 High Finding:</span>
                <span>Unauthenticated Telnet Port 23 discovered on 192.168.1.45. Remediation: Replaced with SSH Port 2222 key-based authentication.</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-200 flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">🟠 Medium Finding:</span>
                <span>Legacy Cisco IOS firmware v15.0(2) on Switch 01 vulnerable to Web UI privilege escalation. Recommendation: Update to v15.2(4)E.</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-200 flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">🟢 Good Practice:</span>
                <span>Subnet isolation between VLAN 10 (Office) and VLAN 20 (Engineering) enforced via L3 Access Control Lists (ACLs).</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
