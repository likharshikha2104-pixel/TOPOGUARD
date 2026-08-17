import socket
import ipaddress
import subprocess
import re


def get_local_ip():
    """
    Returns the local IPv4 address of this machine.
    """
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    try:
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
    finally:
        s.close()

    return local_ip


def get_network():
    """
    Returns the local network range in CIDR notation.
    Example:
        192.168.1.0/24
    """

    local_ip = get_local_ip()

    network = ipaddress.IPv4Network(
        local_ip + "/24",
        strict=False
    )

    return str(network)


def get_gateway():
    """
    Returns the default IPv4 gateway on Windows.
    """

    try:
        result = subprocess.run(
            ["ipconfig"],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="ignore"
        )

        lines = result.stdout.splitlines()

        for line in lines:
            if "Default Gateway" in line:
                gateway = line.split(":", 1)[1].strip()

                if gateway and "." in gateway:
                    return gateway

        # Handles cases where the gateway appears on the
        # line immediately after "Default Gateway"
        for index, line in enumerate(lines):
            if "Default Gateway" in line:
                for next_line in lines[index + 1: index + 3]:
                    gateway = next_line.strip()

                    if gateway and re.match(
                        r"^\d{1,3}(\.\d{1,3}){3}$",
                        gateway
                    ):
                        return gateway

    except Exception:
        pass

    return None