// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import StatCard from "../components/dashboard/StatCard";
import NetworkTopologyWidget from "../components/dashboard/NetworkTopologyWidget";
import AlertsWidget from "../components/dashboard/AlertsWidget";
import VulnerabilityDonutWidget from "../components/dashboard/VulnerabilityDonutWidget";
import RecentActivityWidget from "../components/dashboard/RecentActivityWidget";
import DeviceDetailModal from "../components/dashboard/DeviceDetailModal";
import ScanTriggerModal from "../components/dashboard/ScanTriggerModal";
import { apiService, initialData } from "../services/api";
import {
  Laptop,
  Wifi,
  Bell,
  ShieldAlert,
  Server,
  Activity,
  Radio,
  CheckCircle2
} from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showScanModal, setShowScanModal] = useState(false);
  const [bannerNotice, setBannerNotice] = useState(null);

  const loadData = async () => {
    const result = await apiService.getDashboardData();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeviceSelected = (device) => {
    setSelectedDevice(device);
  };

  const handleTriggerScan = () => {
    setShowScanModal(true);
  };

  const handleScanCompleted = () => {
    setBannerNotice("✓ Live Network Discovery completed: 24 active hosts verified.");
    setTimeout(() => setBannerNotice(null), 4000);
    loadData();
  };

  return (
    <Layout onTriggerScan={handleTriggerScan}>
      <div className="space-y-5">
        {/* Optional Notification Toast Banner */}
        {bannerNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-between animate-fadeIn shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{bannerNotice}</span>
            </div>
            <button
              onClick={() => setBannerNotice(null)}
              className="text-emerald-300 hover:text-white text-xs underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Row 1: Top 4 Metric Stat Cards matching the Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Devices (28, ↑ 12%) */}
          <StatCard
            title="Total Devices"
            value={data.metrics.totalDevices}
            trend="↑ 12%"
            trendType="positive"
            icon={Laptop}
          />

          {/* Card 2: Online Devices (24, ↑ 8%) */}
          <StatCard
            title="Online Devices"
            value={data.metrics.onlineDevices}
            trend="↑ 8%"
            trendType="positive"
            icon={Wifi}
          />

          {/* Card 3: Alerts (5, ↑ 25%) */}
          <StatCard
            title="Alerts"
            value={data.metrics.alertsCount}
            trend="↑ 25%"
            trendType="danger"
            icon={Bell}
          />

          {/* Card 4: Risk Score (65 /100, Medium) */}
          <StatCard
            title="Risk Score"
            value={data.metrics.riskScore}
            subtitle={`/${data.metrics.riskMax}`}
            badge={data.metrics.riskLevel}
            badgeColor="amber"
            icon={ShieldAlert}
          />
        </div>

        {/* Row 2: Network Topology & Real-time Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Network Topology Widget (~7 cols on desktop) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <NetworkTopologyWidget
              onSelectDevice={handleDeviceSelected}
              onTriggerScan={handleTriggerScan}
            />
          </div>

          {/* Alerts Widget (~5 cols on desktop) */}
          <div className="lg:col-span-5 xl:col-span-5">
            <AlertsWidget
              alerts={data.alerts}
              onSelectAlert={(alert) => {
                // Find matching device or open alert details
                setSelectedDevice({
                  name: alert.title,
                  ip: alert.target,
                  status: alert.severity === "critical" ? "Critical Alert" : "Warning",
                  type: alert.type,
                  os: alert.description,
                  mac: alert.mac || "N/A"
                });
              }}
            />
          </div>
        </div>

        {/* Row 3: Top Vulnerabilities Donut Chart & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Top Vulnerabilities Widget (~5 cols on desktop) */}
          <div className="lg:col-span-5 xl:col-span-5">
            <VulnerabilityDonutWidget
              total={data.vulnerabilities.total}
              high={data.vulnerabilities.high}
              medium={data.vulnerabilities.medium}
              low={data.vulnerabilities.low}
            />
          </div>

          {/* Recent Activity Widget (~7 cols on desktop) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <RecentActivityWidget activities={data.recentActivity} />
          </div>
        </div>
      </div>

      {/* Device Detail Inspection Modal */}
      {selectedDevice && (
        <DeviceDetailModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
          onIsolate={(dev, isolated) => {
            setBannerNotice(
              isolated
                ? `⚠️ Host ${dev.ip || dev.name} has been isolated to Quarantine VLAN 99.`
                : `✓ Host ${dev.ip || dev.name} restored to original VLAN.`
            );
          }}
        />
      )}

      {/* Scan Trigger Modal */}
      {showScanModal && (
        <ScanTriggerModal
          onClose={() => setShowScanModal(false)}
          onScanComplete={() => {
            setShowScanModal(false);
            handleScanCompleted();
          }}
        />
      )}
    </Layout>
  );
};

export default Dashboard;