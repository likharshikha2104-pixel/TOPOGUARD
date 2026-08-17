import socket
import ipaddress


def get_local_network():
    """
    Detect the local IPv4 address and calculate the local /24 network.
    """

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    try:
        # This connection is only used to determine
        # which local network interface is active.
        # No actual application data is sent to 8.8.8.8.
        sock.connect(("8.8.8.8", 80))

        local_ip = sock.getsockname()[0]

    finally:
        sock.close()

    # Create the network using the detected IP.
    network = ipaddress.ip_network(
        f"{local_ip}/24",
        strict=False
    )

    return {
        "ip": local_ip,
        "network": str(network),
        "netmask": str(network.netmask)
    }