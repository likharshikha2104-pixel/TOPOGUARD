RISK_VALUES = {
    "LOW": 1,
    "MEDIUM": 2,
    "HIGH": 3,
    "CRITICAL": 4
}


def calculate_network_risk(devices):
    """
    Calculate overall security risk for the network
    using the highest device risk and total findings.
    """

    highest_risk = "LOW"
    total_findings = 0

    for device in devices:

        analysis = device.get("analysis")

        if not analysis:
            continue

        risk = analysis.get("overall_risk", "LOW")

        if RISK_VALUES.get(risk, 0) > RISK_VALUES.get(highest_risk, 0):
            highest_risk = risk

        total_findings += analysis.get("total_findings", 0)

    return {
        "overall_risk": highest_risk,
        "total_findings": total_findings,
        "devices_analyzed": len(devices)
    }