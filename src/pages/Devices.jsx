// src/pages/Devices.jsx
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import DeviceDetailModal from "../components/dashboard/DeviceDetailModal";
import { initialData } from "../services/api";
import {
  LayoutGrid,
  Search,
  Filter,
  Plus,
  Download,
  Server,
  Wifi,
  Laptop,
  Smartphone,
  Shield,
  Lock,
  MoreVertical,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from "lucide-react";

const Devices = () => {
  const [devices, setDevices] = useState(initialData.devicesList);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: "",
    ip: "",
    mac: "",
    vendor: "",
    os: "",
    type: "Workstation",
    vlan: "VLAN 10"
  });

  const filteredDevices = devices.filter((dev) => {
    const matchesSearch =
      dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.mac.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.vendor.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === "online") return matchesSearch && dev.status === "online";
    if (statusFilter === "offline") return matchesSearch && dev.status === "offline";
    if (statusFilter === "highrisk") return matchesSearch && (dev.risk === "High" || dev.risk === "Critical");
    return matchesSearch;
  });

  const handleAddDeviceSubmit = (e) => {
    e.preventDefault();
    if (!newDevice.name || !newDevice.ip) return;

    const created = {
      id: `dev-${devices.length + 1}`,
      name: newDevice.name,
      ip: newDevice.ip,
      mac: newDevice.mac || "00:50:56:C0:00:08",
      vendor: newDevice.vendor || "Generic Vendor",
      os: newDevice.os || "Linux",
      status: "online",
      type: newDevice.type,
      vlan: newDevice.vlan,
      ports: "80, 443",
      risk: "Low",
      lastSeen: "Just now"
    };

    setDevices([created, ...devices]);
    setShowAddModal(false);
    setNewDevice({
      name: "",
      ip: "",
      mac: "",
      vendor: "",
      os: "",
      type: "Workstation",
      vlan: "VLAN 10"
    });
  };

  const exportCSV = () => {
    const headers = "ID,Name,IP,MAC,Vendor,OS,Status,Risk,VLAN\n";
    const rows = devices
      .map(
        (d) =>
          `"${d.id}","${d.name}","${d.ip}","${d.mac}","${d.vendor}","${d.os}","${d.status}","${d.risk}","${d.vlan}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "topoguard-devices-inventory.csv";
    a.click();
  };

  return (
    <Layout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <LayoutGrid className="w-6 h-6 text-cyan-400" />
              Connected Device Inventory
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Active host discovery, MAC vendor fingerprinting, and risk evaluation across all subnets.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,191,255,0.3)]"
            >
              <Plus className="w-4 h-4" />
              Add Asset
            </button>

            <button
              onClick={exportCSV}
              className="px-3.5 py-2 rounded-xl bg-[#141B2D] hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="cyber-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === "all"
                  ? "bg-[#2563EB] text-white"
                  : "bg-slate-800/80 text-slate-400 hover:text-white"
              }`}
            >
              All Assets ({devices.length})
            </button>
            <button
              onClick={() => setStatusFilter("online")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === "online"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800/80 text-slate-400 hover:text-white"
              }`}
            >
              Online ({devices.filter((d) => d.status === "online").length})
            </button>
            <button
              onClick={() => setStatusFilter("offline")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === "offline"
                  ? "bg-slate-700 text-white"
                  : "bg-slate-800/80 text-slate-400 hover:text-white"
              }`}
            >
              Offline ({devices.filter((d) => d.status === "offline").length})
            </button>
            <button
              onClick={() => setStatusFilter("highrisk")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                statusFilter === "highrisk"
                  ? "bg-rose-600 text-white"
                  : "bg-slate-800/80 text-slate-400 hover:text-white"
              }`}
            >
              High Risk ({devices.filter((d) => d.risk === "High" || d.risk === "Critical").length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search IP, MAC, Hostname..."
              className="w-full rounded-xl bg-[#090D1A] border border-slate-700/80 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition"
            />
          </div>
        </div>

        {/* Devices Table */}
        <div className="cyber-card overflow-hidden border border-slate-800/90">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D1426] text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Device Name & Type</th>
                  <th className="py-3.5 px-4">IP Address</th>
                  <th className="py-3.5 px-4">MAC Address</th>
                  <th className="py-3.5 px-4">Vendor & OS</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Open Ports</th>
                  <th className="py-3.5 px-4">Risk Rating</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredDevices.map((dev) => (
                  <tr
                    key={dev.id}
                    className="hover:bg-[#151D33] transition cursor-pointer"
                    onClick={() => setSelectedDevice(dev)}
                  >
                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                          {dev.type === "Firewall" || dev.type === "Router" ? (
                            <Shield className="w-4 h-4" />
                          ) : dev.type === "Server" ? (
                            <Server className="w-4 h-4" />
                          ) : dev.type === "Mobile" ? (
                            <Smartphone className="w-4 h-4" />
                          ) : (
                            <Laptop className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-white tracking-wide">
                            {dev.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{dev.type} • {dev.vlan}</div>
                        </div>
                      </div>
                    </td>

                    {/* IP */}
                    <td className="py-3 px-4 font-mono text-cyan-400 font-semibold">
                      {dev.ip}
                    </td>

                    {/* MAC */}
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {dev.mac}
                    </td>

                    {/* Vendor / OS */}
                    <td className="py-3 px-4 text-slate-300">
                      <div>{dev.vendor}</div>
                      <div className="text-[10px] text-slate-500">{dev.os}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          dev.status === "online"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-700/50 text-slate-400 border border-slate-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            dev.status === "online" ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
                          }`}
                        />
                        {dev.status === "online" ? "Online" : "Offline"}
                      </span>
                    </td>

                    {/* Ports */}
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {dev.ports}
                    </td>

                    {/* Risk */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          dev.risk === "Critical"
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                            : dev.risk === "High"
                            ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                            : dev.risk === "Medium"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {dev.risk}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDevice(dev);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 border border-slate-700 text-xs transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md cyber-card border border-cyan-500/40 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Register New Network Asset</h3>
            <form onSubmit={handleAddDeviceSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Asset Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Backup NAS Server"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#090D1A] border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">IP Address</label>
                  <input
                    type="text"
                    required
                    placeholder="192.168.1.105"
                    value={newDevice.ip}
                    onChange={(e) => setNewDevice({ ...newDevice, ip: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#090D1A] border border-slate-700 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">MAC Address</label>
                  <input
                    type="text"
                    placeholder="00:1A:2B:3C:4D:99"
                    value={newDevice.mac}
                    onChange={(e) => setNewDevice({ ...newDevice, mac: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#090D1A] border border-slate-700 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Device Type</label>
                  <select
                    value={newDevice.type}
                    onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#090D1A] border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Workstation">Workstation</option>
                    <option value="Server">Server</option>
                    <option value="Switch">Switch</option>
                    <option value="Router">Router</option>
                    <option value="Mobile">Mobile</option>
                    <option value="IoT">IoT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Subnet / VLAN</label>
                  <select
                    value={newDevice.vlan}
                    onChange={(e) => setNewDevice({ ...newDevice, vlan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#090D1A] border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="VLAN 10">VLAN 10 (Office)</option>
                    <option value="VLAN 20">VLAN 20 (Engineering)</option>
                    <option value="VLAN 30">VLAN 30 (IoT)</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Device Detail Modal */}
      {selectedDevice && (
        <DeviceDetailModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
        />
      )}
    </Layout>
  );
};

export default Devices;