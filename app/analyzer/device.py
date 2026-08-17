def classify_device(host):
    """
    Classify a network device using vendor, OS,
    device information and detected services.
    """

    vendor = (host.get("vendor") or "").lower()
    operating_system = (host.get("os") or "").lower()
    device_type = (host.get("device_type") or "").lower()

    ports = host.get("ports", [])

    services = []

    for port in ports:
        service = (port.get("service") or "").lower()

        if service:
            services.append(service)

    # -----------------------------
    # ROUTER / NETWORK DEVICE
    # -----------------------------

    router_keywords = [
        "router",
        "gateway",
        "openwrt",
        "tp-link",
        "tplink",
        "cisco",
        "netgear",
        "d-link",
        "dlink",
        "mikrotik"
    ]

    if (
        any(keyword in vendor for keyword in router_keywords)
        or any(keyword in operating_system for keyword in router_keywords)
        or "router" in device_type
    ):
        return "ROUTER"

    # -----------------------------
    # PRINTER
    # -----------------------------

    printer_services = [
        "printer",
        "ipp",
        "jetdirect"
    ]

    if any(service in services for service in printer_services):
        return "PRINTER"

    # -----------------------------
    # DATABASE SERVER
    # -----------------------------

    database_services = [
        "mysql",
        "postgresql",
        "mongodb",
        "redis",
        "mssql"
    ]

    if any(service in services for service in database_services):
        return "SERVER"

    # -----------------------------
    # WINDOWS COMPUTER
    # -----------------------------

    if "windows" in operating_system:
        return "COMPUTER"

    # -----------------------------
    # LINUX SERVER
    # -----------------------------

    if "linux" in operating_system:
        return "SERVER"

    # -----------------------------
    # WEB SERVER
    # -----------------------------

    web_services = [
        "http",
        "https",
        "http-proxy"
    ]

    if any(service in services for service in web_services):
        return "SERVER"

    # -----------------------------
    # NMAP DEVICE TYPE
    # -----------------------------

    if device_type:
        return device_type.upper()

    return "UNKNOWN"