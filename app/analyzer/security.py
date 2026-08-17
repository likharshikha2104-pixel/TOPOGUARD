from app.analyzer.vulnerability import lookup_cve


RISK_VALUES = {
    "LOW": 1,
    "MEDIUM": 2,
    "HIGH": 3,
    "CRITICAL": 4
}


def add_finding(
    findings,
    host,
    port,
    service,
    risk,
    reason,
    recommendation
):
    findings.append({
        "host": host,
        "port": port,
        "service": service,
        "risk": risk,
        "reason": reason,
        "recommendation": recommendation
    })


def analyze_host(host):
    findings = []

    address = host.get("address")

    for port_info in host.get("ports", []):

        port = port_info.get("port")
        service = (port_info.get("service") or "").lower()

        # Telnet
        if port == 23 or service == "telnet":

            add_finding(
                findings,
                address,
                port,
                service,
                "HIGH",
                "Telnet is an insecure remote-access protocol because credentials and traffic may be transmitted without strong encryption.",
                "Disable Telnet and use SSH or another encrypted remote-access protocol."
            )

        # FTP
        elif port == 21 or service == "ftp":

            add_finding(
                findings,
                address,
                port,
                service,
                "MEDIUM",
                "FTP may expose credentials and file transfers without encryption.",
                "Disable FTP where possible or replace it with SFTP/FTPS."
            )

        # SMB
        elif port in (139, 445) or service in (
            "microsoft-ds",
            "netbios-ssn"
        ):

            add_finding(
                findings,
                address,
                port,
                service,
                "HIGH",
                "SMB exposure can increase the attack surface and may expose file-sharing or administrative services.",
                "Restrict SMB access with firewall rules and network segmentation."
            )

        # RDP
        elif port == 3389 or service == "ms-wbt-server":

            add_finding(
                findings,
                address,
                port,
                service,
                "HIGH",
                "Remote Desktop exposure increases the remote-access attack surface.",
                "Restrict RDP to trusted networks or VPN access and enforce strong authentication."
            )

        # MySQL
        elif port == 3306 or service == "mysql":

            add_finding(
                findings,
                address,
                port,
                service,
                "MEDIUM",
                "A MySQL database service is exposed on the network.",
                "Restrict database access to trusted hosts and avoid exposing MySQL directly to untrusted networks."
            )

        # PostgreSQL
        elif port == 5432 or service == "postgresql":

            add_finding(
                findings,
                address,
                port,
                service,
                "MEDIUM",
                "A PostgreSQL database service is exposed on the network.",
                "Restrict PostgreSQL access using firewall rules and trusted host configuration."
            )

        # Redis
        elif port == 6379 or service == "redis":

            add_finding(
                findings,
                address,
                port,
                service,
                "HIGH",
                "Redis exposure can create significant security risk if authentication and network restrictions are not properly configured.",
                "Restrict Redis to trusted hosts and require authentication where supported."
            )

        # VNC
        elif port in (5900, 5901, 5902) or service == "vnc":

            add_finding(
                findings,
                address,
                port,
                service,
                "HIGH",
                "VNC provides remote graphical access and increases the remote-access attack surface.",
                "Restrict VNC access to trusted networks and use strong authentication and encryption."
            )

        # HTTP
        elif port == 80 or service == "http":

            add_finding(
                findings,
                address,
                port,
                service,
                "LOW",
                "HTTP is an unencrypted web service and may expose administrative interfaces or information.",
                "Prefer HTTPS and restrict administrative interfaces to trusted networks."
            )

        # Alternate HTTP ports
        elif port in (8000, 8080, 8081, 8888):

            add_finding(
                findings,
                address,
                port,
                service,
                "LOW",
                "An alternate HTTP service is exposed on the network.",
                "Verify that the service is required and restrict administrative interfaces to trusted networks."
            )

        # PPTP
        elif port == 1723 or service == "pptp":

            add_finding(
                findings,
                address,
                port,
                service,
                "HIGH",
                "PPTP is an outdated VPN protocol with known security weaknesses.",
                "Disable PPTP where possible and migrate to a modern VPN protocol."
            )

        # SSH
        elif port == 22 or service == "ssh":

            add_finding(
                findings,
                address,
                port,
                service,
                "LOW",
                "SSH provides remote administration and should be restricted to trusted networks.",
                "Use strong authentication, disable unnecessary password access, and restrict SSH exposure."
            )

    return findings


def analyze_vulnerabilities(host):
    vulnerabilities = []

    for port_info in host.get("ports", []):

        cpe_list = port_info.get("cpe", [])

        for cpe in cpe_list:

            cve_results = lookup_cve(cpe)

            for cve in cve_results:

                vulnerabilities.append({
                    "host": host.get("address"),
                    "port": port_info.get("port"),
                    "service": port_info.get("service"),
                    "cve_id": cve.get("cve_id"),
                    "cvss_score": cve.get("cvss_score"),
                    "severity": cve.get("severity"),
                    "description": cve.get("description"),
                    "cpe": cpe
                })

    return vulnerabilities


def analyze_scan(scan_result):

    analyzed_hosts = []

    total_findings = 0
    highest_risk = "LOW"

    all_findings = []

    for host in scan_result.get("hosts", []):

        # Existing rule-based analysis
        findings = analyze_host(host)

        # CVE vulnerability analysis
        vulnerabilities = analyze_vulnerabilities(host)

        # Convert CVEs into security findings
        for vulnerability in vulnerabilities:

            severity = vulnerability.get("severity")

            if severity not in RISK_VALUES:
                severity = "MEDIUM"

            findings.append({
                "host": vulnerability.get("host"),
                "port": vulnerability.get("port"),
                "service": vulnerability.get("service"),
                "risk": severity,
                "reason": (
                    f"Known vulnerability "
                    f"{vulnerability.get('cve_id')} "
                    f"identified for the detected software."
                ),
                "recommendation": (
                    "Update the affected software to a version "
                    "that addresses the vulnerability."
                ),
                "cve_id": vulnerability.get("cve_id"),
                "cvss_score": vulnerability.get("cvss_score")
            })

        # Calculate risk for this host
        host_risk = "LOW"

        for finding in findings:

            risk = finding.get("risk", "LOW")

            if risk not in RISK_VALUES:
                risk = "LOW"

            if RISK_VALUES[risk] > RISK_VALUES[host_risk]:
                host_risk = risk

            if RISK_VALUES[risk] > RISK_VALUES[highest_risk]:
                highest_risk = risk

        total_findings += len(findings)

        all_findings.extend(findings)

        analyzed_hosts.append({
            **host,
            "security": {
                "overall_risk": host_risk,
                "total_findings": len(findings),
                "findings": findings
            },
            "vulnerabilities": vulnerabilities
        })

    return {
        "target": scan_result.get("target"),
        "overall_risk": highest_risk,
        "risk_score": RISK_VALUES[highest_risk],
        "total_findings": total_findings,
        "findings": all_findings,
        "hosts": analyzed_hosts
    }