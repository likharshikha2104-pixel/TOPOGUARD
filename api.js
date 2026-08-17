// src/services/api.js
// TopoGuard Central Data Service & Backend Connection Layer

const STORAGE_KEY_BACKEND_URL = "topoguard_backend_url";
const DEFAULT_BACKEND_URL = "http://localhost:8000/api";

export const getBackendUrl = () => {
  return localStorage.getItem(STORAGE_KEY_BACKEND_URL) || DEFAULT_BACKEND_URL;
};

export const setBackendUrl = (url) => {
  localStorage.setItem(STORAGE_KEY_BACKEND_URL, url);
};

// Initial Mock Data matching the Exact Mockup Reference
export const initialData = {
  metrics: {
    totalDevices: 28,
    totalDevicesTrend: "+12%",
    onlineDevices: 24,
    onlineDevicesTrend: "+8%",
    alertsCount: 5,
    alertsTrend: "+25%",
    riskScore: 65,
    riskLevel: "Medium",
    riskMax: 100,
    networkHealth: 96,
  },
  vulnerabilities: {
    total: 22,
    high: 3,
    medium: 7,
    low: 12,
    details: [
      { id: "CVE-2024-21413", cve: "CVE-2024-21413", title: "Microsoft Outlook Remote Code Execution", severity: "High", score: 9.8, affected: "192.168.1.20 (Engineering PC)", status: "Unpatched", remediation: "Apply Microsoft Security Update KB5035885 immediately." },
      { id: "CVE-2023-20198", cve: "CVE-2023-20198", title: "Cisco IOS XE Web UI Privilege Escalation", severity: "High", score: 10.0, affected: "192.168.1.2 (Switch VLAN 10)", status: "Mitigation Applied", remediation: "Disable HTTP/HTTPS Server feature or update to patched Cisco IOS release." },
      { id: "CVE-2023-4863", cve: "CVE-2023-4863", title: "libwebp Heap Buffer Overflow", severity: "High", score: 8.8, affected: "192.168.1.11 (Admin Workstation)", status: "Patch Available", remediation: "Update libwebp package to version 1.3.2-r0 or higher." },
      { id: "CVE-2023-38545", cve: "CVE-2023-38545", title: "cURL SOCKS5 Heap Buffer Overflow", severity: "Medium", score: 6.5, affected: "192.168.1.45 (Database Server)", status: "Reviewing", remediation: "Upgrade libcurl to >= 8.4.0." },
      { id: "CVE-2024-0012", cve: "CVE-2024-0012", title: "Palo Alto PAN-OS Authentication Bypass", severity: "Medium", score: 6.8, affected: "192.168.1.1 (Edge Firewall)", status: "Investigating", remediation: "Restrict access to management interface to trusted internal IPs only." },
      { id: "CVE-2024-3094", cve: "CVE-2024-3094", title: "XZ Utils Backdoor Infiltration", severity: "Medium", score: 7.2, affected: "192.168.1.78 (New Device)", status: "Quarantined", remediation: "Downgrade xz-utils to 5.4.x and isolate endpoint from core subnet." },
      { id: "CVE-2023-22515", cve: "CVE-2023-22515", title: "Broken Access Control Vulnerability", severity: "Medium", score: 6.1, affected: "192.168.1.15 (VoIP Gateway)", status: "Active", remediation: "Patch VoIP administrative console and enable MFA." },
      { id: "CVE-2023-29336", cve: "CVE-2023-29336", title: "Win32k Privilege Escalation", severity: "Low", score: 3.9, affected: "192.168.1.21 (SecOps Laptop)", status: "Mitigated", remediation: "Ensure routine Windows updates are scheduled." },
      { id: "CVE-2023-32373", cve: "CVE-2023-32373", title: "WebKit Safari Memory Corruption", severity: "Low", score: 3.2, affected: "192.168.1.10 (Mobile Device)", status: "Mitigated", remediation: "Update mobile browser engine." }
    ]
  },
  alerts: [
    {
      id: "alt-1",
      title: "Unknown Device",
      severity: "critical", // red dot
      time: "10:24 AM",
      target: "192.168.1.78",
      mac: "DC:A6:32:89:FE:12",
      type: "Intrusion Detection",
      status: "Active",
      description: "Unregistered rogue device detected connecting to VLAN 20. Potential unauthorized hardware connection or bridging attempt.",
      remediation: "Isolate port 8 on Switch 2 and verify MAC address with IT asset registry."
    },
    {
      id: "alt-2",
      title: "Port Scan Detected",
      severity: "warning", // amber dot
      time: "09:58 AM",
      target: "192.168.1.50",
      mac: "70:85:C2:55:01:A9",
      type: "Reconnaissance",
      status: "Investigating",
      description: "Rapid SYN scanning activity detected from internal IP 192.168.1.50 querying 1,024 TCP ports in under 4 seconds.",
      remediation: "Block IP in edge firewall table and inspect running processes on host."
    },
    {
      id: "alt-3",
      title: "Outdated Firmware",
      severity: "warning", // amber dot
      time: "09:30 AM",
      target: "192.168.1.2 (Switch VLAN 10)",
      mac: "00:23:04:AA:BB:CC",
      type: "Vulnerability Management",
      status: "Active",
      description: "Network switch running Cisco IOS firmware v15.0(2) containing unpatched CVE vulnerabilities.",
      remediation: "Schedule maintenance window for firmware upgrade to v15.2(4)E."
    },
    {
      id: "alt-4",
      title: "Weak Password Policy",
      severity: "warning", // amber dot
      time: "09:15 AM",
      target: "192.168.1.15 (VoIP Gateway)",
      mac: "A4:C3:61:90:11:45",
      type: "Policy Violation",
      status: "Active",
      description: "Default vendor credential pair (admin:admin) configured on SIP gateway management web portal.",
      remediation: "Rotate credential to 16+ character passphrase with 2FA enforcement."
    },
    {
      id: "alt-5",
      title: "Open Port Detected",
      severity: "critical", // red dot
      time: "08:45 AM",
      target: "192.168.1.45 (Database Server)",
      mac: "00:1A:2B:3C:4D:5E",
      type: "Network Exposure",
      status: "Resolved",
      description: "Insecure unencrypted Telnet service on TCP port 23 exposed to external interface.",
      remediation: "Disabled Telnet service; enforced SSH key-only authentication on Port 2222."
    }
  ],
  recentActivity: [
    {
      id: "act-1",
      message: "Device 192.168.1.45 connected",
      time: "10:25 AM",
      type: "success",
      ip: "192.168.1.45",
      icon: "check-circle"
    },
    {
      id: "act-2",
      message: "New Device 192.168.1.78 detected",
      time: "10:20 AM",
      type: "success",
      ip: "192.168.1.78",
      icon: "plus-circle"
    },
    {
      id: "act-3",
      message: "Port scan from 192.168.1.50",
      time: "09:58 AM",
      type: "danger",
      ip: "192.168.1.50",
      icon: "alert-triangle"
    },
    {
      id: "act-4",
      message: "Firmware outdated on 2 devices",
      time: "09:30 AM",
      type: "warning",
      ip: "192.168.1.2",
      icon: "info"
    }
  ],
  topologyNodes: [
    {
      id: "node-cloud",
      label: "Internet WAN",
      sublabel: "203.0.113.1",
      type: "cloud",
      role: "WAN Gateway",
      status: "online",
      ip: "203.0.113.1",
      latency: "12ms",
      throughput: "940 Mbps",
      x: 300,
      y: 40
    },
    {
      id: "node-firewall",
      label: "Edge Firewall",
      sublabel: "192.168.1.1",
      type: "firewall",
      role: "Perimeter Defense",
      status: "online",
      ip: "192.168.1.1",
      model: "Palo Alto PA-440",
      rulesActive: 142,
      threatsBlocked: 38,
      latency: "1ms",
      x: 300,
      y: 110
    },
    {
      id: "node-router",
      label: "Core Gateway Hub",
      sublabel: "192.168.1.254",
      type: "router",
      role: "L3 Router & DHCP",
      status: "online",
      ip: "192.168.1.254",
      model: "Cisco ISR 4331",
      subnets: ["192.168.10.0/24", "192.168.20.0/24"],
      latency: "2ms",
      x: 300,
      y: 180
    },
    // Left Branch: VLAN 10 (Production & Office)
    {
      id: "node-switch-left",
      label: "Switch (VLAN 10)",
      sublabel: "192.168.1.2",
      type: "switch",
      role: "Managed L2 Switch",
      status: "online",
      ip: "192.168.1.2",
      ports: "24/24 Active",
      vlan: "10 (Office Subnet)",
      x: 160,
      y: 260
    },
    {
      id: "node-phone-mobile",
      label: "Mobile Device",
      sublabel: "192.168.1.10",
      type: "mobile",
      role: "Corporate Handset",
      status: "online",
      ip: "192.168.1.10",
      mac: "BC:D1:D3:44:89:12",
      os: "Android 14",
      vendor: "Samsung Galaxy S24",
      openPorts: [443, 8080],
      x: 90,
      y: 350
    },
    {
      id: "node-pc-workstation-1",
      label: "Admin Workstation",
      sublabel: "192.168.1.11",
      type: "pc",
      role: "Workstation",
      status: "online",
      ip: "192.168.1.11",
      mac: "00:1A:2B:3C:4D:5E",
      os: "Ubuntu 24.04 LTS",
      vendor: "Dell Precision 5820",
      openPorts: [22, 443, 3000],
      x: 160,
      y: 350
    },
    {
      id: "node-voip-phone",
      label: "VoIP Phone",
      sublabel: "192.168.1.12",
      type: "phone",
      role: "IP Telephony",
      status: "online",
      ip: "192.168.1.12",
      mac: "A4:C3:61:90:11:45",
      os: "Cisco IP Phone OS",
      vendor: "Cisco 8845",
      openPorts: [5060, 80],
      x: 230,
      y: 350
    },
    // Right Branch: VLAN 20 (Engineering & Wireless)
    {
      id: "node-switch-right",
      label: "Switch (VLAN 20)",
      sublabel: "192.168.1.3",
      type: "switch",
      role: "Managed L2 Switch",
      status: "online",
      ip: "192.168.1.3",
      ports: "18/24 Active",
      vlan: "20 (Dev Subnet)",
      x: 440,
      y: 260
    },
    {
      id: "node-pc-workstation-2",
      label: "Engineering PC",
      sublabel: "192.168.1.20",
      type: "pc",
      role: "Developer Rig",
      status: "online",
      ip: "192.168.1.20",
      mac: "48:2A:E3:78:90:21",
      os: "Windows 11 Enterprise",
      vendor: "HP ZBook Fury",
      openPorts: [135, 445, 3389],
      vulnerabilitiesCount: 1,
      x: 370,
      y: 350
    },
    {
      id: "node-laptop-sec",
      label: "SecOps Laptop",
      sublabel: "192.168.1.21",
      type: "laptop",
      role: "Security Analyst",
      status: "online",
      ip: "192.168.1.21",
      mac: "E8:80:2E:67:12:00",
      os: "macOS Sonoma",
      vendor: "Apple MacBook Pro M3",
      openPorts: [22, 8080],
      x: 440,
      y: 350
    },
    {
      id: "node-wifi-ap",
      label: "WiFi AP",
      sublabel: "192.168.1.22",
      type: "router",
      role: "Wireless Access Point",
      status: "online",
      ip: "192.168.1.22",
      mac: "70:3A:CB:44:19:92",
      os: "UniFi OS v3.2",
      vendor: "Ubiquiti UniFi 6 Pro",
      clientsConnected: 14,
      x: 510,
      y: 350
    }
  ],
  devicesList: [
    { id: "dev-01", name: "Edge Firewall", ip: "192.168.1.1", mac: "00:08:E3:4A:12:01", vendor: "Palo Alto Networks", os: "PAN-OS 11.0", status: "online", type: "Firewall", vlan: "Management", ports: "443, 22", risk: "Low", lastSeen: "Just now" },
    { id: "dev-02", name: "Switch VLAN 10", ip: "192.168.1.2", mac: "00:23:04:AA:BB:CC", vendor: "Cisco Systems", os: "Cisco IOS 15.0", status: "online", type: "Switch", vlan: "VLAN 10", ports: "22, 161", risk: "Medium", lastSeen: "Just now" },
    { id: "dev-03", name: "Switch VLAN 20", ip: "192.168.1.3", mac: "00:23:04:DD:EE:FF", vendor: "Cisco Systems", os: "Cisco IOS 15.2", status: "online", type: "Switch", vlan: "VLAN 20", ports: "22, 161", risk: "Low", lastSeen: "Just now" },
    { id: "dev-04", name: "Mobile Device (Lead)", ip: "192.168.1.10", mac: "BC:D1:D3:44:89:12", vendor: "Samsung", os: "Android 14", status: "online", type: "Mobile", vlan: "VLAN 10", ports: "443, 8080", risk: "Low", lastSeen: "Just now" },
    { id: "dev-05", name: "Admin Workstation", ip: "192.168.1.11", mac: "00:1A:2B:3C:4D:5E", vendor: "Dell Inc.", os: "Ubuntu 24.04 LTS", status: "online", type: "Workstation", vlan: "VLAN 10", ports: "22, 443, 3000", risk: "High", lastSeen: "Just now" },
    { id: "dev-06", name: "VoIP Phone 01", ip: "192.168.1.12", mac: "A4:C3:61:90:11:45", vendor: "Cisco Systems", os: "Cisco IP OS", status: "online", type: "VoIP", vlan: "VLAN 10", ports: "5060, 80", risk: "Low", lastSeen: "Just now" },
    { id: "dev-07", name: "VoIP Gateway", ip: "192.168.1.15", mac: "A4:C3:61:90:11:99", vendor: "Grandstream", os: "Embedded Linux", status: "online", type: "VoIP", vlan: "VLAN 10", ports: "80, 443, 5060", risk: "Medium", lastSeen: "5m ago" },
    { id: "dev-08", name: "Engineering PC 01", ip: "192.168.1.20", mac: "48:2A:E3:78:90:21", vendor: "HP Enterprise", os: "Windows 11 Pro", status: "online", type: "Workstation", vlan: "VLAN 20", ports: "135, 445, 3389", risk: "High", lastSeen: "Just now" },
    { id: "dev-09", name: "SecOps Laptop", ip: "192.168.1.21", mac: "E8:80:2E:67:12:00", vendor: "Apple Inc.", os: "macOS Sonoma", status: "online", type: "Laptop", vlan: "VLAN 20", ports: "22, 8080", risk: "Low", lastSeen: "Just now" },
    { id: "dev-10", name: "UniFi AP Pro", ip: "192.168.1.22", mac: "70:3A:CB:44:19:92", vendor: "Ubiquiti Inc.", os: "UniFi OS 3.2", status: "online", type: "Access Point", vlan: "VLAN 20", ports: "22, 80, 8080", risk: "Low", lastSeen: "Just now" },
    { id: "dev-11", name: "Production DB Server", ip: "192.168.1.45", mac: "52:54:00:12:34:56", vendor: "Red Hat / KVM", os: "RHEL 9.3", status: "online", type: "Server", vlan: "VLAN 10", ports: "22, 5432, 23", risk: "High", lastSeen: "Just now" },
    { id: "dev-12", name: "Internal DNS / DHCP", ip: "192.168.1.50", mac: "70:85:C2:55:01:A9", vendor: "Raspberry Pi Foundation", os: "Debian 12", status: "online", type: "Server", vlan: "Management", ports: "53, 67, 80", risk: "Medium", lastSeen: "Just now" },
    { id: "dev-13", name: "Rogue Endpoint (Unknown)", ip: "192.168.1.78", mac: "DC:A6:32:89:FE:12", vendor: "Unknown Vendor", os: "Linux Kernel 6.1", status: "online", type: "Unknown", vlan: "VLAN 20", ports: "22, 80, 4444", risk: "Critical", lastSeen: "Just now" },
    { id: "dev-14", name: "Core Gateway Hub", ip: "192.168.1.254", mac: "00:1B:D5:88:99:AA", vendor: "Cisco Systems", os: "Cisco IOS-XE", status: "online", type: "Router", vlan: "Trunk", ports: "22, 443, 161", risk: "Low", lastSeen: "Just now" },
    { id: "dev-15", name: "Network Attached Storage (NAS)", ip: "192.168.1.60", mac: "00:11:32:45:90:12", vendor: "Synology Inc.", os: "DSM 7.2", status: "online", type: "Storage", vlan: "VLAN 10", ports: "443, 5001, 2049", risk: "Low", lastSeen: "1m ago" },
    { id: "dev-16", name: "Office Laser Printer", ip: "192.168.1.65", mac: "00:01:E6:77:88:99", vendor: "HP Inc.", os: "HP JetDirect", status: "online", type: "Printer", vlan: "VLAN 10", ports: "9100, 631, 80", risk: "Low", lastSeen: "3m ago" },
    { id: "dev-17", name: "Security Camera 01 (Entrance)", ip: "192.168.1.70", mac: "44:19:B6:33:44:55", vendor: "Hikvision", os: "Embedded Linux", status: "online", type: "IoT / Camera", vlan: "VLAN 30", ports: "554, 8000, 80", risk: "Medium", lastSeen: "Just now" },
    { id: "dev-18", name: "Security Camera 02 (Server Room)", ip: "192.168.1.71", mac: "44:19:B6:33:44:56", vendor: "Hikvision", os: "Embedded Linux", status: "online", type: "IoT / Camera", vlan: "VLAN 30", ports: "554, 8000, 80", risk: "Low", lastSeen: "Just now" },
    { id: "dev-19", name: "Smart Thermostat", ip: "192.168.1.75", mac: "64:16:66:11:22:33", vendor: "Nest / Google", os: "Nest OS", status: "online", type: "IoT", vlan: "VLAN 30", ports: "443", risk: "Low", lastSeen: "10m ago" },
    { id: "dev-20", name: "Conference Room Display", ip: "192.168.1.80", mac: "B8:27:EB:99:88:77", vendor: "Sony Electronics", os: "Android TV 12", status: "online", type: "Smart Display", vlan: "VLAN 20", ports: "8008, 8009", risk: "Low", lastSeen: "12m ago" },
    { id: "dev-21", name: "DevOps Runner 01", ip: "192.168.1.85", mac: "52:54:00:99:88:77", vendor: "Docker Container", os: "Alpine Linux", status: "online", type: "Server", vlan: "VLAN 20", ports: "22, 8080", risk: "Low", lastSeen: "Just now" },
    { id: "dev-22", name: "DevOps Runner 02", ip: "192.168.1.86", mac: "52:54:00:99:88:78", vendor: "Docker Container", os: "Alpine Linux", status: "online", type: "Server", vlan: "VLAN 20", ports: "22, 8080", risk: "Low", lastSeen: "Just now" },
    { id: "dev-23", name: "QA Test iPhone 15", ip: "192.168.1.90", mac: "F0:18:98:33:22:11", vendor: "Apple Inc.", os: "iOS 17.5", status: "online", type: "Mobile", vlan: "VLAN 20", ports: "443", risk: "Low", lastSeen: "15m ago" },
    { id: "dev-24", name: "Backup Gateway Node", ip: "192.168.1.253", mac: "00:1B:D5:88:99:AB", vendor: "Cisco Systems", os: "Cisco IOS-XE", status: "online", type: "Router", vlan: "Management", ports: "22, 443", risk: "Low", lastSeen: "Just now" },
    // 4 Offline Devices (Total = 28, Online = 24)
    { id: "dev-25", name: "Visitor Laptop 01", ip: "192.168.1.150", mac: "AC:BC:32:11:44:88", vendor: "Lenovo Group", os: "Windows 10", status: "offline", type: "Laptop", vlan: "Guest", ports: "N/A", risk: "Low", lastSeen: "2 hours ago" },
    { id: "dev-26", name: "Visitor Laptop 02", ip: "192.168.1.151", mac: "AC:BC:32:11:44:89", vendor: "Dell Inc.", os: "Windows 11", status: "offline", type: "Laptop", vlan: "Guest", ports: "N/A", risk: "Low", lastSeen: "4 hours ago" },
    { id: "dev-27", name: "Lab Raspberry Pi 4", ip: "192.168.1.199", mac: "B8:27:EB:12:34:56", vendor: "Raspberry Pi", os: "Raspbian 11", status: "offline", type: "IoT", vlan: "VLAN 20", ports: "N/A", risk: "Low", lastSeen: "Yesterday" },
    { id: "dev-28", name: "Legacy Win Server 2012", ip: "192.168.1.200", mac: "00:0C:29:88:99:00", vendor: "VMware Inc.", os: "Windows Server 2012", status: "offline", type: "Server", vlan: "VLAN 10", ports: "N/A", risk: "High", lastSeen: "3 days ago" }
  ]
};

// API Service Functions
export const apiService = {
  // Fetch summary state for dashboard
  async getDashboardData() {
    try {
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/dashboard`, {
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(1500)
      });
      if (response.ok) {
        const liveData = await response.json();
        return { isLive: true, ...liveData };
      }
    } catch {
      // Backend not running or timeout -> return mock data with live simulation
    }
    return { isLive: false, ...initialData };
  },

  // Fetch full device list
  async getDevices() {
    try {
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/devices`, {
        signal: AbortSignal.timeout(1500)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {}
    return initialData.devicesList;
  },

  // Fetch alerts
  async getAlerts() {
    try {
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/alerts`, {
        signal: AbortSignal.timeout(1500)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {}
    return initialData.alerts;
  },

  // Trigger network scan simulation or live backend scan
  async triggerScan(subnet = "192.168.1.0/24") {
    try {
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subnet }),
        signal: AbortSignal.timeout(4000)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {}
    
    // Fallback simulation result
    return {
      success: true,
      subnet,
      hostsFound: 28,
      activeHosts: 24,
      newHosts: 1,
      durationMs: 1450,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
};
