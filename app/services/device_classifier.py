def classify_device(ip: str, hostname: str | None, gateway: str | None = None):
    """
    Classify a discovered network device using simple heuristics.
    """

    # Gateway is most likely the network router.
    if gateway and ip == gateway:
        return "Router/Gateway"

    if hostname:
        name = hostname.lower()

        # Windows desktop/laptop
        if any(keyword in name for keyword in [
            "desktop",
            "laptop",
            "pc",
            "windows"
        ]):
            return "Computer"

        # Mobile devices
        if any(keyword in name for keyword in [
            "android",
            "iphone",
            "ipad",
            "mobile"
        ]):
            return "Mobile"

        # Printers
        if any(keyword in name for keyword in [
            "printer",
            "print",
            "epson",
            "canon",
            "hp"
        ]):
            return "Printer"

    return "Unknown"