# backend_example/app.py
"""
TopoGuard Python Backend Example (FastAPI / Scapy / Nmap)
This lightweight backend demonstrates how to connect real network discovery and packet capture scripts to the TopoGuard UI.

To run:
    pip install fastapi uvicorn scapy python-nmap
    python app.py
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import time

app = FastAPI(title="TopoGuard Cybersecurity Engine API", version="1.0.0")

# Enable CORS for Vite Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    subnet: str = "192.168.1.0/24"

@app.get("/api/health")
def health_check():
    return {"status": "online", "engine": "TopoGuard Core Scanner", "version": "1.0.0"}

@app.get("/api/dashboard")
def get_dashboard():
    return {
        "metrics": {
            "totalDevices": 28,
            "totalDevicesTrend": "+12%",
            "onlineDevices": 24,
            "onlineDevicesTrend": "+8%",
            "alertsCount": 5,
            "alertsTrend": "+25%",
            "riskScore": 65,
            "riskLevel": "Medium",
            "riskMax": 100,
            "networkHealth": 96
        },
        "vulnerabilities": {
            "total": 22,
            "high": 3,
            "medium": 7,
            "low": 12
        }
    }

@app.post("/api/scan")
def trigger_network_scan(req: ScanRequest):
    # Here you can execute real Nmap or Scapy ARP ping:
    # Example:
    # import nmap
    # nm = nmap.PortScanner()
    # nm.scan(hosts=req.subnet, arguments='-sn')
    return {
        "success": True,
        "subnet": req.subnet,
        "hostsFound": 28,
        "activeHosts": 24,
        "scanDuration": "1.84s",
        "timestamp": time.strftime("%I:%M %p")
    }

if __name__ == "__main__":
    print("[+] Starting TopoGuard Backend Server on http://localhost:8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
