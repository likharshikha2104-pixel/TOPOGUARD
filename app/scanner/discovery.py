import subprocess
import xml.etree.ElementTree as ET

from app.scanner.network import NMAP_PATH
from app.scanner.network_info import get_local_network


def discover_devices(network: str):
    command = [
        NMAP_PATH,
        "-sn",
        "-oX",
        "-",
        network
    ]

    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        timeout=120
    )

    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip())

    root = ET.fromstring(result.stdout)

    devices = []

    for host in root.findall("host"):

        status = host.find("status")

        if status is None:
            continue

        if status.get("state") != "up":
            continue

        address_element = host.find("address")

        if address_element is None:
            continue

        device = {
            "address": address_element.get("addr")
        }

        hostname_element = host.find("hostnames/hostname")

        if hostname_element is not None:
            device["hostname"] = hostname_element.get("name")
        else:
            device["hostname"] = None

        devices.append(device)

    return {
        "network": network,
        "devices_found": len(devices),
        "devices": devices
    }


def discover_local_devices():
    network_info = get_local_network()

    network = network_info["network"]

    result = discover_devices(network)

    result["local_ip"] = network_info["ip"]
    result["netmask"] = network_info["netmask"]

    return result