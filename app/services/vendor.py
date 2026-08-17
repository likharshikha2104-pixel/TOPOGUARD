from mac_vendor_lookup import MacLookup


mac_lookup = MacLookup()


def get_vendor(mac: str):
    """
    Return the manufacturer/vendor for a MAC address.

    If the MAC address cannot be found in the local
    vendor database, return "Unknown".
    """

    if not mac:
        return "Unknown"

    try:
        return mac_lookup.lookup(mac)

    except Exception:
        return "Unknown"