import subprocess
import xml.etree.ElementTree as ET


NMAP_PATH = r"C:\Program Files (x86)\Nmap\nmap.exe"


def scan_target(target: str):
    """
    Scan a target using Nmap and return structured security data.
    """

    command = [
    NMAP_PATH,
    "-T4",
    "--top-ports",
    "100",
    "-sV",
    "--version-light",
    "--host-timeout",
    "30s",
    "-oX",
    "-",
    target
  ]

    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        timeout=180
    )

    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip())

    root = ET.fromstring(result.stdout)

    hosts = []

    for host in root.findall("host"):

        # --------------------------------
        # IP ADDRESS
        # --------------------------------

        address = None
        mac = None
        vendor = None

        for address_element in host.findall("address"):

            addr_type = address_element.get("addrtype")

            if addr_type == "ipv4":
                address = address_element.get("addr")

            elif addr_type == "mac":
                mac = address_element.get("addr")
                vendor = address_element.get("vendor")

        if address is None:
            continue

        # --------------------------------
        # HOSTNAME
        # --------------------------------

        hostname = None

        hostnames = host.find("hostnames")

        if hostnames is not None:

            hostname_element = hostnames.find("hostname")

            if hostname_element is not None:
                hostname = hostname_element.get("name")

        # --------------------------------
        # OPEN PORTS
        # --------------------------------

        ports = []

        ports_element = host.find("ports")

        if ports_element is not None:

            for port in ports_element.findall("port"):

                state = port.find("state")

                if state is None:
                    continue

                if state.get("state") != "open":
                    continue

                service = port.find("service")

                service_data = {
                    "port": int(port.get("portid")),
                    "protocol": port.get("protocol"),
                    "state": state.get("state"),

                    "service": (
                        service.get("name")
                        if service is not None
                        else None
                    ),

                    "product": (
                        service.get("product")
                        if service is not None
                        else None
                    ),

                    "version": (
                        service.get("version")
                        if service is not None
                        else None
                    ),

                    "extra_info": (
                        service.get("extrainfo")
                        if service is not None
                        else None
                    ),

                    "cpe": (
                        [
                            cpe.text
                            for cpe in service.findall("cpe")
                            if cpe.text
                        ]
                        if service is not None
                        else []
                    )
                }

                ports.append(service_data)

        # --------------------------------
        # OS DETECTION
        # --------------------------------

        operating_system = None
        os_version = None

        os_element = host.find("os")

        if os_element is not None:

            os_match = os_element.find("osmatch")

            if os_match is not None:

                operating_system = os_match.get("name")

                os_class = os_match.find("osclass")

                if os_class is not None:
                    os_version = os_class.get("osgen")

        # --------------------------------
        # DEVICE TYPE
        # --------------------------------

        device_type = None

        if os_element is not None:

            os_match = os_element.find("osmatch")

            if os_match is not None:

                os_class = os_match.find("osclass")

                if os_class is not None:
                    device_type = os_class.get("type")

        # --------------------------------
        # HOST INFORMATION
        # --------------------------------

        host_info = {
            "address": address,
            "hostname": hostname,
            "mac": mac,
            "vendor": vendor,
            "os": operating_system,
            "os_version": os_version,
            "device_type": device_type,
            "ports": ports
        }

        hosts.append(host_info)

    return {
        "target": target,
        "hosts": hosts
    }