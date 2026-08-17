from scapy.all import ARP, Ether, srp

from app.services.network import get_network
from app.services.hostname import get_hostname
from app.services.vendor import get_vendor
from app.services.port_scanner import scan_ports
from app.core.config import SCAN_TIMEOUT, BROADCAST_MAC
from app.schemas.device import Device


def scan_network():
    """
    Discover active devices on the local network
    and identify their open common TCP ports.
    """

    target = get_network()

    arp = ARP(pdst=target)
    ether = Ether(dst=BROADCAST_MAC)

    packet = ether / arp

    answered = srp(
        packet,
        timeout=SCAN_TIMEOUT,
        verbose=False
    )[0]

    devices = []

    for index, (_, received) in enumerate(answered, start=1):

        ip = received.psrc

        device = Device(
            id=index,
            ip=ip,
            mac=received.hwsrc,
            hostname=get_hostname(ip),
            vendor=get_vendor(received.hwsrc),
            device_type="Unknown",
            open_ports=scan_ports(ip),
            status="online"
        )

        devices.append(device)

    return devices