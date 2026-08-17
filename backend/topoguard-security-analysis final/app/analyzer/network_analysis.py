from app.scanner.discovery import discover_devices, discover_local_devices
from app.scanner.network import scan_target
from app.analyzer.device import classify_device
from app.analyzer.security import analyze_scan


RISK_VALUES = {
    "LOW": 1,
    "MEDIUM": 2,
    "HIGH": 3,
    "CRITICAL": 4
}


def analyze_network(network=None):

    if network:
        discovery = discover_devices(network)
    else:
        discovery = discover_local_devices()
        network = discovery.get("network")

    devices = discovery.get("devices", [])

    results = []

    total_findings = 0
    highest_risk = "LOW"

    for device in devices:

        address = device.get("address")

        try:

            scan_result = scan_target(address)

            analysis = analyze_scan(scan_result)

            hosts = analysis.get("hosts", [])

            if hosts:

                host = hosts[0]

                device_type = classify_device(host)

                security = host.get("security", {})

                device_risk = security.get(
                    "overall_risk",
                    "LOW"
                )

                findings = security.get(
                    "findings",
                    []
                )

            else:

                host = {}

                device_type = "UNKNOWN"

                device_risk = "LOW"

                findings = []

            if RISK_VALUES.get(
                device_risk,
                1
            ) > RISK_VALUES.get(
                highest_risk,
                1
            ):

                highest_risk = device_risk

            total_findings += len(findings)

            results.append({
                "address": address,
                "hostname": device.get("hostname"),
                "device_type": device_type,
                "vendor": host.get("vendor"),
                "mac": host.get("mac"),
                "os": host.get("os"),
                "os_version": host.get("os_version"),
                "ports": host.get("ports", []),
                "risk": device_risk,
                "findings": findings
            })

        except Exception as error:

            results.append({
                "address": address,
                "hostname": device.get("hostname"),
                "device_type": "UNKNOWN",
                "vendor": None,
                "mac": None,
                "os": None,
                "os_version": None,
                "ports": [],
                "risk": "UNKNOWN",
                "findings": [],
                "error": str(error)
            })

    return {
        "network": network,
        "devices_found": len(devices),
        "devices_scanned": len(results),
        "overall_risk": highest_risk,
        "risk_score": RISK_VALUES.get(
            highest_risk,
            0
        ),
        "total_findings": total_findings,
        "devices": results
    }