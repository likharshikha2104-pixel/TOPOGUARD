// src/pages/Vulnerabilities.jsx
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import VulnerabilityDonutWidget from "../components/dashboard/VulnerabilityDonutWidget";
import { initialData } from "../services/api";
import {
  ShieldAlert,
  Search,
  Download,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  Lock,
  Filter
} from "lucide-react";

const Vulnerabilities = () => {
  const [vulns, setVulns] = useState(initialData.vulnerabilities.details);
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVulns = vulns.filter((v) => {
    const matches =
      v.cve.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.affected.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterSeverity === "high") return matches && v.severity === "High";
    if (filterSeverity === "medium") return matches && v.severity === "Medium";
    if (filterSeverity === "low") return matches && v.severity === "Low";
    return matches;
  });

  return (
    <Layout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <ShieldAlert className="w-6 h-6 text-cyan-400" />
              Vulnerability & CVE Assessment
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Continuous CVE monitoring, CVSS 3.1 score weighting, and host patch management.
            </p>
          </div>
        </div>

        {/* Donut Summary Card and Top Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <VulnerabilityDonutWidget
              total={initialData.vulnerabilities.total}
              high={initialData.vulnerabilities.high}
              medium={initialData.vulnerabilities.medium}
              low={initialData.vulnerabilities.low}
            />
          </div>

          <div className="lg:col-span-7 cyber-card p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-2">
                Executive Threat Posture
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated network scanning identified <strong>22 total vulnerabilities</strong> across 28 active endpoints.
                <strong> 3 Critical CVEs</strong> require immediate mitigation to prevent potential lateral privilege escalation.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center">
                <span className="text-2xl font-extrabold text-rose-400">3</span>
                <span className="text-[11px] block text-slate-300 font-semibold">Critical CVEs</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                <span className="text-2xl font-extrabold text-amber-400">7</span>
                <span className="text-[11px] block text-slate-300 font-semibold">Medium CVEs</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <span className="text-2xl font-extrabold text-emerald-400">12</span>
                <span className="text-[11px] block text-slate-300 font-semibold">Low Priority</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800 pt-2">
              <span>National Vulnerability Database (NVD) Feed</span>
              <span className="text-emerald-400">Synchronized</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
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
              All Advisories ({vulns.length})
            </button>
            <button
              onClick={() => setFilterSeverity("high")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterSeverity === "high"
                  ? "bg-rose-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              High (3)
            </button>
            <button
              onClick={() => setFilterSeverity("medium")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterSeverity === "medium"
                  ? "bg-amber-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Medium (7)
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search CVE ID, affected IP..."
              className="w-full rounded-xl bg-[#090D1A] border border-slate-700 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* CVE Table */}
        <div className="cyber-card overflow-hidden border border-slate-800/90">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D1426] text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">CVE ID & Title</th>
                  <th className="py-3.5 px-4">CVSS Score</th>
                  <th className="py-3.5 px-4">Affected Host</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Remediation Guidance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredVulns.map((v) => (
                  <tr key={v.id} className="hover:bg-[#151D33] transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white font-mono">{v.cve}</div>
                      <div className="text-slate-400 text-[11px]">{v.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                          v.score >= 9.0
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            : v.score >= 7.0
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {v.score} {v.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-cyan-400">
                      {v.affected}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-semibold">
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 text-[11px]">
                      {v.remediation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Vulnerabilities;
